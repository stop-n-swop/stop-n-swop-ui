import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Photo from 'ui/elements/Photo';

interface Props {
  to: string;
  image: string;
  label: ReactNode;
}

export default function Thumb({ to, image, label }: Props) {
  return (
    <Link to={to} className="w-full rounded space-y-2 flex flex-col">
      <div className="aspect aspect-16-9 w-full">
        <Photo src={image} className="object-cover" />
      </div>
      <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center w-full">
        {label}
      </div>
    </Link>
  );
}
