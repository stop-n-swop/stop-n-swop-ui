import React, { useLayoutEffect, useState } from 'react';
import Photo from 'ui/elements/Photo';
import Loader from 'ui/modules/Loader';
import cx from 'classnames';
import type { Game } from '@sns/contracts/product';
import type { Query } from '@respite/core';

interface Props {
  gameQuery: Query<Game>;
}

export default function Preview({ gameQuery: { data: game } }: Props) {
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    if (game.cover) {
      setLoading(true);
    }
  }, [game.cover]);

  return (
    <div className="relative">
      <If condition={loading}>
        <div className="absolute w-full h-full flex items-center justify-center">
          <Loader sensible />
        </div>
      </If>
      <Photo
        src={game.cover}
        alt={game.name}
        className={cx('object-contain w-full h-full', loading && 'invisible')}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
}
