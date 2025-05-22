"use client";

import { useState, useEffect } from 'react';
import { useTheme } from '@/lib/theme-context';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // コンポーネントがマウントされたときだけレンダリングを行う
  // これによりSSRとCSRの不一致を防ぐ
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center">
      <span className="mr-2 text-sm flex items-center">
        {theme === 'light' ? <FiSun className="text-[var(--footer-text)]" /> : <FiMoon className="text-[var(--footer-text)]" />}
      </span>
      <button
        type="button"
        onClick={toggleTheme}
        className={`
          relative inline-flex h-6 w-11 items-center rounded-full 
          transition-colors duration-300 ease-in-out focus:outline-none
          ${theme === 'dark' ? 'bg-[var(--primary)]' : 'bg-[var(--secondary)]'}
        `}
        aria-pressed={theme === 'dark'}
      >
        <span className="sr-only">
          {theme === 'dark' ? 'ライトモードに切り替え' : 'ダークモードに切り替え'}
        </span>
        <span
          className={`
            inline-block h-4 w-4 rounded-full bg-white 
            transform transition-transform duration-300 ease-in-out
            ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}
          `}
        />
      </button>
      <span className="ml-2 text-sm text-[var(--footer-text)]">
        {theme === 'light' ? 'ライト' : 'ダーク'}
      </span>
    </div>
  );
} 