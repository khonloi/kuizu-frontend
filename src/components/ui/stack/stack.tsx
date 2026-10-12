import React, { forwardRef, HTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './stack.module.css';

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  direction?: 'horizontal' | 'vertical';
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between';
  wrap?: boolean;
}

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  (
    {
      direction = 'vertical',
      gap = 'md',
      align = 'stretch',
      justify = 'start',
      wrap = false,
      children,
      className,
      ...rest
    },
    ref,
  ) => {
    const gapClass = {
      xs: styles.gapXs,
      sm: styles.gapSm,
      md: styles.gapMd,
      lg: styles.gapLg,
      xl: styles.gapXl,
    }[gap];

    const alignClass = {
      start: styles.alignStart,
      center: styles.alignCenter,
      end: styles.alignEnd,
      stretch: styles.alignStretch,
    }[align];

    const justifyClass = {
      start: styles.justifyStart,
      center: styles.justifyCenter,
      end: styles.justifyEnd,
      between: styles.justifyBetween,
    }[justify];

    return (
      <div
        ref={ref}
        className={clsx(
          styles.stack,
          styles[direction],
          gapClass,
          alignClass,
          justifyClass,
          { [styles.wrap]: wrap },
          className,
        )}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

Stack.displayName = 'Stack';
