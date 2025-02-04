import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
};

const MainContainer: React.FC<Props> = ({ children }) => {
  return (
    <div className="w-screen row-span-8 row-start-3 flex">
      {children}
    </div>
  );
};

export default MainContainer;