/**
 * Kuizu UI Design System - Typed Design Tokens & Theme Definitions
 */

export const THEME_COLORS = {
  duo: {
    green: 'var(--duo-green)',
    greenHover: 'var(--duo-green-hover)',
    greenShadow: 'var(--duo-green-shadow)',
    greenLight: 'var(--duo-green-light)',
    greenSubtle: 'var(--duo-green-subtle)',

    blue: 'var(--duo-blue)',
    blueHover: 'var(--duo-blue-hover)',
    blueShadow: 'var(--duo-blue-shadow)',
    blueSubtle: 'var(--duo-blue-subtle)',

    red: 'var(--duo-red)',
    redHover: 'var(--duo-red-hover)',
    redShadow: 'var(--duo-red-shadow)',
    redSubtle: 'var(--duo-red-subtle)',

    yellow: 'var(--duo-yellow)',
    yellowHover: 'var(--duo-yellow-hover)',
    yellowShadow: 'var(--duo-yellow-shadow)',
    yellowSubtle: 'var(--duo-yellow-subtle)',

    orange: 'var(--duo-orange)',
    orangeHover: 'var(--duo-orange-hover)',
    orangeShadow: 'var(--duo-orange-shadow)',
    orangeSubtle: 'var(--duo-orange-subtle)',

    purple: 'var(--duo-purple)',
    purpleHover: 'var(--duo-purple-hover)',
    purpleShadow: 'var(--duo-purple-shadow)',
    purpleSubtle: 'var(--duo-purple-subtle)',
  },
  kahoot: {
    red: 'var(--kahoot-red)',
    redHover: 'var(--kahoot-red-hover)',
    redShadow: 'var(--kahoot-red-shadow)',

    blue: 'var(--kahoot-blue)',
    blueHover: 'var(--kahoot-blue-hover)',
    blueShadow: 'var(--kahoot-blue-shadow)',

    yellow: 'var(--kahoot-yellow)',
    yellowHover: 'var(--kahoot-yellow-hover)',
    yellowShadow: 'var(--kahoot-yellow-shadow)',

    green: 'var(--kahoot-green)',
    greenHover: 'var(--kahoot-green-hover)',
    greenShadow: 'var(--kahoot-green-shadow)',
  },
  surfaces: {
    bgPrimary: 'var(--bg-primary)',
    bgSecondary: 'var(--bg-secondary)',
    bgCard: 'var(--bg-card)',
    bgCardHover: 'var(--bg-card-hover)',
    bgCardActive: 'var(--bg-card-active)',
    bgInput: 'var(--bg-input)',
  },
  borders: {
    subtle: 'var(--border-subtle)',
    card: 'var(--border-card)',
    focus: 'var(--border-focus)',
    error: 'var(--border-error)',
  },
  text: {
    primary: 'var(--text-primary)',
    secondary: 'var(--text-secondary)',
    muted: 'var(--text-muted)',
    inverse: 'var(--text-inverse)',
  },
} as const;

export type ThemeVariant =
  | 'duo'
  | 'blue'
  | 'red'
  | 'yellow'
  | 'orange'
  | 'purple'
  | 'kahoot'
  | 'neutral';

export type ComponentSize = 'sm' | 'md' | 'lg' | 'xl';
