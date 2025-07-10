import React from 'react';
import { MapPoint } from '@/_common/interfaces/MapPoint';
import Layout from '@/components/Layout';
import InteractiveMap from '@/components/map/InteractiveMap';
import { usePlayerMissions } from '@/hooks/usePlayerMissions';
import Loading from '@/components/Loading';

const Map = () => {

  const { mapPoints, loading, error } = usePlayerMissions();

  const handlePointClick = (point: MapPoint) => {
    console.log("Clicked point:", point);
  };

  if (loading) return <Loading />;
  if (error) return <p>Error loading classrooms</p>;
  return (
    <Layout>
      {
        mapPoints ? (
          <InteractiveMap
            imageUrl="/images/maps/map_1.webp"
            points={mapPoints}
            onPointClick={handlePointClick}
          />
        ) : (
          <p>No hay acceso a la aventura</p>
        )
      }
      
    </Layout>
  );
}

export default Map