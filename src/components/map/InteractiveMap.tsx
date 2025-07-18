"use client";

import React from "react";
import { MapPoint } from "@/_common/interfaces/MapPoint";
import MovingFog from "./MovingFog";
import Image from "next/image";
import { motion } from "framer-motion";
import { MAP_CONFIG } from "@/config/map";

type InteractiveMapProps = {
  imageUrl: string;
  points: MapPoint[];
  onPointClick?: (point: MapPoint) => void;
};

const InteractiveMap: React.FC<InteractiveMapProps> = ({imageUrl, points, onPointClick,}) => {
  return (
    <div className="fixed inset-0 overflow-hidden">
      <div className="absolute inset-0">
        <img
        src={imageUrl}
        alt="Medieval Map"
        className="w-full h-full object-cover"
        />
    	</div>

      {points.map((point) => (
        
        point.isUnlocked ? (
          <div
            key={point.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${point.xPercent}%`,
              top: `${point.yPercent}%`,
            }}
          >
            <button
              onClick={() => onPointClick && onPointClick(point)}
              className="bg-black/30 hover:bg-medievalSepia hover:text-black text-white text-xl px-2 py-1 rounded-full shadow-md"
            >
              {point.name}
            </button>
          </div>
        ) : (
          <div
            key={point.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${point.xPercent}%`,
              top: `${point.yPercent}%`,
            }}
          >
            <motion.div
              className="relative w-[400px] max-w-[80vw] aspect-video pointer-events-none"
              initial={{ opacity: 1, scale: 1 }}
              animate={{
                scale: [1, 1.01, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image src={MAP_CONFIG.static_fog} alt="Fog Block" fill />
            </motion.div>
          </div>
        )
      ))}
      {[...Array(3)].map((_, index) => (
        <MovingFog key={index} />
      ))}
    </div>
  );
};

export default InteractiveMap;
