"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'solaiz-theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // コンポーネントがマウントされたときに一度だけ実行
    if (!isInitialized) {
      // ローカルストレージから保存されたテーマを読み込む
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
      
      if (savedTheme) {
        // ユーザーが以前に選択したテーマがある場合はそれを使用
        setTheme(savedTheme);
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // システム設定がダークモードならダークテーマをデフォルトに
        setTheme('dark');
      }
      
      setIsInitialized(true);
    }
  }, [isInitialized]);

  // システム設定の変更を監視
  useEffect(() => {
    if (!isInitialized) return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      // ユーザーが明示的にテーマを選択していない場合のみ、システム設定に従う
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      if (!savedTheme) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };
    
    // 変更イベントをリッスン
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    
    // テーマに応じてdata-theme属性を設定
    document.documentElement.setAttribute('data-theme', theme);
    // ローカルストレージに保存（ユーザーが明示的に選択した場合）
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme, isInitialized]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 