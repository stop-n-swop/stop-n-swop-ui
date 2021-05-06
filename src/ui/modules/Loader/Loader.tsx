import React from 'react';
import { useParams } from 'react-router-dom';
import Beat from 'react-spinners/BeatLoader';
import BK from 'ui/assets/sprites/bk-pixel.gif';
import { useQueryParam } from 'ui/hooks';

interface Props {
  color?: string;
  size?: string | number;
  sensible?: boolean;
}

export default function Loader({ color = '#FFF', size, sensible }: Props) {
  const q = useQueryParam('q');
  const { productId } = useParams<{ productId: string }>();

  if (!sensible) {
    // TODO: add loaders for other series
    if (q?.includes('banjo') || productId?.startsWith('banjo-')) {
      // TODO: get permission for this image (or get a new one)
      return <img src={BK} alt="Loading" />;
    }
  }

  return <Beat color={color} size={size} />;
}
