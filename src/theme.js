import { useColorScheme, useWindowDimensions } from 'react-native';

const light = {
  dark: false,
  primary: '#0E6E8C',
  primaryText: '#FFFFFF',
  background: '#F4F7FB',
  card: '#FFFFFF',
  text: '#13212B',
  muted: '#5B6B78',
  border: '#E1E8EF',
  danger: '#C62828',
  dangerBg: '#FDECEC',
  tableHead: '#EAF3F7',
  input: '#FFFFFF',
};

const dark = {
  dark: true,
  primary: '#3FA9CB',
  primaryText: '#06212B',
  background: '#0D151B',
  card: '#16222B',
  text: '#E8EFF4',
  muted: '#9AAAB6',
  border: '#24343F',
  danger: '#FF8A80',
  dangerBg: '#3A1C1C',
  tableHead: '#1C2D38',
  input: '#1B2832',
};

export function useTheme() {
  return useColorScheme() === 'dark' ? dark : light;
}

/**
 * Responsive layout helper.
 * - Content is centred and capped at a readable width on tablets / landscape.
 * - Grid column count adapts to the available width.
 * - Font scale grows slightly on large screens.
 */
export function useLayout() {
  const { width, height } = useWindowDimensions();
  const isTablet = Math.min(width, height) >= 600;
  const maxWidth = isTablet ? 900 : 680;
  const contentWidth = Math.min(width, maxWidth);
  const gutter = width < 360 ? 12 : 16;
  const columns = contentWidth >= 820 ? 3 : contentWidth >= 520 ? 2 : 1;
  const scale = isTablet ? 1.1 : width < 360 ? 0.94 : 1;
  return { width, height, isTablet, maxWidth, contentWidth, gutter, columns, fs: (n) => Math.round(n * scale) };
}
