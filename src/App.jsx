import React, { useState, useEffect, useCallback } from 'react';
import SideNavbar from './components/SideNavbar';
import HeroSection from './components/HeroSection';
import ScreenshotTourSection from './components/ScreenshotTourSection';
import InteractiveSandboxSection from './components/InteractiveSandboxSection';
import AccountingLedgerSection from './components/AccountingLedgerSection';
import PricingSection from './components/PricingSection';
import ArchitectureSpecSection from './components/ArchitectureSpecSection';
import EditorialFooter from './components/EditorialFooter';

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    try {
      const saved = localStorage.getItem('unicash_web_theme');
      return saved ? saved === 'dark' : true;
    } catch {
      return true;
    }
  });

  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem('unicash_web_lang');
      return saved === 'ID' ? 'ID' : 'EN';
    } catch {
      return 'EN';
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('unicash_web_theme', isDark ? 'dark' : 'light');
    } catch {
      // ignore storage errors
    }
  }, [isDark]);

  useEffect(() => {
    try {
      localStorage.setItem('unicash_web_lang', lang);
    } catch {
      // ignore storage errors
    }
  }, [lang]);

  const handleToggleTheme = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  const handleToggleLang = useCallback(() => {
    setLang((prev) => (prev === 'EN' ? 'ID' : 'EN'));
  }, []);

  const t = useCallback(
    (enText, idText) => (lang === 'ID' && idText ? idText : enText),
    [lang]
  );

  const formatRp = useCallback((num) => {
    const n = Math.round(Number(num) || 0);
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }, []);

  const currentTheme = isDark ? 'dark' : 'light';

  return (
    <div
      id="app-root"
      className={`min-h-screen flex flex-col selection:bg-[#005ac1] selection:text-white ${
        isDark ? 'bg-[#111318] text-[#f1f3f8]' : 'bg-[#fdfcff] text-[#111318]'
      }`}
    >
      {/* WCAG 2.4.1 Bypass Blocks: Skip to Main Content Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:rounded-xl focus:bg-[#005ac1] focus:text-white dark:focus:bg-[#a8c7fa] dark:focus:text-[#001a41] focus:shadow-xl focus:font-mono focus:text-xs focus:font-bold focus:outline-none"
      >
        {t('Skip to main content', 'Lewati ke konten utama')}
      </a>

      <SideNavbar
        theme={currentTheme}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        lang={lang}
        onToggleLang={handleToggleLang}
        t={t}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <main id="main-content" className="flex-1">
          <HeroSection
            isDark={isDark}
            onToggleTheme={handleToggleTheme}
            t={t}
            formatRp={formatRp}
          />

          <ScreenshotTourSection
            pageTheme={currentTheme}
            isDark={isDark}
            t={t}
          />

          <InteractiveSandboxSection
            isDark={isDark}
            t={t}
            formatRp={formatRp}
          />

          <AccountingLedgerSection
            isDark={isDark}
            t={t}
            formatRp={formatRp}
          />

          <PricingSection
            isDark={isDark}
            t={t}
            formatRp={formatRp}
          />

          <ArchitectureSpecSection
            isDark={isDark}
            t={t}
          />
        </main>

        <EditorialFooter
          isDark={isDark}
          onToggleTheme={handleToggleTheme}
          lang={lang}
          onToggleLang={handleToggleLang}
          t={t}
        />
      </div>
    </div>
  );
}
