import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Tooltip } from "@nextui-org/react";
import { MapPoint } from '@/_common/interfaces/MapPoint';
import Layout from '@/components/Layout';
import InteractiveMap from '@/components/map/InteractiveMap';
import { usePlayerMissions } from '@/hooks/usePlayerMissions';
import Loading from '@/components/Loading';
import { MAP_CONFIG } from '@/config/map';

const Map = () => {

  const { mapPoints, loading, error } = usePlayerMissions();
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();
  const [currentMapPoint, setCurrenMapPoint] = useState<MapPoint | null>(null)

  const handlePointClick = (point: MapPoint) => {
    setCurrenMapPoint(point);
    onOpen();
  };

  if (loading) return <Loading />;
  if (error) return <p>Error loading classrooms</p>;
  return (
    <Layout>
      {
        mapPoints ? (
          <InteractiveMap
            imageUrl={MAP_CONFIG.background}
            points={mapPoints}
            onPointClick={handlePointClick}
          />
        ) : (
          <p>No hay acceso a la aventura</p>
        )
      }
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-medievalSepial text-center text-3xl">{currentMapPoint?.name}</ModalHeader>
              <ModalBody>
                <p className="flex flex-col gap-1 text text-center text-2xl">{currentMapPoint?.description}</p>
              </ModalBody>
              <ModalFooter>
                
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </Layout>
  );
}

export default Map