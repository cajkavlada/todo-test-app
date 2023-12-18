import {extendTheme} from '@chakra-ui/react';

const fontSizes = {
  heading: {
    1: '28px',
    2: '24px',
    3: '20px',
  },
  text: {
    base: '16px',
    small: '14px',
  },
};

const fontWeights = {
  heading: {
    1: 700,
    2: 600,
    3: 500,
  },
  text: {
    base: 400,
    alternative: 500,
  },
};

export const theme = extendTheme({
  config: {initialColorMode: 'light', useSystemColorMode: false, colorMode: 'red'},
  colors: {
    'text-primary': '#001141',
    'text-secondary': '#4D5667',
    'text-tertiary': '#7A869A',
    'text-white': '#FFFFFF',
    'text-danger': '#B71C1C',

    'fill-brand': '#0F62FE',
    'fill-brand-hover': '#0043CE',
    'fill-darkBlue': '#001141',
    'fill-gray': '#F1F2F6',
    'fill-gray-hover': '#E6E8EF',
    'fill-gray-lightest': '#F1F2F6',
    'fill-white': '#FFFFFF',

    'border-brand': '#0F62FE',
    'border-gray': '#CAD1DE',
    'border-danger': '#E32C1E',
    brand: {
      50: '#E3F2FD',
      100: '#BBDEFB',
      200: '#90CAF9',
      300: '#64B5F6',
      400: '42A5F5',
      500: '#0F62FE',
      600: '#1E88E5',
      700: '#1976D2',
      800: '#1565C0',
      900: '#0D47A1',
    },
  },

  components: {
    Button: {
      baseStyle: {
        borderRadius: '100px',
      },
      defaultProps: {
        colorScheme: 'brand',
        // variant: 'ghost',
      },
    },
    Checkbox: {
      baseStyle: {
        control: {
          borderRadius: 'full',
        },
      },
      defaultProps: {
        colorScheme: 'brand',
      },
    },
    Card: {
      baseStyle: {
        container: {
          p: [6, 10],
          gap: [6, 10],
          borderRadius: 24,
        },
      },
      defaultProps: {
        variant: 'outlined',
      },
    },
    FormLabel: {
      baseStyle: {
        fontSize: 'text.small',
        fontWeight: 'text.base',
      },
    },
    Heading: {
      variants: {
        h1: {
          fontSize: 'heading.1',
          fontWeight: 'heading.1',
        },
        h2: {
          fontSize: 'heading.2',
          fontWeight: 'heading.2',
        },
        h3: {
          fontSize: 'heading.3',
          fontWeight: 'heading.3',
        },
      },
    },
    Text: {
      variants: {
        base: {
          fontSize: 'text.base',
          fontWeight: 'text.base',
        },
        small: {
          fontSize: 'text.small',
          fontWeight: 'text.base',
        },
        smallAlternative: {
          fontSize: 'text.small',
          fontWeight: 'text.alternative',
        },
      },
    },
  },
  fontSizes,
  fontWeights,
});
