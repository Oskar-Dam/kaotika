import React, { useEffect, useState } from "react";
import { Ingredient } from "@/_common/interfaces/Ingredient";
import { Product } from "@/_common/types/Product";

interface IncrementDecrementProps {
  initialValue?: number;
  onValueChange: (product: Product, quantity: number) => void;
  isInCart: boolean;
  product: Product;
  displayButtons: boolean;
};

const IncrementDecrement: React.FC<IncrementDecrementProps> = ({ initialValue = 1, onValueChange, isInCart = false, product, displayButtons }) => {
  const [count, setCount] = useState(initialValue);

  const isIngredient = (product: Product): product is Ingredient => {
    return "qty" in product;
  };

  useEffect(() => {
    setCount(initialValue);
  }, [initialValue]);

  const handleIncrement = () => {
    let newValue = count + 1;

    if (displayButtons && isIngredient(product)) {
      const maxValue = displayButtons ? product.qty : 99;
      newValue = Math.min(newValue, maxValue);
    }

    if (newValue <= 99) {
      setCount(newValue);
      onValueChange(product, newValue);
    }
  };

  const handleDecrement = () => {
    let newValue = count - 1;
    if (!isInCart && newValue < 1) {
      newValue = 1;
    }
    if (newValue >= 0) {
      setCount(newValue);
      onValueChange(product, newValue);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Math.max(0, parseInt(e.target.value) || 0);

    if (displayButtons && isIngredient(product)) {
      const maxValue = displayButtons ? product.qty : 99;
      value = Math.min(value, maxValue);
    }

    if (!isInCart && value < 1) {
      value = 1;
    }

    if (value > 99) {
      value = 99;
    }

    setCount(value);
    onValueChange(product, value);
  };

  return (
    <div className="w-full flex items-center justify-center space-x-[4%]">
      <button
        className="w-[20%] cursor-pointer bg-[url('/images/shop/UpdateQtyBox.png')] bg-contain bg-center bg-no-repeat text-white 2xl:text-4xl lg:text-3xl sm:text-2xl text-xl"
        onClick={handleDecrement}>
        <p className="pb-[7%]">-</p>
      </button>
      <input
        type="number"
        value={count}
        min={isInCart ? 0 : 1}
        max={displayButtons && isIngredient(product) ? product.qty : 99}
        className="w-1/9 cursor-pointer text-center pb-[1%] text-white 2xl:text-4xl lg:text-3xl sm:text-1xl text-xl border border-x-sepia rounded bg-black
          [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        onChange={handleInputChange} />
      <button
        className="w-[20%] cursor-pointer bg-[url('/images/shop/UpdateQtyBox.png')] bg-contain bg-center bg-no-repeat text-white 2xl:text-4xl lg:text-3xl sm:text-2xl text-xl"
        onClick={count < 99 ? handleIncrement : () => { }}>
        <p className="pb-[7%]">+</p>
      </button>
    </div>
  );
};

export default IncrementDecrement;