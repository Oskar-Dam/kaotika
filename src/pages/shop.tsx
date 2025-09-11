import { Armor } from '@/_common/interfaces/Armor';
import { Artifact } from '@/_common/interfaces/Artifact';
import { Boot } from '@/_common/interfaces/Boot';
import { Helmet } from '@/_common/interfaces/Helmet';
import { Ingredient } from '@/_common/interfaces/Ingredient';
import { Modifier } from '@/_common/interfaces/Modifier';
import { Player } from '@/_common/interfaces/Player';
import { Ring } from '@/_common/interfaces/Ring';
import { Shield } from '@/_common/interfaces/Shield';
import { Weapon } from '@/_common/interfaces/Weapon';
import Loading from '@/components/Loading';
import LeftContainer from '@/components/shop/LeftContainer';
import MainContainer from '@/components/shop/MainContainer';
import MidContainer from '@/components/shop/MidContainer';
import RightContainer from '@/components/shop/RightContainer';
import ShopContainer from '@/components/shop/ShopContainer';
import ShopHeader from '@/components/shop/ShopHeader';
import { calculateAllAttributes } from '@/helpers/PlayerAttributes';
import ShopOptionsHeader from '@/components/shop/ShopOptionsHeader';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import RightSidePanel from '@/components/shop/RightSidePanelComponent';
import { fetchCategory } from '@/lib/fetchCategory';
import { filterCategoryData } from '@/helpers/filterCategoryData';
import { fetchPlayerData } from '../lib/fetchPlayerData';
import { MERCHANT_MESSAGES } from '@/constants/constants';
import { getRandomMessage } from '@/helpers/getRandomMessage';
import { Product, Products } from '@/_common/types/Product';
import { Equipment } from '@/_common/interfaces/Equipment';
import LoadingOverlay from '@/components/shop/loadingComponent';
import Header from '@/components/Header';

export default function Shop() {
  const { data: session } = useSession();
  const [player, setPlayer] = useState<Player>();
  const [loading, setLoading] = useState(true);
  const [playerEquipment, setPlayerEquipment] = useState<Equipment>();
  const [error, setError] = useState<string | null>(null);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [armors, setArmors] = useState<Armor[]>([]);
  const [boots, setBoots] = useState<Boot[]>([]);
  const [helmets, setHelmets] = useState<Helmet[]>([]);
  const [rings, setRings] = useState<Ring[]>([]);
  const [shields, setShields] = useState<Shield[]>([]);
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [weapons, setWeapons] = useState<Weapon[]>([]);
  const [inventory, setInventory] = useState<Products>();
  const [currentAttributes, setCurrentAttributes] = useState<Modifier>();
  const [displayProducts, setDisplayProducts] = useState<Products>(weapons);
  const [currentDisplay, setCurrentDisplay] = useState<Product>(weapons[0]);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);
  const [cart, setCart] = useState<{ product: Product, quantity: number }[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [displayBuyButtons, setDisplayBuyButtons] = useState(true);
  const [shopCategory, setShopCategory] = useState<string>('weapon');
  const [merchantMessage, setMerchantMessage] = useState("Welcome To Aivan's Store. Do not come in if you won't buy anything!")
  const [loadingOverlay, setLoadingOverlay] = useState(false);

  const handleMerchantMessage = (array: string[]) => {
    const message = getRandomMessage(array)
    setMerchantMessage(message)
  }
  const handleRemoveFromCart = (product: Product) => {
    console.log('arriving to cart removal button')
    let newCart = [...cart]
    newCart = newCart.filter((item) => item.product.name !== product.name)
    setCart(newCart);

    handleMerchantMessage(MERCHANT_MESSAGES.removeItem)
  };

  const buy = async (products: { product: Product, quantity: number }[], isInCart: boolean) => {
    setLoadingOverlay(true);
    try {
      handleMerchantMessage(MERCHANT_MESSAGES.loading)

      const res = await fetch(`/api/shop/buy`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
          email: session?.user?.email,
          products: products,
        }),
      });

      if (res.status === 200) {
        const response = await res.json();
        const inventory = getInventoryItems(response)
        setInventory(inventory);
        setPlayer(response);
        isInCart ? onClearCart() : null;
        console.log('Purchase complete: ', response);

        handleMerchantMessage(MERCHANT_MESSAGES.buyItem)
      } else if (res.status === 400) {
        setMerchantMessage(MERCHANT_MESSAGES.errorTransaction[0])
        const response = await res.json();
        setPlayer(response.player);
        console.log(response.error);
      } else if (res.status === 409) {
        setMerchantMessage(MERCHANT_MESSAGES.errorTransaction[0])
        const response = await res.json();
        setPlayer(response.player);
        console.log(response.error);
      } else if (res.status === 404) {
        setMerchantMessage(MERCHANT_MESSAGES.errorTransaction[0])
        const response = await res.json();
        console.log(response.error);
      } else {
        setMerchantMessage(MERCHANT_MESSAGES.errorTransaction[0])
        console.log('Error in the purchase: ', error);
      }
    } catch (error) {
      setMerchantMessage(MERCHANT_MESSAGES.errorTransaction[0])
      console.log('Error in the purchase: ', error);
    } finally {
      setLoadingOverlay(false);
    }
  };

  const sell = async (product: { product: Product, quantity: number }) => {
    setLoadingOverlay(true);
    try {
      const res = await fetch(`/api/shop/sell`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
          email: player?.email,
          product: product,
        }),
      });

      if (res.status === 200) {
        const response = await res.json();
        const inventory = getInventoryItems(response)
        setInventory(inventory);
        setPlayer(response);
        console.log('Sell complete: ', response);

        handleMerchantMessage(MERCHANT_MESSAGES.sellItem)
      } else if (res.status === 404) {
        const response = await res.json();
        console.log(response.error);
        setMerchantMessage(MERCHANT_MESSAGES.errorTransaction[0])
      } else {
        console.log('Error in the Sell: ', error);
        setMerchantMessage(MERCHANT_MESSAGES.errorTransaction[0])
      }
    } catch (error) {
      console.log('Error in the Sell: ', error);
      setMerchantMessage(MERCHANT_MESSAGES.errorTransaction[0])
    } finally {
      setLoadingOverlay(false);
    }
  };

  const addToCart = (product: Product, addedQuantity: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.name === product.name);
      if (existingItem) {
        if (product.type === 'ingredient') {
          return prevCart.map((item) =>
            item.product.name === product.name
              ? { ...item, quantity: item.quantity + addedQuantity }
              : item
          );

        } else {
          return prevCart;
        }
      }
      handleMerchantMessage(MERCHANT_MESSAGES.addToCart)
      return [
        ...prevCart,
        { product, quantity: product.type === 'ingredient' ? addedQuantity : 1 },

      ];
    });
  };

  const onClearCart = () => {
    setCart([]);
    handleMerchantMessage(MERCHANT_MESSAGES.removeAllItems)
  };

  const setSortedProducts = (sortedProducts: Products) => {
    setDisplayProducts(sortedProducts);
  };

  const handleQuantityChange = (product: Product, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.name === product.name
          ? { ...item, quantity: quantity }
          : item
      )
    );

    if (quantity === 0) {
      setCart((prevCart) => prevCart.filter((item) => item.product.name !== product.name));
    }
  };

  const getInventoryItems = (player: Player) => {
    const products: Products = [];

    Object.values(player?.inventory).map((productTypes) => {
      productTypes.map((product: Product) => {
        products.push(product);
      });
    });

    return products;
  };

  const toggleRightPanel = () => setIsRightPanelOpen((prev) => !prev);

  useEffect(() => {
    if (session?.user?.email) {
      const handlePlayerFetch = async () => {
        const response = await fetchPlayerData(session.user?.email!);
        const equipment = {
          helmet: response.equipment.helmet,
          weapon: response.equipment.weapon,
          armor: response.equipment.armor,
          shield: response.equipment.shield,
          artifact: response.equipment.artifact,
          boot: response.equipment.boot,
          ring: response.equipment.ring,
        }

        setPlayerEquipment(equipment);
        setPlayer(response);
        const inventory = getInventoryItems(response)
        setInventory(inventory);
      };

      //If there is not cached data it will fetch the requested category and save it in the local storage
      const handleCategoryFetch = async (categoryName: string, setMethod: (element: []) => void) => {
        const cachedData = sessionStorage.getItem(categoryName);
        if (!cachedData) {
          const response = await fetchCategory(categoryName)

          const result = filterCategoryData(response)
          console.log(categoryName, ' after filtering:', result)

          setMethod(result);

          console.log(`Saving ${categoryName} data in local storage.`)
          sessionStorage.setItem(categoryName, JSON.stringify(result));
        } else {
          const parsedData = JSON.parse(cachedData!)
          console.log(`Data of ${categoryName} found in Local Storage: `, parsedData);

          setMethod(parsedData);
        }
      };

      const handleFetches = async () => {
        try {
          await Promise.allSettled([handleCategoryFetch('ingredients', setIngredients),
          handleCategoryFetch('armors', setArmors),
          handleCategoryFetch('boots', setBoots),
          handleCategoryFetch('helmets', setHelmets),
          handleCategoryFetch('rings', setRings),
          handleCategoryFetch('shields', setShields),
          handleCategoryFetch('artifacts', setArtifacts),
          handleCategoryFetch('weapons', setWeapons)]);
          await handlePlayerFetch();
        } catch (error) {
          console.error('An error ocurred fetching the data: ', error);
        } finally {
          setLoading(false);
          console.log('Loading Complete');
        }
      }

      handleFetches();
    }
  }, [session]);

  useEffect(() => {
    if (player) calculateAllAttributes(player, setCurrentAttributes);
  }, [player]);

  useEffect(() => {
    setCurrentDisplay(displayProducts[0]);
  }, [displayProducts]);

  useEffect(() => {
    if (shopCategory === 'inventory') setDisplayProducts(inventory!);
  }, [inventory]);

  const displaySelectedShopProducts = (category: string) => {
    switch (category) {
      case 'weapon':
        setShopCategory(category);
        setDisplayProducts(weapons);
        break;
      case 'shield':
        setShopCategory(category);
        setDisplayProducts(shields);
        break;
      case 'helmet':
        setShopCategory(category);
        setDisplayProducts(helmets);
        break;
      case 'armor':
        setShopCategory(category);
        setDisplayProducts(armors);
        break;
      case 'boot':
        setShopCategory(category);
        setDisplayProducts(boots);
        break;
      case 'ring':
        setShopCategory(category);
        setDisplayProducts(rings);
        break;
      case 'artifact':
        setShopCategory(category);
        setDisplayProducts(artifacts);
        break;
      case 'ingredient':
        setShopCategory(category);
        setDisplayProducts(ingredients);
        break;
      case 'container':
        setShopCategory(category);
        setDisplayProducts([]);
        break;
      case 'inventory':
        setShopCategory(category);
        setDisplayProducts(inventory!);
        break;
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <ShopContainer>
      {loadingOverlay && <LoadingOverlay />}
      <ShopHeader>
        <Header />
        <ShopOptionsHeader buttonDisplayHandler={setDisplayBuyButtons} displaySelectedShopProducts={displaySelectedShopProducts} togglePanel={toggleRightPanel} handleMerchantMessage={handleMerchantMessage} cart={cart || []} />
      </ShopHeader>
      <MainContainer>
        <LeftContainer currentAttributes={currentAttributes!} currentEquipment={playerEquipment!} product={currentDisplay!} message={merchantMessage} />
        <MidContainer displayBuyButtons={displayBuyButtons} product={currentDisplay} onBuy={buy} onSell={sell} onAddToCart={(product: Product, quantity: number) => addToCart(product, quantity)} player={player!} quantity={quantity} handleQuantityChange={handleQuantityChange} />
        <RightContainer products={displayProducts} category={shopCategory} onProductSelect={setCurrentDisplay} player={player!} setMerchantMessage={handleMerchantMessage} setSortedProducts={setSortedProducts} />
        <RightSidePanel isOpen={isRightPanelOpen} togglePanel={toggleRightPanel} cart={cart} onRemoveFromCart={handleRemoveFromCart} onBuy={buy} onClearCart={onClearCart} player={player!} quantity={quantity} handleQuantityChange={(product: Product, qty: number) => handleQuantityChange(product, qty)} />
      </MainContainer>
    </ShopContainer>
  );
};