import GoldComponent from "./GoldComponent";

interface Props {
  name: string;
  gold: number;
  level: number;
};

const RequiredLevel: React.FC<{ level: number, fontSize?: string }> = ({ level, fontSize = '2xl:text-4xl lg:text-2xl sm:text-xl' }) => (
  <div className="flex items-center space-x-2">
    <span className={`text-gray-200 ${fontSize}`}>Level</span>
    <span className={`text-amber-200 ${fontSize}`}>{level}</span>
  </div>
);

const UserComponent: React.FC<Props> = ({ name, gold, level }) => {
  return (
    <div className="h-full justify-center 2xl:text-5xl lg:text-3xl sm:text-2xl w-[90%] p-[2%] bg-contain bg-no-repeat bg-[url('/images/shop/Req_Bg.webp')]">
      <div className="w-full text-center">
        <p>{name}</p>
      </div>
      <div className="flex inline-row w-full justify-around">
        <div className="self-center">
          <GoldComponent amount={gold} user={true} fontSize="2xl:text-4xl lg:text-2xl sm:text-xl" />
        </div>
        <div className="w-[20%] self-center">
          <RequiredLevel level={level} fontSize="2xl:text-4xl lg:text-2xl sm:text-xl" />
        </div>
      </div>
    </div>
  );
};

export default UserComponent;