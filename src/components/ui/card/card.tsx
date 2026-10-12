import React, { forwardRef, HTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './card.module.css';

export type CardPadding = 'none' | 'sm' | 'md' | 'lg';
export type CardGlow = 'none' | 'duo' | 'kahoot' | 'blue';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: CardPadding;
  interactive?: boolean;
  glow?: CardGlow;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      className,
      padding = 'md',
      interactive = false,
      glow = 'none',
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

    const glowClass = {
      none: '',
      duo: styles.glowDuo,
      kahoot: styles.glowKahoot,
      blue: styles.glowBlue,
    }[glow];

    return (
      <div
        ref={ref}
        className={clsx(
          styles.card,
          paddingClass,
          glowClass,
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
