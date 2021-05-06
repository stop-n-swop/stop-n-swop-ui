import React from 'react';
import Loader from 'ui/modules/Loader';

export default function LoadingPage() {
  return (
    <div className="h-full flex-grow flex justify-center items-center">
      <Loader />
    </div>
  );
}
