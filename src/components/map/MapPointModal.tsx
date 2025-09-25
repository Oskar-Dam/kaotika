import { MapPoint } from '@/_common/interfaces/MapPoint';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import React from 'react'

type MapPointModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  point: MapPoint | null;
};

const MapPointModal: React.FC<MapPointModalProps> = ({
  isOpen,
  onClose,
  onOpenChange,
  point,
}) => {
  if (!point) return null;

  return (
    <Modal size="5xl" isOpen={isOpen} onClose={onClose} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-medievalSepial text-center text-3xl">
              {point.name}
            </ModalHeader>
            <ModalBody>
              <p className="flex flex-col gap-1 text text-center text-2xl">
                {point.description}
              </p>

              <video className="inset-0 object-cover z-0" autoPlay loop playsInline>
                <source src={point.video} type="video/mp4" />
              </video>
            </ModalBody>
            <ModalFooter />
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default MapPointModal