import React from 'react';
import { GiRetroController } from 'react-icons/gi';
import type { Game } from '@sns/contracts/product';

interface Props {
  game: Game;
}

export default function Cover({ game: { cover, banner } }: Props) {
  return (
    <div className="w-1/4 md:w-full flex-shrink-0 relative md:pb-2/3">
      <Choose>
        <When condition={Boolean(cover || banner)}>
          <img
            className="object-cover sm:object-cover object-center w-full h-full md:absolute hover:bg-opacity-50"
            src={cover || banner}
            alt="cover"
            loading="lazy"
          />
        </When>
        <Otherwise>
          <div className="w-full h-full md:absolute bg-gray-500 flex justify-center items-center">
            <GiRetroController size="4rem" />
          </div>
        </Otherwise>
      </Choose>
    </div>
  );
}
