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
  const [currentMapPoint, setCurrenMapPoint] = useState<MapPoint | null>(null);
  const [videoSrc, setVideoSrc] = useState("");

  const handlePointClick = (point: MapPoint) => {
    setCurrenMapPoint(point);
    setVideoSrc(point.video);
    onOpen();
  };

  const handleClose = () => {
    setVideoSrc(""); 
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
        <div className="relative min-h-screen text-white p-8 flex flex-col items-center overflow-hidden">
          <video
            className="fixed inset-0 w-full h-full object-cover z-0"
            autoPlay
            playsInline
          >
            <source src="/videos/map.mp4" type="video/mp4" />
          </video>
        </div>
        )
      }
      <Modal size='5xl' isOpen={isOpen} onClose={handleClose} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-medievalSepial text-center text-3xl">{currentMapPoint?.name}</ModalHeader>
              <ModalBody>
                <p className="flex flex-col gap-1 text text-center text-2xl">{currentMapPoint?.description}</p>
                
                  <video
                    className=" inset-0 object-cover z-0"
                    autoPlay
                    loop
                    playsInline
                  >
                    <source src={currentMapPoint?.video} type="video/mp4" />
                  </video>
                
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