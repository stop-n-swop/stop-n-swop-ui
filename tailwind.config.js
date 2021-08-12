module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.ts', './src/**/*.tsx', './src/**/*.mdx', './index.html'],
  darkMode: false, // or 'media' or 'class'
  variants: {
    extend: {
      filter: ['hover', 'focus'],
    },
  },
  theme: {
    extend: {
      screens: {
        xs: '560px',
      },
      spacing: {
        '2/3': '66.666667%',
      },
      maxWidth: {
        '1/4': '25%',
        '1/3': '33.333%',
        '1/2': '50%',
        '2/3': '66.666%',
        '3/4': '75%',
      },
      fontSize: {
        xs: '0.75em',
        sm: '0.875em',
        base: '1em',
        lg: '1.125em',
        xl: '1.25em',
        '2xl': '1.5em',
        '3xl': '1.875em',
        '4xl': '2.25em',
        '5xl': '3em',
        '6xl': '4em',
      },
      fontFamily: {
        // display: ['zx_spectrumregular'],
        retro: ['zx_spectrumregular'],
        title: ['Roboto'],
        display: ['Roboto'],
        logo: ['lithographbold'],
      },
      colors: {
        primary: {
          darkest: '#0b825a',
          darker: '#0d9467',
          dark: '#0ea774',
          DEFAULT: '#10b981',
          light: '#28c08e',
          lighter: '#40c79a',
          lightest: '#58cea7',
        },
        secondary: {
          darkest: '#a62d7a',
          darker: '#ba328a',
          dark: '#cf3899',
          DEFAULT: '#d960ad',
          light: '#dd74b8',
          lighter: '#e79ccc',
          lightest: '#ecafd6',
        },
        warning: {
          DEFAULT: '#FB8B24',
          light: '#fb973a',
          lighter: '#fca250',
          lightest: '#fcae66',
        },
        danger: {
          dark: '#cc1616',
          DEFAULT: '#FF1B1C',
          light: '#fc4242',
          lighter: '#ff5f60',
          lightest: '#ff7677',
        },
      },
      lineHeight: 1.5,
      borderWidth: {
        DEFAULT: '1px',
        0: '0',
        2: '2px',
        4: '4px',
        6: '6px',
        8: '8px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
