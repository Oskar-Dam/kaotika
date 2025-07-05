"use client";
import { MapPoint } from "@/_common/interfaces/MapPoint";
import React from "react";

type InteractiveMapProps = {
  imageUrl: string;
  points: MapPoint[];
  onPointClick?: (point: MapPoint) => void;
};

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  imageUrl,
  points,
  onPointClick,
}) => {
  return (
    <div className="fixed inset-0 overflow-hidden">
      <div className="absolute inset-0">
        <img
        src={imageUrl}
        alt="Medieval Map"
        className="w-full h-full object-cover"
        />
    	</div>

      {/* Puntos */}
      {points.map((point) => (
        <button
          key={point.id}
          onClick={() => onPointClick && onPointClick(point)}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 bg-black hover:bg-red-900 text-white text-xl px-2 py-1 rounded-full shadow-md"
          style={{
            left: `${point.xPercent}%`,
            top: `${point.yPercent}%`,
          }}
        >
          {point.name}
        </button>
      ))}
    </div>
  );
};

export default InteractiveMap;
