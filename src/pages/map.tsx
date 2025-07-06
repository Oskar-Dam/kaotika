import { MapPoint } from '@/_common/interfaces/MapPoint';
import Layout from '@/components/Layout';
import InteractiveMap from '@/components/map/InteractiveMap';
import React from 'react'

const Map = () => {
  const points:MapPoint[]  = [
    {
      id: "topic1",
      name: "Castle of Knowledge",
      xPercent: 80,
      yPercent: 75,
      isUnlocked: false
    },
    {
      id: "topic2",
      name: "Forest of Logic",
      xPercent: 35.5,
      yPercent: 45.1,
      isUnlocked: false
    },
    {
      id: "topic2",
      name: "La vieja Escuela",
      xPercent: 57,
      yPercent: 35,
      isUnlocked: true
    },
    {
      id: "topic2",
      name: "El puerto de Kaltis",
      xPercent: 63,
      yPercent: 30,
      isUnlocked: true
    },
    {
      id: "topic2",
      name: "Torreón de la ciénaga",
      xPercent: 70,
      yPercent: 45,
      isUnlocked: true
    },
    {
      id: "topic2",
      name: "The Hollow of the lost",
      xPercent: 42,
      yPercent: 25,
      isUnlocked: false
    },
    {
      id: "topic2",
      name: "Valle de las Llagas",
      xPercent: 60,
      yPercent: 75,
      isUnlocked: false
    },
    {
      id: "topic2",
      name: "Ethrael",
      xPercent: 75,
      yPercent: 25,
      isUnlocked: false
    },
    {
      id: "topic2",
      name: "Torreón de la ciénaga",
      xPercent: 50,
      yPercent: 60,
      isUnlocked: false
    },
    {
      id: "topic2",
      name: "Torreón de la ciénaga",
      xPercent: 30,
      yPercent: 55,
      isUnlocked: false
    },
    {
      id: "topic2",
      name: "Torreón de la ciénaga",
      xPercent: 18,
      yPercent: 65,
      isUnlocked: false
    },
    {
      id: "topic2",
      name: "Torreón de la ciénaga",
      xPercent: 30,
      yPercent: 65,
      isUnlocked: false
    },
  ];

  const handlePointClick = (point: MapPoint) => {
    console.log("Clicked point:", point);
  };

  return (
    <Layout>
      <InteractiveMap
        imageUrl="/images/maps/map.webp"
        points={points}
        onPointClick={handlePointClick}
      />
    </Layout>
  );
}

export default Map