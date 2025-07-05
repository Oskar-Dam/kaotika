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
      yPercent: 62.7,
    },
    {
      id: "topic2",
      name: "Forest of Logic",
      xPercent: 35.5,
      yPercent: 45.1,
    },
    {
      id: "topic2",
      name: "La vieja Escuela",
      xPercent: 57,
      yPercent: 35,
    },
    {
      id: "topic2",
      name: "El puerto de Kaltis",
      xPercent: 63,
      yPercent: 30,
    },
    {
      id: "topic2",
      name: "Torreón de la ciénaga",
      xPercent: 70,
      yPercent: 45,
    },
    {
      id: "topic2",
      name: "The Hollow of the lost",
      xPercent: 42,
      yPercent: 25,
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