'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiGlobe } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('日本語');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="fixed w-full text-white z-50">
      <div className="relative bg-gradient-to-b from-black to-black/0">
      <div className="container mx-auto px-6 h-16 flex justify-between items-center">
        {/* 左側：メニューボタン */}
        <div className="flex items-center">
          <button 
            onClick={toggleMenu}
            className="p-3 rounded-full hover:bg-white/30 text-white transition-colors h-12 w-12 flex items-center justify-center"
            aria-label="メニュー"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* 中央：ロゴ */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link href="/" className="block h-12 w-40 relative">
            <Image
              src="/images/logo.png"
              alt="SOLAIZ"
              fill
              className="object-contain brightness-0 invert filter"
              priority
            />
          </Link>
        </div>

        {/* 右側：言語セレクタ */}
        <div className="flex items-center">
          <div className="relative group">
            <button className="flex items-center p-3 rounded-full text-white hover:bg-white/30 transition-colors h-12 w-12 justify-center">
              <FiGlobe size={20} />
              <span className="sr-only">{language}</span>
            </button>
            <div className="absolute right-0 mt-1 w-32 bg-[var(--card)] text-[var(--card-foreground)] rounded-md shadow-lg overflow-hidden z-20 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300">
              <button 
                onClick={() => setLanguage('日本語')}
                className="w-full px-4 py-2 text-left text-sm hover:bg-[var(--muted)] transition-colors"
              >
                日本語
              </button>
              <button 
                onClick={() => setLanguage('English')}
                className="w-full px-4 py-2 text-left text-sm hover:bg-[var(--muted)] transition-colors"
              >
                English
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* モバイルメニュー */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* オーバーレイ */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-40"
              onClick={toggleMenu}
            />
            {/* メニュー */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed left-0 top-0 h-full w-64 bg-background/95 backdrop-blur-md z-50 shadow-2xl"
            >
              <nav className="h-full flex flex-col pt-20 px-6">
                <ul className="space-y-6">
                  <li>
                    <Link 
                      href="/" 
                      className="block py-3 text-foreground hover:text-primary transition-colors text-lg" 
                      onClick={toggleMenu}
                    >
                      ホーム
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/rooms" 
                      className="block py-3 text-foreground hover:text-primary transition-colors text-lg" 
                      onClick={toggleMenu}
                    >
                      お部屋
                    </Link>
                  </li>
                  <li>
                    <a 
                      href="#access" 
                      className="block py-3 text-foreground hover:text-primary transition-colors text-lg" 
                      onClick={toggleMenu}
                    >
                      アクセス
                    </a>
                  </li>
                  <li>
                    <Link 
                      href="/contact" 
                      className="block py-3 text-foreground hover:text-primary transition-colors text-lg" 
                      onClick={toggleMenu}
                    >
                      お問い合わせ
                    </Link>
                  </li>
                  <li className="pt-6 mt-4 border-t border-border">
                    <div className="flex items-center justify-between py-2">
                      <span className="text-foreground text-lg">テーマ</span>
                      <ThemeToggle />
                    </div>
                  </li>
                </ul>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      </div>
    </header>
  );
};

export default Header; 