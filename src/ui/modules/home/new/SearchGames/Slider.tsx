import React, { useEffect, useState } from 'react';
import sn from 'ui/assets/store-front/stuff-nation.png';
import sns from 'ui/assets/store-front/sns.png';
import { useTransition, animated, config } from 'react-spring';

export default function Slider() {
  const [image, setImage] = useState(sn);
  useEffect(() => {
    const h = setTimeout(() => {
      setImage(image === sn ? sns : sn);
    }, 7000);
    return () => clearTimeout(h);
  }, [image]);

  const transitions = useTransition(image, (image) => image, {
    initial: {
      transform: 'translateX(0%)',
      opacity: 1,
    },
    from: {
      opacity: 0,
      transform: 'translateX(50%)',
    },
    enter: {
      opacity: 1,
      transform: 'translateX(0%)',
    },
    leave: {
      opacity: 0,
    },
    config: config.slow,
  });

  return (
    <div className="relative hidden md:flex items-center w-full md:w-1/2 flex-shrink-0 mx-auto overflow-hidden">
      {transitions.map(({ item: image, key, props: style }) => (
        <animated.div key={key} className="inset-0 absolute" style={style}>
          <div className="w-full aspect aspect-16-9">
            <div
              key={key}
              className="h-full w-full bg-left-top bg-cover"
              style={{
                backgroundImage: `url(${image})`,
              }}
            />
          </div>
        </animated.div>
      ))}
    </div>
  );
}
