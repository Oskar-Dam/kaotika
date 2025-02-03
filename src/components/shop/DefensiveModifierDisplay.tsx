import React from "react";

const ProductDefense: React.FC<{ defense: number }> = ({ defense }) => (
  <>
    <span className="text-gray-200 2xl:text-3xl lg:text-lg sm:text-base">Defense</span>
    <span className="text-amber-200 2xl:text-4xl lg:text-lg sm:text-base">{defense}</span>
  </>
);

const ProductDefenseDisplay: React.FC<{ defense?: number }> = ({ defense }) => (
  <>
    {defense ? (
      <div className=" w-full grid grid-flow-col justify-around place-content-center bg-[url('/images/shop/ProductBonusContainer.png')] bg-contain bg-center bg-no-repeat">
        <ProductDefense defense={defense} />
      </div>
    ) : (
      <div />
    )}
  </>
);

export default ProductDefenseDisplay;