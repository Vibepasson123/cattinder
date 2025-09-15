import { colors } from './colors';

export const typography = {

  breedName: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    color: colors.white,
    lineHeight: 28,
  },
  

  origin: {
    fontSize: 16,
    fontWeight: 'normal' as const,
    color: colors.white,
    lineHeight: 20,
  },

  h1: {
    fontSize: 32,
    fontWeight: 'bold' as const,
    color: colors.black,
    lineHeight: 40,
  },
  h2: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    color: colors.black,
    lineHeight: 36,
  },
  h3: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    color: colors.black,
    lineHeight: 32,
  },
  body: {
    fontSize: 16,
    fontWeight: 'normal' as const,
    color: colors.neutral,
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    fontWeight: 'normal' as const,
    color: colors.neutral,
    lineHeight: 20,
  },
  small: {
    fontSize: 12,
    fontWeight: 'normal' as const,
    color: colors.grey[500],
    lineHeight: 16,
  },
} as const;

export type TypographyKey = keyof typeof typography;
