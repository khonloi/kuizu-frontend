import React, { forwardRef, HTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './card.module.css';

export type CardPadding = 'none' | 'sm' | 'md' | 'lg';
export type CardBorderAccent = 'none' | 'duo' | 'kahoot' | 'blue' | 'red' | 'yellow';
/** @deprecated Use CardBorderAccent instead of CardGlow */
export type CardGlow = CardBorderAccent;

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: CardPadding;
  interactive?: boolean;
  borderAccent?: CardBorderAccent;
  /** @deprecated Use borderAccent instead */
  glow?: CardBorderAccent;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      className,
      padding = 'md',
      interactive = false,
      borderAccent = 'none',
      glow,
      ...rest
    },
    ref,
  ) => {
    const paddingClass = {
      none: styles.pNone,
      sm: styles.pSm,
      md: styles.pMd,
      lg: styles.pLg,
    }[padding];

    const activeAccent = glow ?? borderAccent;
    const accentClass = {
      none: '',
      duo: styles.accentDuo,
      kahoot: styles.accentKahoot,
      red: styles.accentRed,
      blue: styles.accentBlue,
      yellow: styles.accentYellow,
    }[activeAccent];

    return (
      <div
        ref={ref}
        className={clsx(
          styles.card,
          paddingClass,
          accentClass,
          {
            [styles.interactive]: interactive,
          },
          className,
        )}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = 'Card';
