import React from 'react';
import cx from 'classnames';
import { useDate, useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';

interface Props {
  name: string;
  releaseDate: Date;
  platform: string;
  developer: string;
  publisher: string;
}

export default function Meta({
  name,
  releaseDate,
  developer,
  publisher,
  platform,
}: Props) {
  const getMessage = useGetMessage();

  return (
    <div
      className={cx(
        'relative flex flex-col h-full justify-end sm:items-end text-right px-4',
        'md:py-4',
        'xl:px-32 xl:py-12',
      )}
    >
      <h1
        className="text-lg font-logo sm:w-1/2"
        style={{ textShadow: '3px 3px #000' }}
      >
        {name}
      </h1>
      <div className="text-gray-100">{platform}</div>
      <div className="hidden md:block text-gray-200">
        {useDate(releaseDate)}
      </div>
      <If condition={developer && publisher}>
        <div className="hidden md:block text-gray-300">
          {getMessage(ids.games.search.results.owner, {
            developer,
            publisher,
          })}
        </div>
      </If>
    </div>
  );
}
