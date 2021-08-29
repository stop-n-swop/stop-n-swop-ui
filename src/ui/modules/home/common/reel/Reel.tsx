import React from 'react';
import { animated, config, useTransition } from 'react-spring';

interface Props<T extends any> {
  page: number;
  items: T[];
  render(item: T): JSX.Element;
}

export default function Reel<T extends any>({ items, render, page }: Props<T>) {
  const transition = useTransition({ items, page }, (x) => x.page, {
    initial: {
      transform: 'translateX(0%)',
    },
    from: {
      transform: 'translateX(100%',
    },
    enter: {
      transform: 'translateX(0%)',
    },
    leave: {
      transform: 'translateX(-100%)',
    },
    config: config.slow,
  });

  return (
    <div className="w-full relative overflow-x-hidden">
      {transition.map(({ key, props: style, item: { items } }) => (
        <animated.div
          key={key}
          className="w-full absolute flex justify-between space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-8 xl:space-x-12"
          style={style}
        >
          {items.map((item) => render(item))}
        </animated.div>
      ))}
      <div className="w-full flex invisible">
        {items.map((item) => render(item))}
      </div>
    </div>
  );
}
