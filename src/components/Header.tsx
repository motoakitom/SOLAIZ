'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiMenu, FiX, FiGlobe, FiChevronDown } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '@/lib/theme-context';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleLanguageMenu = () => setIsLanguageOpen(!isLanguageOpen);

  const languages = [
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'zh-CN', name: '简体中文', flag: '🇨🇳' },
    { code: 'zh-TW', name: '繁體中文', flag: '🇹🇼' },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.documentElement.lang = lng;
    setIsLanguageOpen(false);
  };

  // 初期言語を設定
  useEffect(() => {
    document.documentElement.lang = i18n.language || 'ja';
  }, [i18n.language]);

  return (
    <header 
      id="site-header" 
      className="fixed w-full text-white z-[999]"
    >
      <div className="relative">
        {/* 通常時のグラデーション背景 */}
        {!isMenuOpen && (
          <div 
            className="absolute inset-0 bg-gradient-to-b from-black via-black/90 via-85% to-transparent"
            style={{
              backdropFilter: 'blur(2px)',
              WebkitBackdropFilter: 'blur(2px)',
              maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
              maskSize: '100% 100%',
              WebkitMaskSize: '100% 100%',
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat'
            }}
          />
        )}
        
        {/* メニューオープン時の背景 */}
        {isMenuOpen && (
          <div 
            className="absolute inset-0 bg-[var(--background)]/90"
            style={{
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)'
            }}
          />
        )}
        
        {/* メインコンテンツ */}
        <div className="relative z-20">
          <div className="container mx-auto px-6 h-16 flex justify-between items-center z-[1000]">
            {/* 左側：メニューボタン */}
            <div className="flex items-center">
              <button 
                id="menu-toggle-btn"
                onClick={toggleMenu}
                className={`p-3 rounded-full hover:bg-white/30 transition-colors h-12 w-12 flex items-center justify-center text-white`}
                aria-label={t('menu')}
              >
                {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} aria-label={t('menu')} />}
              </button>
            </div>

            {/* 中央：ロゴ */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Link href="/" id="site-logo-link" className="block h-12 w-40 relative">
                <Image
                  src="/images/logo.png"
                  alt="SOLAIZ"
                  fill
                  className={`object-contain brightness-0 invert filter`}
                  priority
                />
              </Link>
            </div>

            {/* 右側：言語セレクタ */}
            <div className="flex items-center">
              <div className="relative">
                <button 
                  onClick={toggleLanguageMenu}
                  className="flex items-center p-2 rounded-full hover:bg-white/30 transition-colors h-12"
                  aria-haspopup="true"
                  aria-expanded={isLanguageOpen}
                >
                  <FiGlobe size={20} className="mr-1" />
                  <span className="sr-only">{t('language')}</span>
                  <FiChevronDown size={16} className="ml-1" />
                </button>
                {isLanguageOpen && (
                  <div 
                    className="absolute right-0 mt-1 w-40 bg-[var(--card)] text-[var(--card-foreground)] rounded-md shadow-lg overflow-hidden z-20"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="language-menu"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`w-full px-4 py-2 text-left text-sm hover:bg-[var(--muted)] transition-colors flex items-center ${
                          i18n.language === lang.code ? 'bg-[var(--muted)]' : ''
                        }`}
                        role="menuitem"
                      >
                        <span className="mr-2" aria-hidden="true">{lang.flag}</span>
                        {lang.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 上からドロップダウンするモバイルメニュー */}
      <div
        id="mobile-dropdown-menu"
        className={`fixed top-0 left-0 w-full overflow-hidden transition-all duration-300 ease-in-out text-[var(--foreground)] ${isMenuOpen ? 'max-h-screen visible' : 'max-h-0 invisible'}`}
        style={{ zIndex: 10, paddingTop: '4rem' }}
      >
        <div className="w-full h-full bg-[var(--background)]/80 backdrop-blur-sm">
          <nav className="container mx-auto pt-16">
            <ul className="flex flex-col space-y-4 px-8 py-8">
              <li>
                <Link 
                  href="/" 
                  className="block text-[var(--foreground)] hover:text-[var(--primary)] transition-colors text-lg" 
                  onClick={toggleMenu}
                >
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/rooms" 
                  className="block text-[var(--foreground)] hover:text-[var(--primary)] transition-colors text-lg" 
                  onClick={toggleMenu}
                >
                  {t('rooms')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/#access" 
                  className="block text-[var(--foreground)] hover:text-[var(--primary)] transition-colors text-lg" 
                  onClick={toggleMenu}
                >
                  {t('access')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="block text-[var(--foreground)] hover:text-[var(--primary)] transition-colors text-lg" 
                  onClick={toggleMenu}
                >
                  {t('contact')}
                </Link>
              </li>
              <li className="pt-4 mt-4 border-t border-[var(--border)]">
                <div className="flex items-center justify-between">
                  <span className="text-[var(--foreground)] text-lg">{t('theme')}</span>
                  <ThemeToggle />
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 