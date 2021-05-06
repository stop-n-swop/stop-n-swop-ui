import React from 'react';
import cx from 'classnames';
import Card from 'ui/elements/Card';
import { GiGameConsole } from 'react-icons/gi';
import { useMessage } from 'ui/intl';
import { ids } from 'ui/messages';

export default function Empty() {
  return (
    <div
      className={cx(
        'md:py-16 md:mx-10 md:mb-6',
        'lg:w-full lg:mx-0 lg:py-0 lg:flex lg:justify-center lg:items-center',
        'xl:flex',
      )}
    >
      <Card
        className={cx(
          'flex justify-center items-center space-x-4',
          'lg:w-1/2 lg:transform lg:-translate-y-1/2',
          'xl:w-1/3',
        )}
      >
        <GiGameConsole size="8rem" className="text-primary" />
        <span className="text-lg">
          {useMessage(ids.games.search.results.empty)}
        </span>
      </Card>
    </div>
  );
}
