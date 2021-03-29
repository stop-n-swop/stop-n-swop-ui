import React from 'react';
import Loader from 'react-spinners/ScaleLoader';

export default function Uploading() {
  return (
    <div className="flex flex-grow justify-center items-center">
      <Loader color="#FFF" />
    </div>
  );
}
