import { useEffect, useState } from "react";

interface Props {
  message: string;
};

const MerchantComponent: React.FC<Props> = ({ message }) => {
  const [text, setText] = useState<string>('');
  const [cont, setCont] = useState<number>(0);

  useEffect(() => {
    setText('');
    setCont(0);
  }, [message]);

  useEffect(() => {
    if (cont < message.length) {
      const interval = setInterval(() => {
        setText(text + message[cont]);
        setCont(cont + 1);
      }, 20);

      return () => clearInterval(interval);
    };
  }, [cont, message]);

  return (
    <>
      <div className="w-4/12 h-full bg-[url('/images/shop/merchant.png')] bg-cover bg-center border-2 border-darkSepia " />
      <div className="w-8/12 h-full grid p-[2%] overflow-y-auto border-y-1 border-r-1 bg-gray-950 bg-opacity-70 border-darkSepia ">
        <p className="2xl:text-4xl lg:text-2xl sm:text-xl pb-[2%]">Merchant</p>
        <div className="overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-950 [&::-webkit-scrollbar-thumb]:bg-gray-800">
          <p className="2xl:text-3xl lg:text-xl sm:text-lg text-white">{text}</p>
        </div>
      </div>
    </>
  );
};

export default MerchantComponent;