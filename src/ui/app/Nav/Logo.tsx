import React, { ComponentType } from 'react';
import { useBoop } from 'ui/hooks';
import { animated } from 'react-spring';
import StaticStop from 'ui/assets/logo/Stop.svg';
import N from 'ui/assets/logo/N.svg';
import StaticSwop from 'ui/assets/logo/Swop.svg';
import StaticPlus from 'ui/assets/logo/+.svg';
import StaticA from 'ui/assets/logo/A.svg';
import X from 'ui/assets/logo/X.svg';
import O from 'ui/assets/logo/Circle.svg';

const Stop = animated(StaticStop as any);
const Plus = animated(StaticPlus as any);
const Swop = animated(StaticSwop as any);
const A = animated(StaticA as any);
const B = A;

interface Palette {
  text: string;
  pad: {
    color: string;
    contrast: string;
  };
  a: {
    color: string;
    bottom?: string | number;
    Component?: ComponentType;
  };
  b: {
    color: string;
    bottom?: string | number;
    Component?: ComponentType;
  };
}

const palettes: Record<string, Palette> = {
  none: {
    text: '#fff',
    pad: {
      color: '#fff',
      contrast: '#000',
    },
    a: {
      color: '#fff',
      bottom: '0.1em',
    },
    b: {
      color: '#fff',
      bottom: '0.1em',
    },
  },
  n64: {
    text: '#ebeae7',
    pad: {
      color: '#6b6a6a',
      contrast: '#febf00',
    },
    a: {
      color: '#00934a',
    },
    b: {
      color: '#0353b8',
      bottom: '0.3em',
    },
  },
  'snes-us': {
    text: '#fff',
    pad: {
      color: '#d6d5f5',
      contrast: '#000',
    },
    a: {
      color: '#5d45ae',
      bottom: '0.3em',
    },
    b: {
      color: '#d6d5f5',
    },
  },
  'snes-eu': {
    text: '#fff',
    pad: {
      contrast: '#80bca3',
      color: '#0251c3',
    },
    a: {
      color: '#dc3e4c',
      bottom: '0.3em',
    },
    b: {
      color: '#febb52',
    },
  },
  nes: {
    text: '#d1d1ce',
    pad: {
      color: '#131819',
      contrast: '#d1d1ce',
    },
    a: {
      color: '#e81f23',
    },
    b: {
      color: '#e81f23',
    },
  },
  gc: {
    text: '#485198',
    pad: {
      color: '#f3cf40',
      contrast: '#000',
    },
    a: {
      color: '#037569',
      bottom: '0.3em',
    },
    b: {
      color: '#bf183c',
    },
  },
  ps1: {
    text: '#f0edef',
    pad: {
      color: '#525355',
      contrast: '#f0edef',
    },
    a: {
      color: '#424344',
      bottom: '0.3em',
      Component: O as any,
    },
    b: {
      color: '#424344',
      bottom: 0,
      Component: X as any,
    },
  },
  megadrive: {
    text: '#fff',
    pad: {
      color: '#f0f3dc',
      contrast: '#000',
    },
    a: {
      color: '#030b0a',
      bottom: '0.1em',
    },
    b: {
      color: '#464c4a',
    },
  },
  dreamcast: {
    text: '#fff',
    pad: {
      color: '#fff',
      contrast: '#e35a40',
    },
    a: {
      color: '#6bbaf0',
      bottom: '0.3em',
    },
    b: {
      color: '#df5954',
    },
  },
  gb: {
    text: '#fff',
    pad: {
      color: '#c3beba',
      contrast: '#262729',
    },
    a: {
      color: '#992659',
      bottom: '0.2em',
    },
    b: {
      color: '#992659',
    },
  },
};

const pickAConsole = () => {
  const paletteKeys = Object.keys(palettes).slice(1);
  const shouldUsePalette = Math.random() > 0.7;
  if (shouldUsePalette) {
    const randomPaletteIndex = Math.floor(Math.random() * paletteKeys.length);
    const key = paletteKeys[randomPaletteIndex];
    return palettes[key] ?? palettes.none;
  }
  return palettes.none;
};

const palette = pickAConsole();

export default function Logo() {
  const [plusStyle, plusBoop] = useBoop({ rotation: 45 });
  const [buttonStyle, buttonBoop] = useBoop({ y: 0.5, x: -0.5, scale: 0.95 });
  const [stopStyle, stopBoop] = useBoop({ x: -3 });
  const [swopStyle, swopBoop] = useBoop({ x: 3 });
  const boop = () => {
    plusBoop();
    buttonBoop();
    stopBoop();
    swopBoop();
  };

  const {
    a: { Component: ButtonA = A },
    b: { Component: ButtonB = B },
    a,
    b,
    pad,
    text,
  } = palette;

  return (
    <div
      style={{ position: 'relative', height: '2.7em', fill: text }}
      onMouseEnter={boop}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Stop style={{ height: '1em', ...stopStyle }} />
        <span style={{ position: 'relative' }}>
          <N
            // @ts-ignore
            style={{
              height: '0.8em',
              fill: pad.contrast,
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1,
            }}
          />
          <Plus style={{ height: '2em', fill: pad.color, ...plusStyle }} />
        </span>
        <Swop style={{ height: '1em', ...swopStyle }} />
        <span
          style={{
            display: 'flex',
            position: 'absolute',
            bottom: '0.1em',
            right: '0.3em',
          }}
        >
          <ButtonB
            // @ts-ignore
            style={{
              position: 'relative',
              height: '0.9em',
              fill: b.color,
              bottom: b.bottom ?? 0,
              marginRight: '0.1em',
              ...buttonStyle,
            }}
          />
          <ButtonA
            // @ts-ignore
            style={{
              position: 'relative',
              height: '0.9em',
              fill: a.color,
              bottom: a.bottom ?? 0,
              ...buttonStyle,
            }}
          />
        </span>
      </div>
    </div>
  );
}
