import React, { ReactNode, useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import Card from 'ui/elements/Card';
import context from '../context';

interface Props {
  children?: ReactNode;
}

export default function Filters({ children }: Props) {
  const [active, setActive] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const fn = (evt: MouseEvent) => {
      if (!ref.current?.contains(evt.target as any)) {
        setActive(null);
      }
    };
    window.addEventListener('click', fn);
    return () => {
      window.removeEventListener('click', fn);
    };
  }, []);

  return (
    <context.Provider value={{ active, setActive }}>
      <Card
        padding={false}
        ref={ref}
        className={cx('z-10', 'md:mb-6', 'lg:w-1/4 ', 'xl:w-auto')}
      >
        <div
          className={cx(
            'flex flex-shrink-0 justify-evenly flex-wrap',
            'lg:block lg:px-6 lg:py-4 lg:space-y-6',
          )}
        >
          {children}
        </div>
      </Card>
    </context.Provider>
  );
}
