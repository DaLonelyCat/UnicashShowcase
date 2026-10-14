import React, { useState, useEffect } from 'react';
import {
  Sun,
  Moon,
  Menu,
  X,
  Layers,
  Terminal,
  Scale,
  CreditCard,
  Cpu,
  Home,
  Download
} from 'lucide-react';

const NAV_SECTIONS = [
  { id: 'top', icon: Home, labelEn: 'Overview', labelId: 'Ringkasan' },
  { id: 'tour', icon: Layers, labelEn: 'Interface Gallery', labelId: 'Galeri Layar' },
  { id: 'sandbox', icon: Terminal, labelEn: 'POS Sandbox', labelId: 'Sandbox Kasir' },
  { id: 'accounting', icon: Scale, labelEn: 'General Ledger', labelId: 'Buku Besar' },
  { id: 'pricing', icon: CreditCard, labelEn: 'Lifetime License', labelId: 'Lisensi & Harga' },
  { id: 'architecture', icon: Cpu, labelEn: 'System Specs', labelId: 'Spesifikasi Sistem' }
];

export default function SideNavbar({
  theme,
  onToggleTheme,
  lang,
  onToggleLang,
  t
}) {
  const [activeSection, setActiveSection] = useState('top');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll-spy active section tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY < 120) {
        setActiveSection('top');
        return;
      }

      for (let i = NAV_SECTIONS.length - 1; i >= 0; i--) {
        const sec = document.getElementById(NAV_SECTIONS[i].id);
        if (sec) {
          const rect = sec.getBoundingClientRect();
          if (rect.top <= 260) {
            setActiveSection(NAV_SECTIONS[i].id);
            return;
          }
        }
      }
      setActiveSection('top');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on Escape key
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* =========================================================================
          DESKTOP PERSISTENT FLOATING SIDE NAVIGATION RAIL (>= 1024px)
          Vertically centered frosted capsule pinned to the left side, following scroll.
          Does not force rigid body offsets, keeping the entire site centered.
          ========================================================================= */}
      <nav
        aria-label="Desktop Navigation Rail"
        className="hidden lg:flex fixed left-4 xl:left-6 top-1/2 -translate-y-1/2 flex-col items-center py-3 px-2 rounded-2xl bg-[#fdfcff]/90 dark:bg-[#181a20]/90 backdrop-blur-md border border-[#d8dce6] dark:border-[#262932] shadow-2xl z-40 select-none transition-transform duration-200"
      >
        {/* Brand Logo Glyph at Top of Rail */}
        <div className="relative group mb-1.5">
          <button
            type="button"
            onClick={() => handleNavClick('top')}
            aria-label="Unicat Home"
            className="w-11 h-11 rounded-xl overflow-hidden border border-[#d8dce6] dark:border-[#262932] bg-[#111318] flex items-center justify-center p-1.5 transition-transform group-hover:scale-105 cursor-pointer shadow-xs"
          >
            <img src="/icon.svg" alt="Unicat Logo" className="w-full h-full object-contain" />
          </button>
          <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-lg bg-[#111318] text-[#f1f3f8] dark:bg-[#fdfcff] dark:text-[#111318] text-xs font-semibold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg z-50">
            Unicat v2.1
          </div>
        </div>

        <div className="w-6 h-px bg-[#d8dce6] dark:border-[#262932] mb-1.5" />

        {/* Section Navigation Icons */}
        <div className="space-y-1">
          {NAV_SECTIONS.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <div key={item.id} className="relative group">
                <button
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  aria-label={t(item.labelEn, item.labelId)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#005ac1] text-white shadow-sm dark:bg-[#a8c7fa] dark:text-[#001a41]'
                      : 'text-[#44474f] dark:text-[#9ca3af] hover:text-[#111318] dark:hover:text-[#f1f3f8] hover:bg-[#f1f3f8] dark:hover:bg-[#262932]'
                  }`}
                >
                  <Icon
                    size={17}
                    className={
                      isActive
                        ? 'text-white dark:text-[#001a41]'
                        : 'text-[#005ac1] dark:text-[#a8c7fa]'
                    }
                  />
                  {isActive && (
                    <span className="absolute right-1 top-1 w-1.5 h-1.5 rounded-full bg-white dark:bg-[#001a41]" />
                  )}
                </button>

                {/* Right Floating Tooltip */}
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-lg bg-[#111318] text-[#f1f3f8] dark:bg-[#fdfcff] dark:text-[#111318] text-xs font-semibold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg z-50">
                  {t(item.labelEn, item.labelId)}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Divider */}
        <div className="w-6 h-px bg-[#d8dce6] dark:border-[#262932] my-2" />

        {/* Mini Quick Actions */}
        <div className="space-y-1">
          {/* Theme Toggle */}
          <div className="relative group">
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="w-11 h-11 rounded-xl flex items-center justify-center text-[#44474f] dark:text-[#9ca3af] hover:text-[#111318] dark:hover:text-[#f1f3f8] hover:bg-[#f1f3f8] dark:hover:bg-[#262932] transition-colors cursor-pointer"
            >
              {theme === 'dark' ? (
                <Sun size={16} className="text-amber-400" />
              ) : (
                <Moon size={16} className="text-[#005ac1]" />
              )}
            </button>
            <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-lg bg-[#111318] text-[#f1f3f8] dark:bg-[#fdfcff] dark:text-[#111318] text-xs font-semibold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg z-50">
              {theme === 'dark' ? t('Light Mode', 'Mode Terang') : t('Dark Mode', 'Mode Gelap')}
            </div>
          </div>

          {/* Language Toggle */}
          <div className="relative group">
            <button
              type="button"
              onClick={onToggleLang}
              aria-label={t('Switch Language', 'Ganti Bahasa')}
              className="w-11 h-11 rounded-xl flex items-center justify-center font-mono text-xs font-bold text-[#005ac1] dark:text-[#a8c7fa] hover:bg-[#f1f3f8] dark:hover:bg-[#262932] transition-colors cursor-pointer"
            >
              {lang}
            </button>
            <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-lg bg-[#111318] text-[#f1f3f8] dark:bg-[#fdfcff] dark:text-[#111318] text-xs font-semibold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg z-50">
              {lang === 'EN' ? 'Bahasa Indonesia' : 'English'}
            </div>
          </div>

          {/* Download CTA */}
          <div className="relative group">
            <button
              type="button"
              onClick={() => handleNavClick('pricing')}
              aria-label={t('Download UniCash', 'Unduh UniCash')}
              className="w-11 h-11 rounded-xl flex items-center justify-center bg-[#005ac1] text-white dark:bg-[#a8c7fa] dark:text-[#001a41] hover:bg-[#00489e] dark:hover:bg-[#8ab4f8] transition-colors cursor-pointer shadow-xs"
            >
              <Download size={15} />
            </button>
            <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-lg bg-[#111318] text-[#f1f3f8] dark:bg-[#fdfcff] dark:text-[#111318] text-xs font-semibold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg z-50">
              {t('Download Free v2.1', 'Unduh Gratis v2.1')}
            </div>
          </div>
        </div>

        {/* Status Pulse Dot */}
        <div className="relative group mt-2">
          <div className="w-6 h-6 flex items-center justify-center cursor-default">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-lg bg-[#111318] text-[#f1f3f8] dark:bg-[#fdfcff] dark:text-[#111318] text-xs font-mono font-semibold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg z-50">
            {t('Zero Cloud / 100% Offline', 'Tanpa Cloud / 100% Offline')}
          </div>
        </div>
      </nav>

      {/* =========================================================================
          MOBILE TOP NAVBAR (< 1024px)
          Compact sticky bar preserving full screen width on mobile devices
          ========================================================================= */}
      <header
        aria-label="Mobile Navigation Bar"
        className="lg:hidden sticky top-0 z-40 w-full backdrop-blur-md bg-[#fdfcff]/95 dark:bg-[#111318]/95 border-b border-[#d8dce6] dark:border-[#262932] transition-colors"
      >
        <div className="px-4 h-14 flex items-center justify-between gap-3">
          {/* Mobile Brand Mark */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('top');
            }}
            className="flex items-center gap-2.5 focus-visible:outline-none"
            aria-label="Unicat Home"
          >
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-[#d8dce6] dark:border-[#262932] bg-[#111318] flex items-center justify-center shrink-0">
              <img src="/icon.svg" alt="Unicat Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-extrabold text-base tracking-tight text-[#111318] dark:text-[#f1f3f8]">
                Unicat
              </span>
              <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-[#d8e2ff] text-[#001a41] dark:bg-[#004881] dark:text-[#d8e2ff]">
                v2.1
              </span>
            </div>
          </a>

          {/* Mobile Quick Toggles & Hamburger Trigger */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={onToggleLang}
              aria-label={t('Switch Language', 'Ganti Bahasa')}
              className="min-h-[44px] min-w-[44px] p-2.5 rounded-xl font-mono text-xs font-bold text-[#005ac1] dark:text-[#a8c7fa] flex items-center justify-center cursor-pointer"
            >
              {lang}
            </button>

            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="min-h-[44px] min-w-[44px] p-2.5 rounded-xl text-[#111318] dark:text-[#f1f3f8] flex items-center justify-center cursor-pointer"
            >
              {theme === 'dark' ? (
                <Sun size={17} className="text-amber-400" />
              ) : (
                <Moon size={17} className="text-[#005ac1]" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
              className="min-h-[44px] min-w-[44px] p-2.5 rounded-xl text-[#111318] dark:text-[#f1f3f8] hover:bg-[#f1f3f8] dark:hover:bg-[#181a20] transition-colors flex items-center justify-center cursor-pointer"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-Down Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#d8dce6] dark:border-[#262932] bg-[#fdfcff] dark:bg-[#111318] px-4 py-4 space-y-3 animate-in slide-in-from-top-2 duration-150">
            <nav aria-label="Mobile Navigation Menu" className="space-y-1">
              {NAV_SECTIONS.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`w-full min-h-[44px] px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 text-left transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#005ac1] text-white dark:bg-[#a8c7fa] dark:text-[#001a41]'
                        : 'text-[#44474f] dark:text-[#9ca3af] hover:text-[#111318] dark:hover:text-[#f1f3f8] hover:bg-[#f1f3f8] dark:hover:bg-[#181a20]'
                    }`}
                  >
                    <Icon
                      size={17}
                      className={
                        isActive
                          ? 'text-white dark:text-[#001a41]'
                          : 'text-[#005ac1] dark:text-[#a8c7fa]'
                      }
                    />
                    <span>{t(item.labelEn, item.labelId)}</span>
                  </button>
                );
              })}
            </nav>

            <div className="pt-2 border-t border-[#d8dce6] dark:border-[#262932]">
              <button
                type="button"
                onClick={() => handleNavClick('pricing')}
                className="w-full min-h-[44px] px-4 py-3 rounded-xl font-bold text-xs bg-[#005ac1] text-white dark:bg-[#a8c7fa] dark:text-[#001a41] flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Download size={15} />
                <span>{t('Download Free v2.1', 'Unduh Gratis v2.1')}</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
