import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
};

const ShopHeader: React.FC<Props> = ({ children }) => {
  return (
    <div className="w-screen row-span-2 row-start-0 bg-black">
      {children}
    </div>
  );
};

export default ShopHeader;