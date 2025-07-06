import { motion } from 'framer-motion';
import React from 'react';
import Image from "next/image";


const MovingFog = () => {
  const yPosition = Math.random() * 80; 
  const duration = 60 + Math.random() * 40; 
  const size = 200 + Math.random() * 600; 

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-20"
      initial={{ x: "-30%", y: `${yPosition}%`, opacity: 0.4 }}
      animate={{ x: "100vw" }}
      transition={{
        duration: duration,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
        delay: Math.random() * 20, 
      }}
      style={{ width: size, height: size * 0.5625 }}
    >
      <Image
        src="/images/maps/fog.png" 
        alt="Fog moving"
        fill
        className="object-cover opacity-70"
      />
    </motion.div>
  );
};

export default MovingFog