import React from 'react';
import { ArrowUpRight, Globe, Sun, Moon, Terminal, Play, Layers } from 'lucide-react';

export default function EditorialFooter({ isDark, onToggleTheme, lang, onToggleLang, t }) {
  return (
    <footer
      className={`py-16 border-t transition-colors ${
        isDark ? 'bg-[#090a0f] border-white/[0.08] text-zinc-300' : 'bg-[#eef1f8] border-black/[0.08] text-zinc-700'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-black/[0.08] dark:border-white/[0.08]">
          {/* Col 1-5: Brand & Positioning */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl overflow-hidden border border-[#d8dce6] dark:border-[#262932] bg-[#111318] flex items-center justify-center p-1.5 shadow-sm">
                <img src="/icon.svg" alt="Unicat Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="font-display font-extrabold text-lg tracking-tight text-zinc-950 dark:text-white">
                  Unicat <span className="font-mono text-xs font-semibold text-[#005ac1] dark:text-[#a8c7fa]">v2.1</span>
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">
                  {t('Zero-Cloud POS, Accounting & Local AI OS', 'OS Kasir POS, Akuntansi & AI Lokal Tanpa Cloud')}
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm leading-relaxed max-w-md text-zinc-500 dark:text-zinc-400">
              {t(
                'Built for independent F&B counters, coffee bars, and retail booths that demand instant cashier response, automated gram-level recipe deductions, and balanced financial statements.',
                'Dirancang untuk gerai F&B independen, kedai kopi, dan booth ritel yang membutuhkan respon kasir instan, pemotongan resep hingga satuan gram, dan laporan keuangan seimbang.'
              )}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <a
                href="#sandbox"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#005ac1] text-white hover:bg-[#004881] transition-colors min-h-[44px]"
              >
                <Play size={13} />
                <span>{t('Test Interactive Cashier', 'Coba Kasir Interaktif')}</span>
              </a>
              <a
                href="#tour"
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-colors min-h-[44px] ${
                  isDark
                    ? 'border-white/[0.12] text-zinc-200 hover:bg-white/[0.06]'
                    : 'border-black/[0.12] text-zinc-800 hover:bg-black/[0.04]'
                }`}
              >
                <Layers size={13} />
                <span>{t('Explore 8-Screen Tour', 'Jelajahi Tur 8 Layar')}</span>
              </a>
            </div>
          </div>

          {/* Col 6-8: Section Navigation */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400">
              {t('Platform Modules', 'Modul Platform')}
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a href="#top" className="hover:text-[#005ac1] dark:hover:text-[#a8c7fa] transition-colors inline-flex items-center gap-1">
                  <span>{t('Overview & Live Ledger', 'Ringkasan & Alur Pesanan')}</span>
                </a>
              </li>
              <li>
                <a href="#tour" className="hover:text-[#005ac1] dark:hover:text-[#a8c7fa] transition-colors inline-flex items-center gap-1">
                  <span>{t('8-Screen Interface Gallery', 'Galeri 8 Layar Antarmuka')}</span>
                </a>
              </li>
              <li>
                <a href="#sandbox" className="hover:text-[#005ac1] dark:hover:text-[#a8c7fa] transition-colors inline-flex items-center gap-1">
                  <span>{t('Interactive POS & BOM Sandbox', 'Simulasi Kasir POS & Resep BOM')}</span>
                </a>
              </li>
              <li>
                <a href="#accounting" className="hover:text-[#005ac1] dark:hover:text-[#a8c7fa] transition-colors inline-flex items-center gap-1">
                  <span>{t('Double-Entry General Ledger', 'Buku Besar & Neraca Keuangan')}</span>
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-[#005ac1] dark:hover:text-[#a8c7fa] transition-colors inline-flex items-center gap-1">
                  <span>{t('Lifetime Licensing & Pricing', 'Skema Lisensi Seumur Hidup')}</span>
                </a>
              </li>
              <li>
                <a href="#architecture" className="hover:text-[#005ac1] dark:hover:text-[#a8c7fa] transition-colors inline-flex items-center gap-1">
                  <span>{t('Hardware Specs & Local AI', 'Spesifikasi Perangkat & AI')}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 9-12: Runtime Colophon & Controls */}
          <div className="md:col-span-3 space-y-4">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400">
              {t('Display & Language', 'Tampilan & Bahasa')}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onToggleLang}
                className={`flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-mono font-bold border transition-colors cursor-pointer min-h-[44px] ${
                  isDark
                    ? 'bg-[#15171e] border-white/[0.1] text-white hover:bg-white/[0.06]'
                    : 'bg-white border-black/[0.1] text-zinc-900 hover:bg-black/[0.04]'
                }`}
              >
                <Globe size={14} className="text-[#005ac1] dark:text-[#a8c7fa]" />
                <span>{lang === 'EN' ? 'EN / English' : 'ID / Indonesia'}</span>
              </button>

              <button
                type="button"
                onClick={onToggleTheme}
                className={`flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-mono font-bold border transition-colors cursor-pointer min-h-[44px] ${
                  isDark
                    ? 'bg-[#15171e] border-white/[0.1] text-amber-300 hover:bg-white/[0.06]'
                    : 'bg-white border-black/[0.1] text-zinc-900 hover:bg-black/[0.04]'
                }`}
              >
                {isDark ? <Sun size={14} /> : <Moon size={14} />}
                <span>{isDark ? t('Light', 'Terang') : t('Dark', 'Gelap')}</span>
              </button>
            </div>

          </div>
        </div>

        {/* Bottom Legal & Colophon */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-mono">
          <div>
            © {new Date().getFullYear()} Unicat POS & Accounting OS. {t('All local store data remains on-premise.', 'Seluruh data toko tersimpan secara lokal.')}
          </div>
          <div className="flex items-center gap-4">
            <a href="#top" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
              {t('Back to Top ↑', 'Kembali ke Atas ↑')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
