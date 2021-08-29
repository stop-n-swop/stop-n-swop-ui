import React, { ReactNode } from 'react';

export default function Reason({
  description,
  text,
}: {
  text: ReactNode;
  description: ReactNode;
}) {
  return (
    <li>
      <p>{text}</p>
      <p className="text-xs sm:text-sm italic text-gray-300 md:ml-4">
        {description}
      </p>
    </li>
  );
}
