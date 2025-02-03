import { useEffect, useState } from 'react';
import Image from 'next/image';
import DropDownComponent from './DropDownComponent';
import { equipmentCategories, magicalCategories, MERCHANT_MESSAGES, shopOptions } from '@/constants/constants';
import { Cart } from '@/_common/types/Product';

interface Props {
  displaySelectedShopProducts: Function;
  buttonDisplayHandler: Function;
  togglePanel: Function;
  handleMerchantMessage: Function;
  cart: Cart;
};

const ShopOptionsHeader: React.FC<Props> = ({ displaySelectedShopProducts, buttonDisplayHandler, togglePanel, handleMerchantMessage, cart }) => {
  const [activeAction, setActiveAction] = useState<string>('buy');
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [shopType, setShopType] = useState<string>('equipment');

  const cartQuantity = cart?.reduce((total, item) => total + item.quantity, 0) || 0;

  useEffect(() => {
    console.log(activeCategory);
    displaySelectedShopProducts(activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    buttonDisplayHandler(activeAction === 'buy' ? true : false);
  }, [activeAction]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    handleMerchantMessage(MERCHANT_MESSAGES.changeShopTab)
  };

  const handleActionChange = (category: string) => {
    setActiveAction(category);
    setShopType('equipment');
    setActiveCategory(category === 'buy' ? 'weapon' : 'inventory');
    handleMerchantMessage(category === 'buy' ? MERCHANT_MESSAGES.buyTab : MERCHANT_MESSAGES.sellTab)
  };

  const handleShopTypeChange = (type: string) => {
    setShopType(type);
    setActiveCategory(type === 'equipment' ? 'weapon' : 'ingredient');
    handleMerchantMessage(type === 'equipment' ? MERCHANT_MESSAGES.equipmentShop : MERCHANT_MESSAGES.MagicShop)
  };

  const categoriesToDisplay = shopType === 'equipment' ? equipmentCategories : magicalCategories;

  return (
    <>
      <header className="w-full bg-black text-white z-50 shadow-md pt-[5.5%]">
        <div className=" flex items-center bg-black justify-center">
          <Image src="/images/HeaderDivider.webp" alt="HeaderDivider" width={350} height={1} />
        </div>
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => handleActionChange('buy')}
              className={`2xl:2xl:text-4xl lg:text-2xl sm:text-lg px-1 py-2 hover:underline ${activeAction === 'buy' ? 'underline text-yellow-500' : ''}`}>
              Buy
            </button>
            <button
              onClick={() => handleActionChange('sell')}
              className={`2xl:2xl:text-4xl lg:text-2xl sm:text-lg px-1 py-2 mx-6 hover:underline ${activeAction === 'sell' ? 'underline text-yellow-500 ' : ''}`}>
              Sell
            </button>
          </div>
          {activeAction === 'buy' && (
            <div className="flex items-center ">
              <DropDownComponent options={shopOptions} selectedOption={shopType} handleFunction={handleShopTypeChange} />
              <nav className="flex items-center space-x-6 ml-6">
                {categoriesToDisplay.map((category) => (
                  <button
                    key={category.key}
                    onClick={() => handleCategoryChange(category.key)}
                    className={`2xl:2xl:text-4xl lg:text-2xl sm:text-lg px-1 py-2 hover:underline ${activeCategory === category.key ? 'underline text-medievalSepia' : ''}`}>
                    {category.label}
                  </button>
                ))}
              </nav>
            </div>
          )}
          <div className="flex items-center">
            <button
              onClick={() => togglePanel()}
              className={`relative flex items-center 2xl:text-4xl lg:text-2xl sm:text-lg px-1 hover:underline ${activeCategory === 'cart' ? 'underline text-yellow-500' : ''}`}
              data-ignore-outside-click>
              <div className="relative flex items-center justify-center">
                <Image src="/images/shop/cart.webp" alt="Cart" width={65} height={65} data-ignore-outside-click />
                {cartQuantity > 0 && (
                  <div className="absolute top-1.5 right-0 bg-red-800 text-medievalSepia font-bold rounded-full w-6 h-6 flex items-center justify-center text-lg translate-x-1/2 -translate-y-1"
                    data-ignore-outside-click>
                    <span className="relative" style={{ top: "-0.1em" }} data-ignore-outside-click>
                      {cartQuantity}
                    </span>
                  </div>
                )}
              </div>
              <span className="ml-2" data-ignore-outside-click>Cart</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default ShopOptionsHeader;