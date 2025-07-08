import { MapPoint } from '@/_common/interfaces/MapPoint';
import Layout from '@/components/Layout';
import InteractiveMap from '@/components/map/InteractiveMap';
import React from 'react'

const Map = () => {
  const points:MapPoint[]  = [
    {
      id: "topic1",
      name: "The port of Kaltis",
      xPercent: 82,
      yPercent: 65,
      fogPercentX: 82,
      fogPercentY: 65,
      isUnlocked: false
    },
    {
      id: "topic2",
      name: "The Inn of the Forgotten",
      xPercent: 28,
      yPercent: 49,
      fogPercentX: 28,
      fogPercentY: 49,
      isUnlocked: false
    },
    {
      id: "topic2",
      name: "The Old School",
      xPercent: 49,
      yPercent: 43,
      fogPercentX: 82,
      fogPercentY: 65,
      isUnlocked: true
    },
    {
      id: "topic2",
      name: "The Dravokar lineage",
      xPercent: 63,
      yPercent: 28,
      fogPercentX: 63,
      fogPercentY: 28,
      isUnlocked: false
    },
    {
      id: "topic2",
      name: "The Swamp Tower",
      xPercent: 69,
      yPercent: 42,
      fogPercentX: 69,
      fogPercentY: 42,
      isUnlocked: true
    },
    {
      id: "topic2",
      name: "The Hollow of the lost",
      xPercent: 8,
      yPercent: 65,
      fogPercentX: 8,
      fogPercentY: 65,
      isUnlocked: false
    },
    {
      id: "topic2",
      name: "Valley of Wounds",
      xPercent: 37,
      yPercent: 35,
      fogPercentX: 37,
      fogPercentY: 35,
      isUnlocked: false
    },
    {
      id: "topic2",
      name: "Ethrael",
      xPercent: 61,
      yPercent: 56,
      fogPercentX: 61,
      fogPercentY: 56,
      isUnlocked: true
    },
    
    {
      id: "topic2",
      name: "City of the Dead",
      xPercent: 41,
      yPercent: 23,
      fogPercentX: 41,
      fogPercentY: 23,
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