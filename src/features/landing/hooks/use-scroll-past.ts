'use client';

import { useState, useEffect, type RefObject } from 'react';

interface UseScrollPastOptions {
  offset?: number;
  thresholdRef?: RefObject<HTMLElement | null>;
}

/**
 * Hook that returns true when user has scrolled past a specific pixel offset
 * or past the bottom edge of a target element.
 */
export function useScrollPast({ offset = 300, thresholdRef }: UseScrollPastOptions = {}): boolean {
  const [hasScrolledPast, setHasScrolledPast] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let targetThreshold = offset;

    const calculateThreshold = () => {
      if (thresholdRef?.current) {
        const rect = thresholdRef.current.getBoundingClientRect();
        targetThreshold = window.scrollY + rect.bottom;
      } else {
        targetThreshold = offset;
      }
    };

    calculateThreshold();

    const handleScroll = () => {
      setHasScrolledPast(window.scrollY > targetThreshold);
    };

    const handleResize = () => {
      calculateThreshold();
      handleScroll();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [offset, thresholdRef]);

  return hasScrolledPast;
}
