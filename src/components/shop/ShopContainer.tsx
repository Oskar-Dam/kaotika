import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
};

const ShopContainer: React.FC<Props> = ({ children }) => {
  return (
    <div className="w-screen h-screen grid grid-rows-10 bg-[url('/images/shop/background_Store.webp')] bg-cover bg-center bg-no-repeat">
      {children}
    </div>
  );
};

export default ShopContainer;