'use client';

import styles from './Tabs.module.css';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
}

export default function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  return (
    <div className={styles.tabs} role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={tab.id === activeTab}
          className={[styles.tab, tab.id === activeTab ? styles.active : ''].join(' ')}
          onClick={() => onChange(tab.id)}
          type="button"
        >
          {tab.icon && <span className={styles.icon}>{tab.icon}</span>}
          {tab.label}
        </button>
      ))}
    </div>
  );
}
