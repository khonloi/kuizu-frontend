'use client';

import React, { useState, useRef, useEffect, forwardRef, KeyboardEvent } from 'react';
import clsx from 'clsx';
import { ChevronDown, Check } from 'lucide-react';
import styles from './select.module.css';
import { useAudioStore } from '@/stores/audio.store';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
}

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      options,
      value,
      onChange,
      placeholder = 'Select an option...',
      label,
      disabled = false,
      className,
      id,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const playPop = useAudioStore((s) => s.playPop);

    const selectedOption = options.find((opt) => opt.value === value);

    // Close on outside click
    useEffect(() => {
      const handleOutsideClick = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleOutsideClick);
      return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    const toggleOpen = () => {
      if (disabled) return;
      playPop();
      setIsOpen((prev) => !prev);
    };

    const handleSelect = (val: string) => {
      playPop();
      onChange?.(val);
      setIsOpen(false);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) return;

      if (e.key === 'Escape') {
        setIsOpen(false);
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        }
      }
    };

    return (
      <div ref={containerRef} className={clsx(styles.selectWrapper, className)}>
        {label && <label className={styles.label}>{label}</label>}

        <button
          ref={ref}
          id={id}
          type="button"
          disabled={disabled}
          onClick={toggleOpen}
          onKeyDown={handleKeyDown}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className={clsx(styles.trigger, {
            [styles.triggerOpen]: isOpen,
          })}
        >
          <span>{selectedOption ? selectedOption.label : placeholder}</span>
          <ChevronDown
            size={18}
            className={clsx(styles.chevron, {
              [styles.chevronOpen]: isOpen,
            })}
          />
        </button>

        {isOpen && (
          <div role="listbox" className={styles.menu}>
            {options.map((opt) => {
              const isSelected = opt.value === value;

              return (
                <button
                  key={opt.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  disabled={opt.disabled}
                  onClick={() => handleSelect(opt.value)}
                  className={clsx(styles.option, {
                    [styles.optionSelected]: isSelected,
                  })}
                >
                  <span>{opt.label}</span>
                  {isSelected && <Check size={16} />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  },
);

Select.displayName = 'Select';
