'use client';

import React, { useState, KeyboardEvent } from 'react';
import clsx from 'clsx';
import styles from './tabs.module.css';
import { useAudioStore } from '@/stores/audio.store';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: TabItem[];
  defaultTab?: string;
  activeTab?: string;
  onChange?: (tabId: string) => void;
  className?: string;
  'aria-label'?: string;
}

export function Tabs({
  tabs,
  defaultTab,
  activeTab,
  onChange,
  className,
  'aria-label': ariaLabel = 'Content navigation tabs',
}: TabsProps) {
  const [internalActive, setInternalActive] = useState(defaultTab || tabs[0]?.id);
  const currentTabId = activeTab !== undefined ? activeTab : internalActive;
  const playPop = useAudioStore((s) => s.playPop);

  const handleSelect = (id: string) => {
    playPop();
    if (activeTab === undefined) {
      setInternalActive(id);
    }
    onChange?.(id);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    const enabledTabs = tabs.filter((t) => !t.disabled);
    const enabledCurrentIndex = enabledTabs.findIndex((t) => t.id === tabs[currentIndex].id);

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextTab = enabledTabs[(enabledCurrentIndex + 1) % enabledTabs.length];
      if (nextTab) handleSelect(nextTab.id);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevTab = enabledTabs[(enabledCurrentIndex - 1 + enabledTabs.length) % enabledTabs.length];
      if (prevTab) handleSelect(prevTab.id);
    }
  };

  const currentTab = tabs.find((t) => t.id === currentTabId) || tabs[0];

  return (
    <div className={clsx(styles.tabsContainer, className)}>
      <div role="tablist" aria-label={ariaLabel} className={styles.tabList}>
        {tabs.map((tab, idx) => {
          const isActive = tab.id === currentTabId;

          return (
            <button
              key={tab.id}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              disabled={tab.disabled}
              onClick={() => handleSelect(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={clsx(styles.tabTrigger, {
                [styles.tabTriggerActive]: isActive,
              })}
            >
              {tab.icon && <span>{tab.icon}</span>}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {currentTab && (
        <div
          role="tabpanel"
          id={`panel-${currentTab.id}`}
          aria-labelledby={`tab-${currentTab.id}`}
          tabIndex={0}
          className={styles.tabPanel}
        >
          {currentTab.content}
        </div>
      )}
    </div>
  );
}
