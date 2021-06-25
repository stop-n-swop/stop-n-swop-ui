import X from 'ui/assets/logo/X.svg';
import O from 'ui/assets/logo/Circle.svg';
import type { ComponentType } from 'react';

export interface Palette {
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

export const palettes: Record<string, Palette> = {
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

export const pickAPalette = () => {
  const paletteKeys = Object.keys(palettes).slice(1);
  const shouldUsePalette = Math.random() > 0.5;
  if (shouldUsePalette) {
    const randomPaletteIndex = Math.floor(Math.random() * paletteKeys.length);
    const key = paletteKeys[randomPaletteIndex];
    return palettes[key] ?? palettes.none;
  }
  return palettes.none;
};
