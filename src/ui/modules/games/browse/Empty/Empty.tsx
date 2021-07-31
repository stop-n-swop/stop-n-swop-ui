import React from 'react';
import cx from 'classnames';
import Card from 'ui/elements/Card';
import { GiGameConsole } from 'react-icons/gi';
import { useMessage } from 'ui/intl';
import { ids } from 'ui/messages';

export default function Empty() {
  return (
    <div className={cx('flex-grow flex justify-center items-center w-full')}>
      <Card
        className={cx(
          'w-full flex justify-center items-center space-x-4',
          'md:w-auto px-12',
          'lg:w-1/2',
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
