/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { ReactNode, useContext } from 'react';
import cx from 'classnames';
import context from '../context';

interface Props {
  name: string;
  label: ReactNode;
  children: ReactNode;
}

export default function Filter({ name, label, children }: Props) {
  const { active: current, setActive } = useContext(context);
  const active = current === name;

  return (
    <fieldset className=" relativeflex-none">
      <legend
        role="button"
        className={cx(
          'text-gray-300 text-xs lowercase px-3 py-4 border-b-2 border-transparent',
          active && 'bg-gray-900 border-white',
          'md:text-base',
          'lg:font-bold lg:uppercase lg:text-sm lg:px-0 lg:py-0 lg:border-b-0 lg:bg-transparent',
        )}
        onClick={() => {
          if (active) {
            setActive(null);
          } else {
            setActive(name);
          }
        }}
      >
        {label}
      </legend>
      <div
        className={cx(
          'absolute left-0 top-full right-0 overflow-y-autox z-10 lg:transform-none',
          active ? 'block' : 'hidden',
          'lg:static lg:block',
        )}
      >
        <div
          className={cx(
            'text-sm bg-gray-800 px-4 py-6 whitespace-nowrap',
            'md:text-base',
            'lg:text-sm lg:px-0 lg:py-3 lg:bg-transparent',
          )}
        >
          {children}
        </div>
      </div>
    </fieldset>
  );
}
