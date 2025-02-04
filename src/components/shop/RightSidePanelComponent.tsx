import { useEffect, useRef, useState } from 'react';
import CartProductsContainer from './CartProductsContainer';
import GoldComponent from './GoldComponent';
import { Player } from '@/_common/interfaces/Player';
import { isGoldSufficient, isProductEquiped, isProductInTheInventory } from '@/helpers/calculateIfCanBuy';
import { Cart, Product, Products } from '@/_common/types/Product';
import ShopButton from './shopButton';

interface RightSidePanelProps {
  isOpen: boolean;
  togglePanel: () => void;
  cart: Cart;
  onRemoveFromCart: (product: Product) => void;
  onBuy: (products: Cart, isInCart: boolean) => void;
  onClearCart: () => void;
  player: Player;
  quantity: number;
  handleQuantityChange: (product: Product, quantity: number) => void;
};

const RightSidePanel: React.FC<RightSidePanelProps> = ({ isOpen, togglePanel, cart, onRemoveFromCart, onBuy, onClearCart, player, quantity, handleQuantityChange }) => {
  const [ArrowImage, setArrowImage] = useState('');

  const cartRef = useRef<HTMLDivElement>(null);

  const calculateTotal = () =>
    cart.reduce((total, cart) => total + (cart.product.value * cart.quantity), 0);

  const calculateRemaining = (total: number) =>
    player.gold - total;

  const canAfford = () => {
    const value = calculateTotal();

    const products: Products = [];

    cart.map((purchase: { product: Product, quantity: number }) => {
      products.push(purchase.product);
    });

    return (
      isProductInTheInventory(player, products) &&
      isProductEquiped(player, products) &&
      isGoldSufficient(player, value)
    );
  };

  const handleBuyClick = () => {
    onBuy(cart, true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    if (cartRef.current && !cartRef.current.contains(target) && !target.closest('[data-ignore-outside-click]')) {
      togglePanel();
    }
  };

  useEffect(() => {
    setArrowImage('/images/shop/leftArrow.png');
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (

    <div
      ref={cartRef}
      className={`fixed top-[20%] right-0 h-[80%] w-[40.5rem] bg-black border-1 border-sepia z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <button onClick={togglePanel} className="absolute top-[38%] left-[-2.25rem]">
        <img src={ArrowImage} alt="Toggle Right Panel" className="h-36 w-9" />
      </button>
      <div className="p-4 text-white flex flex-col h-full b">
        <h2 className="text-4xl font-bold mb-4 text-center">CART</h2>
        <div className="flex-1 w-full overflow-y-auto bg-gray-900 bg-opacity-35 rounded-xl">
          {cart.length > 0 ? (
            <CartProductsContainer
              cart={cart}
              onRemoveFromCart={onRemoveFromCart}
              quantity={quantity}
              handleQuantityChange={handleQuantityChange}
            />
          ) : (
            <p className="text-2xl text-medievalSepia text-center">
              Your cart is empty.
            </p>
          )}
        </div>
        {cart.length > 0 && (
          <div className="border-t-2 border-medievalSepia p-4">
            <div className="flex-1 bg-medievalSepia bg-opacity-15 rounded-xl p-2">
              <div className="flex justify-between items-center mb-2">
                <p className="text-3xl font-bold ">Your Gold</p>
                <p className="text-3xl font-bold">Cost</p>
                <p className="text-3xl font-bold">Remaining Gold</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-3xl font-extralight">{player.gold}</p>
                <p className="text-6xl "> - </p>
                <p className="text-3xl font-extralight">{calculateTotal()}</p>
                <p className="text-6xl"> = </p>
                <GoldComponent amount={calculateRemaining(calculateTotal())} />
              </div>
            </div>
            <div className="flex justify-between items-center h-[43%] mt-[2%] mb-[6%] ">
              <ShopButton label='DELETE ALL' onClick={onClearCart} />
              {canAfford() ? <ShopButton label="BUY" onClick={handleBuyClick} /> :
                <p className="text-white text-center text-3xl bg-black border rounded-lg border-sepia bg-opacity-30 h-10">
                  You can't afford all this products</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RightSidePanel;