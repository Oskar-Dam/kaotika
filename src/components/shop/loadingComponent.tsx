import React from 'react';
import { SpinnerKaotika } from '../SpinnerKaotika';

const LoadingOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-[9999]">
      <SpinnerKaotika size="lg" color='warning' />
    </div>
  );
};

export default LoadingOverlay;