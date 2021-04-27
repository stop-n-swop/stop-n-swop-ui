import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import cx from 'classnames';
import { useGetMessage } from 'ui/intl';
import type { Section } from '../types';

export default function SectionList({
  current: currentKey,
  options,
}: {
  current: string;
  options: Section[];
}) {
  const current =
    options.find((option) => option.key === currentKey) ?? options[0];
  const [expanded, setExpanded] = useState(false);
  const getMessage = useGetMessage();

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
          'flex-shrink-0 text-lg border-green-700 border-b bg-black',
          { hidden: !expanded },
          'lg:border-b-0 lg:border-r lg:block lg:bg-transparent',
        )}
      >
        {options.map((option) => {
          return (
            <li key={option.key}>
              <Choose>
                <When condition={current === option}>
                  <div
                    className={cx(
                      'w-full px-4 py-3 text-left',
                      'bg-green-600 hover:bg-green-500 hidden lg:block',
                    )}
                    style={{ minWidth: '14rem' }}
                  >
                    {getMessage(option.label)}
                  </div>
                </When>
                <Otherwise>
                  <Link
                    to={option.to}
                    className={cx(
                      'w-full px-4 py-3 text-left',
                      'hover:bg-gray-800 block',
                    )}
                    style={{ minWidth: '14rem' }}
                  >
                    {getMessage(option.label)}
                  </Link>
                </Otherwise>
              </Choose>
            </li>
          );
        })}
      </ul>
    </>
  );
}
