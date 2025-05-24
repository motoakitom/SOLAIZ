'use client';

import Link from 'next/link';
import { FiInstagram, FiTwitter, FiFacebook } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="site-footer" className="bg-[var(--footer-bg)] text-[var(--footer-text)] pt-16 pb-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-6xl mx-auto">
          {/* ロゴと説明 */}
          <div id="footer-branding" className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold mb-4 text-[var(--footer-text)]">SOLAIZ</h2>
            <p className="mb-4">
              石垣島の美しい自然に囲まれた、くつろぎと癒しの空間。
              あなただけの特別な島時間をお過ごしください。
            </p>
            <div id="footer-social-links" className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[var(--footer-link)] hover:text-[var(--footer-link-hover)] transition-colors" aria-label="Instagram">
                <FiInstagram size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[var(--footer-link)] hover:text-[var(--footer-link-hover)] transition-colors" aria-label="Twitter">
                <FiTwitter size={24} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[var(--footer-link)] hover:text-[var(--footer-link-hover)] transition-colors" aria-label="Facebook">
                <FiFacebook size={24} />
              </a>
            </div>
          </div>

          {/* リンク */}
          <div id="footer-links">
            <h3 className="text-lg font-semibold mb-4 text-[var(--footer-text)]">リンク</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" id="footer-link-home" className="text-[var(--footer-link)] hover:text-[var(--footer-link-hover)] transition-colors">
                  ホーム
                </Link>
              </li>
              <li>
                <Link href="/rooms" id="footer-link-rooms" className="text-[var(--footer-link)] hover:text-[var(--footer-link-hover)] transition-colors">
                  お部屋
                </Link>
              </li>
              <li>
                <Link href="/reservation" id="footer-link-reservation" className="text-[var(--footer-link)] hover:text-[var(--footer-link-hover)] transition-colors">
                  予約
                </Link>
              </li>
              <li>
                <Link href="/access" id="footer-link-access" className="text-[var(--footer-link)] hover:text-[var(--footer-link-hover)] transition-colors">
                  アクセス
                </Link>
              </li>
            </ul>
          </div>

          {/* コンタクト */}
          <div id="footer-contact">
            <h3 className="text-lg font-semibold mb-4 text-[var(--footer-text)]">お問い合わせ</h3>
            <address className="not-italic">
              <p>〒907-0453</p>
              <p>石垣県石垣市川平831-1</p>
              <p className="mt-2"><a href="tel:+81980XXxxxx" className="text-[var(--footer-link)] hover:text-[var(--footer-link-hover)] transition-colors">TEL: 0980-XX-XXXX</a></p>
              <p><a href="mailto:info@solaiz.jp" className="text-[var(--footer-link)] hover:text-[var(--footer-link-hover)] transition-colors">Email: info@solaiz.jp</a></p>
            </address>
          </div>
        </div>

        <div id="footer-bottom" className="border-t border-[var(--footer-link)] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p id="footer-copyright" className="text-[var(--footer-text)]">&copy; {currentYear} SOLAIZ All Rights Reserved.</p>
          <div id="footer-theme-toggle">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 