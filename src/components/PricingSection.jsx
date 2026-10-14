import React, { useState, useEffect } from 'react';
import {
  Check,
  X as CloseIcon,
  Download,
  ShieldCheck,
  Sparkles,
  Terminal,
  HelpCircle,
  Clock
} from 'lucide-react';
import { PRICING_TIERS } from '../data/demoStoreData';

export default function PricingSection({ isDark, t, formatRp }) {
  const [activeModal, setActiveModal] = useState(null); // 'install' | null
  const [downloadStarted, setDownloadStarted] = useState(false);

  // Close modals with Escape key (R-32)
  useEffect(() => {
    if (!activeModal) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal]);

  const handleOpenInstallModal = () => {
    setDownloadStarted(false);
    setActiveModal('install');
  };

  const handleTriggerSimulatedDownload = () => {
    setDownloadStarted(true);
    // Create an authentic anchor download for user inspection
    const element = document.createElement('a');
    const file = new Blob([
      `UniCash POS Community Edition v1.0.0\n` +
      `System requirements: Windows 10/11 64-bit, macOS 12+, or Ubuntu 20.04+\n` +
      `Setup command:\n` +
      `1. Run UniCash\n` +
      `2. Open http://localhost:3060\n` +
      `3. All local data stores in ./data/\n`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'UniCash-Community-Setup-Instructions.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const { community, commercial } = PRICING_TIERS;

  return (
    <section
      id="pricing"
      className={`py-20 sm:py-28 border-b border-[#d8dce6] dark:border-[#262932] transition-colors ${
        isDark ? 'bg-[#111318]' : 'bg-[#f1f3f8]/50'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-20 xl:px-24">
        {/* Editorial Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14">
          <div className="lg:col-span-7">
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight leading-[1.06] text-[#111318] dark:text-[#f1f3f8] text-balance">
              {t(
                'Buy once. Own your software. Zero monthly cloud rent.',
                'Beli sekali. Miliki software Anda. Bebas sewa bulanan cloud.'
              )}
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm sm:text-base leading-relaxed text-[#44474f] dark:text-[#9ca3af]">
              {t(
                'Traditional POS software charges Rp 250.000 to Rp 350.000 every single month just to run your counter register. UniCash is engineered as a zero-cloud local desktop operating system: run the Community Edition free forever, or unlock commercial LAN sync, BOM recipes, and local AI with a flat lifetime license.',
                'Aplikasi kasir konvensional menagih Rp 250.000 hingga Rp 350.000 setiap bulan hanya untuk mengoperasikan kasir Anda. UniCash dibangun sebagai sistem operasi desktop lokal tanpa cloud: gunakan Edisi Komunitas gratis selamanya, atau buka sinkronisasi LAN, resep BOM, dan AI lokal dengan lisensi seumur hidup.'
              )}
            </p>
          </div>
        </div>

        {/* Side-by-Side Pricing Cards (2 Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 items-stretch">
          
          {/* CARD 1: COMMUNITY EDITION */}
          <div
            className={`p-6 sm:p-8 rounded-3xl border flex flex-col justify-between transition-all ${
              isDark
                ? 'bg-[#181a20] border-[#262932] hover:border-[#3b404d]'
                : 'bg-[#fdfcff] border-[#d8dce6] shadow-sm hover:shadow-md'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-3 pb-4 mb-4 border-b border-[#d8dce6] dark:border-[#262932]">
                <span className="font-mono text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#f1f3f8] dark:bg-[#1f222a] text-[#111318] dark:text-[#f1f3f8]">
                  {t(community.badgeEn, community.badgeId)}
                </span>
                <span className="text-xs font-mono text-[#44474f] dark:text-[#9ca3af] font-semibold">
                  {community.code}
                </span>
              </div>

              <div className="mb-4">
                <div className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-[#111318] dark:text-[#f1f3f8]">
                  {t(community.priceLabelEn, community.priceLabelId)}
                </div>
                <div className="text-xs mt-1 font-mono text-[#44474f] dark:text-[#9ca3af]">
                  {t(community.periodEn, community.periodId)}
                </div>
              </div>

              <p className="text-xs sm:text-sm leading-relaxed mb-6 text-[#44474f] dark:text-[#9ca3af]">
                {t(community.taglineEn, community.taglineId)}
              </p>

              <div className="space-y-3 pt-4 border-t border-[#d8dce6] dark:border-[#262932]">
                <div className="text-xs font-mono uppercase tracking-widest text-[#44474f] dark:text-[#9ca3af] font-bold mb-2">
                  {t('Included Features', 'Fitur Termasuk')}
                </div>
                {community.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs">
                    {feat.included ? (
                      <div className="w-4 h-4 rounded-full bg-[#198754]/15 text-[#198754] dark:bg-[#75d59e]/20 dark:text-[#75d59e] flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={11} />
                      </div>
                    ) : (
                      <div className="w-4 h-4 rounded-full bg-black/[0.04] dark:bg-white/[0.06] text-[#44474f] dark:text-[#9ca3af] flex items-center justify-center shrink-0 mt-0.5">
                        <CloseIcon size={10} />
                      </div>
                    )}
                    <span className={feat.included ? 'font-medium text-[#111318] dark:text-[#f1f3f8]' : 'text-[#44474f] dark:text-[#9ca3af] line-through opacity-70'}>
                      {t(feat.labelEn, feat.labelId)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 mt-6 border-t border-[#d8dce6] dark:border-[#262932]">
              <button
                type="button"
                onClick={handleOpenInstallModal}
                className="w-full min-h-[48px] px-6 py-3 rounded-xl font-bold text-xs sm:text-sm border border-[#d8dce6] dark:border-[#262932] text-[#111318] dark:text-[#f1f3f8] hover:bg-[#f1f3f8] dark:hover:bg-[#1f222a] hover:border-[#005ac1] dark:hover:border-[#a8c7fa] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Download size={15} />
                <span>{t(community.ctaEn, community.ctaId)}</span>
              </button>
            </div>
          </div>

          {/* CARD 2: COMMERCIAL LIFETIME */}
          <div
            className={`p-6 sm:p-8 rounded-3xl border flex flex-col justify-between relative transition-all ${
              isDark
                ? 'bg-[#181a20] border-[#a8c7fa]/40 shadow-2xl ring-1 ring-[#a8c7fa]/20'
                : 'bg-[#fdfcff] border-[#005ac1]/40 shadow-xl ring-1 ring-[#005ac1]/20'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-3 pb-4 mb-4 border-b border-[#d8dce6] dark:border-[#262932]">
                <span className="font-mono text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#005ac1] text-white dark:bg-[#a8c7fa] dark:text-[#001a41] flex items-center gap-1.5 shadow-xs">
                  <Sparkles size={11} />
                  <span>{t(commercial.badgeEn, commercial.badgeId)}</span>
                </span>
                <span className="text-xs font-mono font-bold text-[#005ac1] dark:text-[#a8c7fa]">
                  {commercial.code}
                </span>
              </div>

              <div className="mb-4">
                <div className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-[#005ac1] dark:text-[#a8c7fa]">
                  {t(commercial.priceLabelEn, commercial.priceLabelId)}
                </div>
                <div className="text-xs mt-1 font-mono text-[#44474f] dark:text-[#9ca3af]">
                  {t(commercial.periodEn, commercial.periodId)}
                </div>
              </div>

              <p className="text-xs sm:text-sm leading-relaxed mb-6 text-[#44474f] dark:text-[#9ca3af]">
                {t(commercial.taglineEn, commercial.taglineId)}
              </p>

              <div className="space-y-3 pt-4 border-t border-[#d8dce6] dark:border-[#262932]">
                <div className="text-xs font-mono uppercase tracking-widest text-[#005ac1] dark:text-[#a8c7fa] font-bold mb-2">
                  {t('Everything Unlocked for High-Volume Outlets', 'Semua Fitur Terbuka untuk Gerai Ramai')}
                </div>
                {commercial.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs">
                    <div className="w-4 h-4 rounded-full bg-[#198754]/20 text-[#198754] dark:bg-[#75d59e]/25 dark:text-[#75d59e] flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={11} />
                    </div>
                    <span className="font-semibold text-[#111318] dark:text-[#f1f3f8]">
                      {t(feat.labelEn, feat.labelId)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 mt-6 border-t border-[#d8dce6] dark:border-[#262932]">
              <div
                className="w-full min-h-[48px] px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-[#005ac1]/15 text-[#005ac1] dark:bg-[#a8c7fa]/15 dark:text-[#a8c7fa] border border-[#005ac1]/30 dark:border-[#a8c7fa]/30 flex items-center justify-center gap-2 select-none"
              >
                <Clock size={15} />
                <span>{t('Commercial License • Coming Soon', 'Lisensi Komersial • Segera Hadir')}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Hardware & Guarantee Reassurance Strip */}
        <div className={`p-5 rounded-2xl border flex flex-wrap items-center justify-between gap-4 text-xs ${
          isDark ? 'bg-[#181a20] border-[#262932] text-[#9ca3af]' : 'bg-[#fdfcff] border-[#d8dce6] text-[#44474f]'
        }`}>
          <div className="flex items-center gap-3">
            <ShieldCheck size={20} className="text-[#198754] dark:text-[#75d59e] shrink-0" />
            <div className="leading-relaxed">
              <span className="font-bold text-[#111318] dark:text-[#f1f3f8] block">
                {t('100% Offline Cryptographic Activation', 'Aktivasi Kriptografi 100% Offline')}
              </span>
              <span>
                {t(
                  'Your license key validates completely inside your local desktop executable. No telemetry, no DRM phone-homes, and no remote expiration killswitches.',
                  'Kunci lisensi divalidasi langsung di dalam aplikasi desktop lokal Anda. Tanpa telemetri, tanpa koneksi DRM berkala, dan tanpa pemutusan jarak jauh.'
                )}
              </span>
            </div>
          </div>
          <div className="font-mono text-xs text-[#005ac1] dark:text-[#a8c7fa] font-bold shrink-0">
            {t('Perpetual License / Hak Milik Permanen', 'Perpetual License / Hak Milik Permanen')}
          </div>
        </div>
      </div>

      {/* MODAL 1: COMMUNITY INSTALL & DOWNLOAD GUIDE */}
      {activeModal === 'install' && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="install-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
        >
          <div
            className={`w-full max-w-lg rounded-3xl border p-6 shadow-2xl space-y-5 ${
              isDark ? 'bg-[#181a20] border-[#262932] text-[#f1f3f8]' : 'bg-[#fdfcff] border-[#d8dce6] text-[#111318]'
            }`}
          >
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#d8dce6] dark:border-[#262932]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#005ac1]/15 text-[#005ac1] dark:bg-[#a8c7fa]/20 dark:text-[#a8c7fa] flex items-center justify-center shrink-0">
                  <Download size={20} />
                </div>
                <div>
                  <h3 id="install-modal-title" className="font-display font-bold text-lg tracking-tight">
                    {t('Download UniCash Community Edition', 'Unduh UniCash Edisi Komunitas')}
                  </h3>
                  <p className="text-xs text-[#44474f] dark:text-[#9ca3af]">
                    {t('v1.0.0 Production Build (Windows 64-bit Installer)', 'Build Produksi v1.0.0 (Installer Windows 64-bit)')}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                aria-label={t('Close modal', 'Tutup modal')}
                className="min-h-[44px] min-w-[44px] p-2.5 rounded-full text-[#44474f] dark:text-[#9ca3af] hover:text-[#111318] dark:hover:text-[#f1f3f8] cursor-pointer flex items-center justify-center"
              >
                <CloseIcon size={18} />
              </button>
            </div>

            <div className={`p-4 rounded-2xl border font-mono text-xs space-y-2.5 ${
              isDark ? 'bg-[#111318] border-[#262932]' : 'bg-[#f1f3f8] border-[#d8dce6]'
            }`}>
              <div className="flex justify-between">
                <span className="text-[#44474f] dark:text-[#9ca3af]">{t('File Package:', 'Paket Berkas:')}</span>
                <span className="font-bold text-[#111318] dark:text-[#f1f3f8]">UniCash-Setup-v1.0.0.exe (~85 MB)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#44474f] dark:text-[#9ca3af]">{t('OS Support:', 'Sistem Operasi:')}</span>
                <span className="text-[#111318] dark:text-[#f1f3f8]">Windows 10 / 11 (64-bit)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#44474f] dark:text-[#9ca3af]">{t('Local Server Binding:', 'Binding Server Lokal:')}</span>
                <span className="text-[#005ac1] dark:text-[#a8c7fa] font-bold">http://localhost:3060</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#44474f] dark:text-[#9ca3af]">{t('License Type:', 'Tipe Lisensi:')}</span>
                <span className="text-[#146c43] dark:text-[#75d59e] font-bold">Community / Free Forever</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="font-mono uppercase font-bold text-[#44474f] dark:text-[#9ca3af] tracking-wider text-xs">
                {t('3-Step Offline Launch Procedure', '3 Langkah Menjalankan Offline')}
              </div>
              <ol className="space-y-1.5 pl-4 list-decimal text-[#44474f] dark:text-[#9ca3af] leading-relaxed">
                <li>{t('Run the downloaded installer on your cashier desktop or laptop.', 'Jalankan installer yang diunduh pada laptop atau PC kasir.')}</li>
                <li>{t('UniCash creates its local file database inside ./data/ automatically.', 'UniCash akan membuat database file lokal di folder ./data/ secara otomatis.')}</li>
                <li>{t('Begin entering menu products and start ringing up orders immediately.', 'Mulai masukkan daftar menu Anda dan kasir siap digunakan.')}</li>
              </ol>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className={`min-h-[44px] px-4 py-2.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer flex items-center justify-center ${
                  isDark ? 'border-[#262932] text-[#f1f3f8] hover:bg-[#262932]' : 'border-[#d8dce6] text-[#111318] hover:bg-[#f1f3f8]'
                }`}
              >
                {t('Close', 'Tutup')}
              </button>
              <button
                type="button"
                onClick={handleTriggerSimulatedDownload}
                className="min-h-[44px] px-5 py-2.5 rounded-xl text-xs font-bold bg-[#005ac1] hover:bg-[#004881] text-white dark:bg-[#a8c7fa] dark:hover:bg-[#8ab4f8] dark:text-[#001a41] transition-all cursor-pointer flex items-center gap-2 shadow-xs"
              >
                <Download size={14} />
                <span>
                  {downloadStarted
                    ? t('Instructions Downloaded!', 'Instruksi Terunduh!')
                    : t('Start Download (Installer)', 'Mulai Unduh (Installer)')}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
