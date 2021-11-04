import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  // base colors
  primary: '#ffb81c',
  secondary: '#101820',

  green: '#30ca67',
  lightGreen: '#e6fef0',

  red: '#ff4134',
  lightRed: '#fff1F0',

  purple: '#6b3Ce9',
  lightpurple: '#f3efff',

  yellow: '#ffC664',
  lightyellow: '#ffF9eC',

  black: '#1e1f20',
  white: '#fff',

  lightGray: '#fcfbfc',
  gray: '#c1c3c5',
  darkgray: '#c3c6c7',

  transparent: 'transparent'
};

export const SIZES = {
  // Global sizes
  minimum: 8,
  small: 10,
  medium: 14,
  large: 18,
  xlarge: 24,
  xxlarge: 32,
  xxxlarge: 40,
  base: 10,
  font: 16,
  radius: 20,
  padding: 20,
  padding2: 30,
  logo: width * 0.1,
  icon: 20,

  // Font sizes
  largeTitle: 50,
  h1: 30,
  h2: 22,
  h3: 20,
  h4: 18,
  body1: 20,
  body2: 18,
  body3: 16,
  body4: 14,
  body5: 12,

  // Screen dimensions
  width,
  height
};

export const FONTS = {
  // Pre-defined fonts
  largeTitle: {
    fontFamily: 'Raleway-Regular',
    fontSize: SIZES.largeTitle,
    lineHeight: 55
  },
  h1: {fontFamily: 'Raleway-Black', fontSize: SIZES.h1, lineHeight: 36},
  h2: {fontFamily: 'Raleway-Bold', fontSize: SIZES.h2, lineHeight: 30},
  h3: {fontFamily: 'Raleway-Bold', fontSize: SIZES.h3, lineHeight: 22},
  h4: {fontFamily: 'Raleway-Bold', fontSize: SIZES.h4, lineHeight: 22},
  body1: {fontFamily: 'Raleway-Regular', fontSize: SIZES.body1, lineHeight: 36},
  body2: {fontFamily: 'Raleway-Regular', fontSize: SIZES.body2, lineHeight: 30},
  body3: {fontFamily: 'Raleway-Regular', fontSize: SIZES.body3, lineHeight: 22},
  body4: {fontFamily: 'Raleway-Regular', fontSize: SIZES.body4, lineHeight: 22},
  body5: {fontFamily: 'Raleway-Regular', fontSize: SIZES.body5, lineHeight: 22}
};

const appTheme = {COLORS, SIZES, FONTS};

export default appTheme;
