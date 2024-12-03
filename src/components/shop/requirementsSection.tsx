import React from "react";
import GoldComponent from "./GoldComponent";

const RequiredLevel: React.FC<{ level: number }> = ({ level }) => (
    <div className="flex items-center space-x-2">
        <span className="text-gray-200 text-2xl">Req Level:</span>
        <span className="text-amber-200 text-2xl">{level}</span>
    </div>
);

const RequirementsSection: React.FC<{ gold: number; level: number }> = ({ gold, level }) => (
    <div className="flex flex-col items-center justify-center h-[12%] relative">
        <div className="relative h-40 w-120">
            <img src="/images/shop/Req_Bg.webp" alt="Center" className="h-full w-full" />
            <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
                <GoldComponent amount={gold} />
            </div>
            <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                <RequiredLevel level={level} />
            </div>
        </div>
    </div>
);

export default RequirementsSection;