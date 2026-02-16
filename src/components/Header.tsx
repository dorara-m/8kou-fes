'use client';

import { useState, useEffect } from 'react';

const navItems = [
  { href: '#top', label: 'TOP' },
  { href: '#schedule', label: 'SCHEDULE' },
  { href: '#gallery', label: 'GALLERY' },
  { href: '#credits', label: 'CREDITS' },
];

const SCROLL_THRESHOLD = 80;

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisible = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };
    updateVisible();
    window.addEventListener('scroll', updateVisible, { passive: true });
    return () => window.removeEventListener('scroll', updateVisible);
  }, []);

  useEffect(() => {
    if (!visible) setMenuOpen(false);
  }, [visible]);

  const closeMenu = () => setMenuOpen(false);

  const headerTransition =
    'transition-all duration-300 ease-out';
  const headerVisible =
    'opacity-100 translate-y-0 pointer-events-auto';
  const headerHidden =
    'opacity-0 -translate-y-2 pointer-events-none';

  return (
    <header>
      {/* デスクトップ: 横並びナビ */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 py-4 px-8 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 hidden md:flex gap-6 justify-end ${headerTransition} ${
          visible ? headerVisible : headerHidden
        }`}
      >
        {navItems.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            className="text-slate-600 hover:text-slate-900 transition font-bold"
          >
            {label}
          </a>
        ))}
      </nav>

      {/* SP: ハンバーガーボタン */}
      <div
        className={`fixed top-0 right-0 z-50 flex md:hidden p-2 ${headerTransition} ${
          visible ? headerVisible : headerHidden
        }`}
      >
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="p-2 text-slate-600 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400 rounded"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'メニューを閉じる' : 'メニューを開く'}
        >
          <span className="sr-only">
            {menuOpen ? 'メニューを閉じる' : 'メニューを開く'}
          </span>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* SP: 開いたメニュー（オーバーレイ + ドロワー） */}
      {menuOpen && (
        <>
          <button
            type="button"
            onClick={closeMenu}
            className="fixed inset-0 bg-black/30 z-40 md:hidden"
            aria-label="メニューを閉じる"
          />
          <div
            className="fixed top-10 left-0 right-0 z-50 md:hidden bg-white border-b border-slate-200 shadow-lg"
            role="dialog"
            aria-label="ナビゲーションメニュー"
          >
            <nav className="flex flex-col py-4 px-4">
              {navItems.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  onClick={closeMenu}
                  className="py-3 px-4 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
