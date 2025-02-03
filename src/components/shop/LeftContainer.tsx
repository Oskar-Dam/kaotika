import { Modifier } from "@/_common/interfaces/Modifier";
import MerchantComponent from "./MerchantComponent";
import ItemContainer from "./ItemContainer";
import { Product } from "@/_common/types/Product";
import { Equipment } from "@/_common/interfaces/Equipment";

interface Props {
  currentAttributes: Modifier;
  currentEquipment: Equipment;
  product: Product;
  message: string;
}


const LeftContainer: React.FC<Props> = ({ currentAttributes, currentEquipment, product, message }) => {

  return (
    <>
      <div className="w-4/12 grid grid-rows-10 pl-[3%]">
        <div className="w-full row-span-7 row-start-0 grid grid-rows-10 p-[4%]">
          <ItemContainer currentAttributes={currentAttributes} currentEquipment={currentEquipment} product={product} />
        </div>
        <div className="w-full row-span-3 row-start-8 flex p-[2%]">
          <MerchantComponent message={message} />
        </div>
      </div>
    </>
  );
};

export default LeftContainer;