import { Edibility } from '../data/mushrooms';

// Dark Forest: 80% dark surfaces, 15% muted greens, 5% light text/accents.
export const colors = {
  background: '#0F1712',
  surface: '#18251D',
  surfaceRaised: '#203025',
  forest: '#4A7A5B',
  forestMuted: '#355242',
  sage: '#9CB8A4',
  text: '#EDEAE0',
  textMuted: '#8C9A91',
  edible: '#5E9470',
  inedible: '#C79A4B',
  poison: '#B5483F',
  accentLight: '#D8C9A3',
};

export const edibilityColor: Record<Edibility, string> = {
  edible: colors.edible,
  inedible: colors.inedible,
  poisonous: colors.poison,
};

export const fonts = {
  heading: 'CormorantGaramond_700Bold',
  headingMedium: 'CormorantGaramond_600SemiBold',
  body: 'Manrope_400Regular',
  bodyMedium: 'Manrope_500Medium',
  bodyBold: 'Manrope_700Bold',
};

export const radius = { sm: 12, md: 16, lg: 20 };
