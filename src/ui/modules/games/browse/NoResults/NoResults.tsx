import React from 'react';
import cx from 'classnames';
import Card from 'ui/elements/Card';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import { FaSearch } from 'react-icons/fa';

export default function NoResults() {
  const getMessage = useGetMessage();

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
        <div className="flex flex-col items-center space-y-8">
          <FaSearch size="3rem" className="text-gray-300" />
          {ids.games.search.results.noResults.map((id) => (
            <p key={id} className="text-lg text-center">
              {getMessage(id)}
            </p>
          ))}
        </div>
      </Card>
    </div>
  );
}
