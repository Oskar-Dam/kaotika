import React from "react";

interface Props {
  basePercentage: number;
  dieFaces: number;
  dieModifier: number;
  dieNum: number;
};

const ProductAttack: React.FC<Props> = ({ basePercentage, dieFaces, dieModifier, dieNum }) => (
  <>
    <div className="w-full grid grid-flow-col justify-around place-content-center">
      <span className="text-gray-200 2xl:text-3xl lg:text-lg sm:text-sm">Base Percentage</span>
      <span className="text-amber-200 2xl:text-4xl lg:text-lg sm:text-sm">{basePercentage}</span>
    </div>
    <div className="w-full grid grid-flow-col justify-around place-content-center">
      <span className="text-gray-200 2xl:text-3xl lg:text-lg sm:text-sm">Attack</span>
      <span className=" pb-[3%] text-amber-200 2xl:text-4xl lg:text-lg sm:text-sm">{dieNum}<span className="2xl:text-3xl lg:text-lg">D</span>{dieFaces} + {dieModifier}</span>
    </div>
  </>
);

const ProductWeaponDisplay: React.FC<Props> = ({ basePercentage, dieFaces, dieModifier, dieNum }) => {
  return (
    <>
      <div className="w-full place-content-center bg-[url('/images/shop/ProductBonusContainer.png')] bg-contain bg-center bg-no-repeat">
        <ProductAttack basePercentage={basePercentage} dieFaces={dieFaces} dieModifier={dieModifier} dieNum={dieNum} />
      </div>
    </>
  );
};

export default ProductWeaponDisplay;