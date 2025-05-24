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
    <div id="theme-toggle-container" className="flex items-center">
      {/* 左側アイコンを削除 */}
      {/*
      <span id="theme-icon" className="mr-2 text-sm flex items-center">
        {theme === 'light' ? (
          <FiMoon size={20} className="text-[var(--footer-text)]" /> 
        ) : (
          <FiSun size={20} className="text-[var(--footer-text)]" /> 
        )}
      </span>
      */}
      <button
        id="theme-toggle-button"
        type="button"
        onClick={toggleTheme}
        className={`
          relative inline-flex h-8 w-14 items-center rounded-full
          transition-colors duration-300 ease-in-out focus:outline-none
          ${theme === 'dark' ? 'bg-[var(--primary)]' : 'bg-[var(--secondary)]'}
        `}
        aria-pressed={theme === 'dark'}
      >
        <span className="sr-only">
          {theme === 'dark' ? 'ライトモードに切り替え' : 'ダークモードに切り替え'}
        </span>
        <span
          id="theme-toggle-knob"
          className={`
            inline-block h-8 w-8 rounded-full bg-white
            transform transition-transform duration-300 ease-in-out
            ${theme === 'dark' ? 'translate-x-[24px]' : 'translate-x-[0px]'}
            flex items-center justify-center
          `}
        >
          {theme === 'light' ? (
            <FiSun size={24} className="text-gray-800" />
          ) : (
            <FiMoon size={24} className="text-yellow-400" />
          )}
        </span>
      </button>
    </div>
  );
} 