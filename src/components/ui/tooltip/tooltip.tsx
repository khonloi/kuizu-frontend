'use client';

import React, { useState, useId, cloneElement, isValidElement } from 'react';
import clsx from 'clsx';
import styles from './tooltip.module.css';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement<{
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    onFocus?: () => void;
    onBlur?: () => void;
    'aria-describedby'?: string;
  }>;
  placement?: TooltipPlacement;
  delayMs?: number;
  className?: string;
}

export function Tooltip({
  content,
  children,
  placement = 'top',
  delayMs = 150,
  className,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const tooltipId = useId();

  const showTooltip = () => {
    const id = setTimeout(() => {
      setIsVisible(true);
    }, delayMs);
    setTimeoutId(id);
  };

  const hideTooltip = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setIsVisible(false);
  };

  if (!isValidElement(children)) {
    return <>{children}</>;
  }

  const trigger = cloneElement(children, {
    onMouseEnter: () => {
      children.props.onMouseEnter?.();
      showTooltip();
    },
    onMouseLeave: () => {
      children.props.onMouseLeave?.();
      hideTooltip();
    },
    onFocus: () => {
      children.props.onFocus?.();
      showTooltip();
    },
    onBlur: () => {
      children.props.onBlur?.();
      hideTooltip();
    },
    'aria-describedby': isVisible ? tooltipId : undefined,
  });

  return (
    <div className={clsx(styles.tooltipContainer, className)}>
      {trigger}

      {isVisible && (
        <div
          id={tooltipId}
          role="tooltip"
          className={clsx(styles.tooltipBubble, styles[placement])}
        >
          {content}
        </div>
      )}
    </div>
  );
}
