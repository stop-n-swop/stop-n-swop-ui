import React, { ReactNode, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import cx from 'classnames';

export default function SectionList({
  current: currentKey,
  options,
}: {
  current: string;
  options: Array<{ key: string; to: string; label: ReactNode }>;
}) {
  const current =
    options.find((option) => option.key === currentKey) ?? options[0];
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setExpanded(false);
  }, [current]);

  if (!options.length) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        className={cx(
          'text-lg w-full border-green-700 border-b-2 px-4 py-3 flex items-center justify-between',
          'lg:hidden',
          { 'bg-green-600': expanded },
        )}
        onClick={() => setExpanded(!expanded)}
      >
        <span>{current.label}</span>
        <Choose>
          <When condition={expanded}>
            <FaChevronUp />
          </When>
          <Otherwise>
            <FaChevronDown />
          </Otherwise>
        </Choose>
      </button>

      <ul
        className={cx(
          'flex-shrink-0 text-lg border-green-700 border-b',
          { hidden: !expanded },
          'lg:border-b-0 lg:border-r lg:block',
        )}
      >
        {options.map((option) => (
          <li key={option.key}>
            <Link
              to={option === current ? undefined : option.to}
              className={cx(
                'w-full px-4 py-3 text-left',
                option === current
                  ? 'bg-green-600 hover:bg-green-500 hidden lg:block'
                  : 'hover:bg-gray-800 block',
              )}
              style={{ minWidth: '14rem' }}
            >
              {option.label}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
