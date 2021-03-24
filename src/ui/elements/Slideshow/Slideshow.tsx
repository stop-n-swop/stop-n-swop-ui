import React, { useState } from 'react';
import { useTransition, animated } from 'react-spring';
import { useSwipeable } from 'react-swipeable';
import { FaCircle } from 'react-icons/fa';
import Button from 'ui/elements/Button';
import { ImageUrl } from 'core/types';

enum Direction {
  FORWARD,
  BACKWARD,
}

const useSlideshow = (initial: number, total: number) => {
  const [direction, setDirectionState] = useState(Direction.FORWARD);
  const [current, setCurrent] = useState(initial);
  const setDirection = (value: number) => {
    if (direction !== value) {
      setDirectionState(value);
    }
  };
  const set = (value: number) => {
    let index = value;
    if (index > current) {
      setDirection(Direction.FORWARD);
    } else if (index < current) {
      setDirection(Direction.BACKWARD);
    }
    if (index >= total) {
      index = 0;
    } else if (index < 0) {
      index = total - 1;
    }

    setCurrent(index);
  };
  const next = () => {
    set(current + 1);
  };
  const previous = () => {
    set(current - 1);
  };

  return [current, set, next, previous, direction] as const;
};

const useSwipes = (next: () => void, previous: () => void) => {
  return useSwipeable({ onSwipedLeft: next, onSwipedRight: previous });
};

const useAnimations = (image: ImageUrl, direction: Direction) => {
  return useTransition(image, null, {
    initial: {
      opacity: 1,
      transform: 'translateX(0px)',
    },
    from: {
      opacity: 0,
      transform: `translateX(${
        direction === Direction.FORWARD ? 100 : -100
      }px)`,
    },
    enter: { opacity: 1, transform: 'translateX(0px)' },
    leave: {
      opacity: 0,
      transform: `translateX(${
        direction === Direction.FORWARD ? -100 : 100
      }px)`,
    },
  });
};

interface Props {
  images: ImageUrl[];
  initial?: number;
  className?: string;
}

export default function Slideshow({ images, initial = 0, className }: Props) {
  const [current, setCurrent, next, previous, direction] = useSlideshow(
    initial,
    images.length,
  );
  const handlers = useSwipes(next, previous);

  const image = images[current];

  const transitions = useAnimations(image, direction);

  return (
    <div className={className}>
      <div
        className="w-full sm:w-3/4 sm:mx-auto lg:mx-0 lg:w-full relative"
        style={{ '--aspect-ratio': 16 / 9 } as any}
        {...handlers}
      >
        {transitions.map(({ item: image, key, props: style }) => (
          <animated.div className="absolute inset-0" key={key} style={style}>
            <div
              className="bg-center bg-contain bg-no-repeat w-full h-full"
              style={
                {
                  backgroundImage: `url('${image}')`,
                } as any
              }
            />
          </animated.div>
        ))}
      </div>
      <div className="flex justify-center">
        {images.map((_, index) => (
          <Button
            kind={index === current ? 'tertiary' : 'none'}
            onClick={() => setCurrent(index)}
          >
            <FaCircle size="0.75em" />
          </Button>
        ))}
      </div>
    </div>
  );
}
