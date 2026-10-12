'use client';

import React, { useState } from 'react';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';
import styles from './accordion.module.css';
import { useAudioStore } from '@/stores/audio.store';

export interface AccordionItemData {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItemData[];
  allowMultiple?: boolean;
  defaultExpanded?: string[];
  className?: string;
}

export function Accordion({
  items,
  allowMultiple = false,
  defaultExpanded = [],
  className,
}: AccordionProps) {
  const [expandedIds, setExpandedIds] = useState<string[]>(defaultExpanded);
  const playPop = useAudioStore((s) => s.playPop);

  const toggleItem = (id: string) => {
    playPop();
    setExpandedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      return allowMultiple ? [...prev, id] : [id];
    });
  };

  return (
    <div className={clsx(styles.accordionWrapper, className)}>
      {items.map((item) => {
        const isExpanded = expandedIds.includes(item.id);
        const headerId = `acc-header-${item.id}`;
        const contentId = `acc-content-${item.id}`;

        return (
          <div
            key={item.id}
            className={clsx(styles.item, {
              [styles.itemOpen]: isExpanded,
            })}
          >
            <button
              id={headerId}
              type="button"
              aria-expanded={isExpanded}
              aria-controls={contentId}
              onClick={() => toggleItem(item.id)}
              className={styles.header}
            >
              <span>{item.title}</span>
              <ChevronDown
                size={18}
                className={clsx(styles.chevron, {
                  [styles.chevronOpen]: isExpanded,
                })}
              />
            </button>

            {isExpanded && (
              <div
                id={contentId}
                role="region"
                aria-labelledby={headerId}
                className={styles.content}
              >
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
