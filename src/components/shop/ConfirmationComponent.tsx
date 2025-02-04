import GoldComponent from "./GoldComponent";
import ShopButton from "./shopButton";

interface Props {
  displayBuyButtons: boolean;
  quantity: number;
  modalContent: { name: string; value: number };
  handleBuy: VoidFunction
  handleSell: VoidFunction;
  handleCloseModal: VoidFunction;
};

const ConfirmationComponent: React.FC<Props> = ({ displayBuyButtons, quantity, modalContent, handleBuy, handleSell, handleCloseModal }) => {
  return (
    <>
      <div data-testid={'confirmation_component'} className="relative w-8/12 h-3/6 bg-[url('/images/shop/product_card_selected.webp')] bg-contain bg-center bg-no-repeat text-white shadow-xl flex-col justify-center place-content-center space-y-[5%]">
        <div className="flex flex-col items-center justify-center space-y-[1%]">
          <p className="2xl:text-4xl lg:text-xl sm:text-base font-bold">Are you sure you want to {displayBuyButtons ? 'buy' : 'sell'}</p>
          <p className="2xl:text-5xl lg:text-3xl sm:text-xl text-yellow-300">x{quantity} {modalContent.name}</p>
          <div className="flex items-center justify-center space-x-2">
            <p className="2xl:text-4xl lg:text-xl sm:text-base font-bold">for</p>
            <GoldComponent amount={displayBuyButtons ? modalContent.value : Math.floor(modalContent.value / 3)} />
            <p className="2xl:text-4xl lg:text-xl sm:text-base font-bold">?</p>
          </div>
        </div>
        <div className="flex justify-center  w-[60%] h-[30%] ml-[20%]">
          <ShopButton label="CONFIRM" onClick={displayBuyButtons ? handleBuy : handleSell} />
          <ShopButton label="CANCEL" onClick={handleCloseModal} />
        </div>
      </div>
    </>
  );
};

export default ConfirmationComponent;