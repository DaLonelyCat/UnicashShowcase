import React, { useState } from 'react';
import {
  Terminal,
  Layers,
  RefreshCw,
  Sun,
  Moon,
  Printer,
  ShieldCheck,
  Wifi,
  Receipt,
  ArrowRight
} from 'lucide-react';

const HERO_SAMPLE_ORDERS = [
  {
    id: 'ORD-261013-01',
    method: 'QRIS',
    items: [
      { name: '2x Velvet Caffe Latte', price: 56000, hpp: 15000, note: 'Arabica Espresso + Fresh Milk BOM' },
      { name: '1x Butter Croissant', price: 24000, hpp: 9000, note: 'Laminated Butter Pastry BOM' }
    ],
    totalPrice: 80000,
    totalHpp: 24000,
    grossProfit: 56000,
    marginPct: '70.0%'
  },
  {
    id: 'ORD-261013-02',
    method: 'CASH',
    items: [
      { name: '1x Iced Caramel Macchiato', price: 32000, hpp: 9000, note: 'Espresso + Milk + Caramel BOM' },
      { name: '1x Artisan Cinnamon Roll', price: 26000, hpp: 10000, note: 'Spiced Roll + Glaze BOM' }
    ],
    totalPrice: 58000,
    totalHpp: 19000,
    grossProfit: 39000,
    marginPct: '67.2%'
  },
  {
    id: 'ORD-261013-03',
    method: 'QRIS',
    items: [
      { name: '1x Kyoto Matcha Latte', price: 30000, hpp: 8000, note: 'Ceremonial Matcha + Milk BOM' },
      { name: '1x Chocolate Fudge Brownie', price: 22000, hpp: 8000, note: 'Dark Cocoa Baked Slice BOM' }
    ],
    totalPrice: 52000,
    totalHpp: 16000,
    grossProfit: 36000,
    marginPct: '69.2%'
  }
];

const HERO_VIEWS = [
  {
    id: 'cashier',
    labelEn: 'Cashier POS',
    labelId: 'Kasir POS',
    darkSrc: '/screenshots/cashier-dark.png',
    lightSrc: '/screenshots/cashier-light.png'
  },
  {
    id: 'dashboard',
    labelEn: 'Analytics Cockpit',
    labelId: 'Dasbor Analitik',
    darkSrc: '/screenshots/dashboard-dark.png',
    lightSrc: '/screenshots/dashboard-light.png'
  },
  {
    id: 'pnl',
    labelEn: 'P&L Statement',
    labelId: 'Laporan Laba Rugi',
    darkSrc: '/screenshots/financials-pnl-dark.png',
    lightSrc: '/screenshots/financials-pnl-light.png'
  }
];

export default function HeroSection({ t, formatRp }) {
  const [splitPercent, setSplitPercent] = useState(58);
  const [isDragging, setIsDragging] = useState(false);
  const [activeHeroView, setActiveHeroView] = useState('cashier');
  const [orderIdx, setOrderIdx] = useState(0);

  const currentView = HERO_VIEWS.find((v) => v.id === activeHeroView) || HERO_VIEWS[0];
  const currentOrder = HERO_SAMPLE_ORDERS[orderIdx];

  const handleCycleOrder = () => {
    setOrderIdx((prev) => (prev + 1) % HERO_SAMPLE_ORDERS.length);
  };

  const handlePointerDown = (e) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, Math.round(((e.clientX - rect.left) / rect.width) * 100)));
    setSplitPercent(x);
  };

  const handlePointerMove = (e) => {
    if (!isDragging && e.buttons !== 1) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, Math.round(((e.clientX - rect.left) / rect.width) * 100)));
    setSplitPercent(x);
  };

  const handlePointerUp = (e) => {
    setIsDragging(false);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <section
      id="top"
      className="relative border-b border-[#d8dce6] dark:border-[#262932] overflow-hidden"
    >
      {/* Centered Wide Layout: symmetric padding accommodates floating rail while keeping entire page centered */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-20 xl:px-24 py-10 sm:py-14 lg:py-16 space-y-10 lg:space-y-12">
        {/* Top 2-Column Hero Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column (6 cols): Editorial Headline, Value Prop & Direct Action CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[50px] leading-[1.08] tracking-tight text-[#111318] dark:text-[#f1f3f8] text-balance">
                {t(
                  'Ring up orders. Deduct recipes by the gram. Balance the ledger offline.',
                  'Catat pesanan kasir. Potong resep per gram. Susun laporan keuangan otomatis.'
                )}
              </h1>

              <p className="text-base sm:text-lg leading-relaxed text-[#44474f] dark:text-[#9ca3af] text-pretty">
                {t(
                  'UniCash unifies a fast F&B cashier terminal, a Bill of Materials (BOM) HPP cost calculator, full double-entry financial statements (Jurnal Umum, Laba Rugi, Neraca, Arus Kas), ESC/POS thermal printing, and a local Ollama AI store copilot in one zero-cloud application.',
                  'UniCash menyatukan terminal kasir F&B cepat, kalkulator HPP resep bahan baku (BOM), laporan akuntansi double-entry lengkap (Jurnal Umum, Laba Rugi, Neraca, Arus Kas), cetak struk thermal ESC/POS, serta asisten AI Ollama lokal dalam satu aplikasi tanpa biaya cloud.'
                )}
              </p>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="#sandbox"
                className="min-h-[48px] px-6 py-3 rounded-xl font-bold text-sm bg-[#005ac1] hover:bg-[#00489e] text-white dark:bg-[#a8c7fa] dark:hover:bg-[#8ab4f8] dark:text-[#001a41] transition-colors flex items-center gap-2.5 shadow-sm"
              >
                <Terminal size={16} />
                <span>{t('Launch Interactive POS Demo', 'Coba Demo POS Interaktif')}</span>
              </a>

              <a
                href="#tour"
                className="min-h-[48px] px-5 py-3 rounded-xl font-semibold text-sm border border-[#d8dce6] dark:border-[#262932] bg-[#f1f3f8] dark:bg-[#181a20] text-[#111318] dark:text-[#f1f3f8] hover:border-[#005ac1] dark:hover:border-[#a8c7fa] transition-colors flex items-center gap-2"
              >
                <Layers size={16} className="text-[#005ac1] dark:text-[#a8c7fa]" />
                <span>{t('Explore 8-Screen Architecture Tour', 'Jelajahi Tur 8 Layar Aplikasi')}</span>
              </a>
            </div>

            {/* Platform Capabilities Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 font-mono text-xs text-[#44474f] dark:text-[#9ca3af]">
              <div className="flex items-center gap-2 p-2.5 rounded-xl border border-[#d8dce6] dark:border-[#262932] bg-[#f1f3f8]/60 dark:bg-[#181a20]/60">
                <ShieldCheck size={16} className="text-emerald-500 shrink-0" />
                <span>{t('100% Offline Local Engine', '100% Offline Tanpa Cloud')}</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl border border-[#d8dce6] dark:border-[#262932] bg-[#f1f3f8]/60 dark:bg-[#181a20]/60">
                <Wifi size={16} className="text-[#005ac1] dark:text-[#a8c7fa] shrink-0" />
                <span>{t('0ms Local LAN Sync', 'Sinkronisasi LAN Lokal')}</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl border border-[#d8dce6] dark:border-[#262932] bg-[#f1f3f8]/60 dark:bg-[#181a20]/60">
                <Receipt size={16} className="text-amber-500 shrink-0" />
                <span>{t('ESC/POS Thermal Ready', 'Thermal 58/80mm Siap Pakai')}</span>
              </div>
            </div>
          </div>

          {/* Right Column (6 cols): Interactive Dual-Theme Screenshot Comparison Curtain */}
          <div className="lg:col-span-6 flex flex-col space-y-3">
            <div className="p-3.5 rounded-2xl border border-[#d8dce6] dark:border-[#262932] bg-[#f1f3f8] dark:bg-[#181a20] space-y-3 shadow-md">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-1.5" role="tablist" aria-label="Hero Preview Screen">
                  {HERO_VIEWS.map((view) => (
                    <button
                      key={view.id}
                      type="button"
                      role="tab"
                      aria-selected={activeHeroView === view.id}
                      onClick={() => setActiveHeroView(view.id)}
                      className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center justify-center ${
                        activeHeroView === view.id
                          ? 'bg-[#005ac1] text-white dark:bg-[#a8c7fa] dark:text-[#001a41]'
                          : 'text-[#44474f] dark:text-[#9ca3af] hover:text-[#111318] dark:hover:text-[#f1f3f8]'
                      }`}
                    >
                      {t(view.labelEn, view.labelId)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Split Curtain Screenshot Frame */}
              <div
                className="relative rounded-xl overflow-hidden border border-[#d8dce6] dark:border-[#262932] bg-[#111318] aspect-[16/10] select-none shadow-lg touch-none cursor-ew-resize"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                onLostPointerCapture={() => setIsDragging(false)}
              >
                {/* Base Layer: Light Mode Screenshot */}
                <img
                  src={currentView.lightSrc}
                  alt={`${currentView.labelEn} Light Mode`}
                  width={800}
                  height={500}
                  fetchpriority="high"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none"
                />

                {/* Clipped Foreground Layer: Dark Mode Screenshot */}
                <div
                  className="absolute inset-0 overflow-hidden pointer-events-none"
                  style={{ clipPath: `inset(0 ${100 - splitPercent}% 0 0)` }}
                >
                  <img
                    src={currentView.darkSrc}
                    alt={`${currentView.labelEn} Dark Mode`}
                    width={800}
                    height={500}
                    fetchpriority="high"
                    decoding="async"
                    className="w-full h-full object-cover object-top pointer-events-none"
                  />
                </div>

                {/* Vertical Split Divider Line */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-[#005ac1] dark:bg-[#a8c7fa] pointer-events-none"
                  style={{ left: `${splitPercent}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#005ac1] dark:bg-[#a8c7fa] text-white dark:text-[#001a41] flex items-center justify-center shadow-md font-mono text-xs font-bold">
                    ↔
                  </div>
                </div>

                {/* Corner Surface Badges */}
                <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-[#111318]/90 text-[#f1f3f8] font-mono text-xs flex items-center gap-1.5 pointer-events-none shadow-xs">
                  <Moon size={12} className="text-[#a8c7fa]" />
                  <span>Dark</span>
                </div>
                <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-[#fdfcff]/90 text-[#111318] border border-[#d8dce6] font-mono text-xs flex items-center gap-1.5 pointer-events-none shadow-xs">
                  <Sun size={12} className="text-amber-500" />
                  <span>Light</span>
                </div>
              </div>

              {/* Accessible Range Slider Controls */}
              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setSplitPercent(100)}
                  className="min-h-[44px] min-w-[44px] p-2.5 rounded-xl border border-[#d8dce6] dark:border-[#262932] bg-[#fdfcff] dark:bg-[#111318] text-[#111318] dark:text-[#f1f3f8] cursor-pointer flex items-center justify-center transition-colors hover:border-[#005ac1] dark:hover:border-[#a8c7fa]"
                  title={t('Dark Mode View', 'Tampilan Mode Gelap')}
                  aria-label="100% Dark"
                >
                  <Moon size={15} className="text-[#005ac1] dark:text-[#a8c7fa]" />
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={splitPercent}
                  onChange={(e) => setSplitPercent(Number(e.target.value))}
                  aria-label={t('Compare Dark and Light Mode Screenshot', 'Bandingkan Tangkapan Layar Mode Gelap dan Terang')}
                  className="flex-1 accent-[#005ac1] dark:accent-[#a8c7fa] cursor-pointer h-2"
                />
                <button
                  type="button"
                  onClick={() => setSplitPercent(0)}
                  className="min-h-[44px] min-w-[44px] p-2.5 rounded-xl border border-[#d8dce6] dark:border-[#262932] bg-[#fdfcff] dark:bg-[#111318] text-[#111318] dark:text-[#f1f3f8] cursor-pointer flex items-center justify-center transition-colors hover:border-[#005ac1] dark:hover:border-[#a8c7fa]"
                  title={t('Light Mode View', 'Tampilan Mode Terang')}
                  aria-label="100% Light"
                >
                  <Sun size={15} className="text-amber-500" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            FULL-WIDTH LIVE ORDER-TO-LEDGER INSPECTOR
            Spacious, dedicated interactive bridge showcasing the core recipe-to-accounting pipeline
            ========================================================================= */}
        <div className="rounded-2xl border border-[#d8dce6] dark:border-[#262932] bg-[#f1f3f8] dark:bg-[#181a20] p-5 sm:p-6 shadow-sm space-y-4">
          {/* Header Bar */}
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#d8dce6] dark:border-[#262932]">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-[#005ac1]/10 dark:bg-[#a8c7fa]/15 text-[#005ac1] dark:text-[#a8c7fa] flex items-center justify-center shrink-0">
                <Printer size={16} />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#111318] dark:text-[#f1f3f8]">
                    {t('Live Order-to-Ledger Inspector', 'Inspektor Transaksi ke Buku Besar')}
                  </span>
                </div>
                <p className="font-mono text-xs text-[#44474f] dark:text-[#9ca3af] truncate mt-0.5">
                  {t(
                    '1 POS ring-up automatically deducts BOM recipes and balances the double-entry ledger.',
                    '1 transaksi POS otomatis memotong resep BOM dan menyeimbangkan buku besar.'
                  )}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCycleOrder}
              className="min-h-[44px] px-4 py-2 rounded-xl font-mono text-xs font-semibold border border-[#d8dce6] dark:border-[#262932] bg-[#fdfcff] dark:bg-[#111318] text-[#005ac1] dark:text-[#a8c7fa] hover:border-[#005ac1] dark:hover:border-[#a8c7fa] flex items-center gap-2 cursor-pointer transition-colors shadow-2xs shrink-0"
            >
              <RefreshCw size={14} />
              <span>{t('Cycle Sample Ticket', 'Ganti Sampel Struk')}</span>
            </button>
          </div>

          {/* Interactive Inspection Grid: Spacious 3-Part Horizontal Flow */}
          <div key={currentOrder.id} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center animate-receipt-print">
            {/* Part 1 (5 cols): Itemized Customer Order Ticket */}
            <div className="lg:col-span-5 rounded-xl border border-[#d8dce6] dark:border-[#262932] bg-[#fdfcff] dark:bg-[#111318] p-4 space-y-2.5 font-mono text-xs shadow-2xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#d8dce6] dark:border-[#262932] text-xs font-bold text-[#44474f] dark:text-[#9ca3af] uppercase">
                <span>{t('Ticket Items', 'Item Pesanan')}</span>
                <span>{t('Price & BOM Cost', 'Harga & Biaya HPP')}</span>
              </div>
              <div className="space-y-2">
                {currentOrder.items.map((it) => (
                  <div key={it.name} className="flex items-center justify-between py-1 border-b border-dashed border-[#d8dce6] dark:border-[#262932]">
                    <div className="pr-2">
                      <span className="text-[#111318] dark:text-[#f1f3f8] font-medium block">{it.name}</span>
                      <span className="text-xs text-[#44474f] dark:text-[#9ca3af] block">{it.note}</span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[#111318] dark:text-[#f1f3f8] font-bold block tabular-nums">Rp {formatRp(it.price)}</span>
                      <span className="text-xs text-[#b3261e] dark:text-[#ffb4ab] block tabular-nums">
                        HPP: Rp {formatRp(it.hpp)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Part 2 (2 cols): Visual Automatic Calculation Pipeline */}
            <div className="lg:col-span-2 hidden lg:flex flex-col items-center justify-center text-center font-mono text-xs text-[#44474f] dark:text-[#9ca3af] space-y-1.5 px-2">
              <span className="px-2 py-0.5 rounded bg-[#d8e2ff]/50 dark:bg-[#004881]/50 text-[#005ac1] dark:text-[#a8c7fa] font-semibold text-xs uppercase tracking-wider">
                {t('Auto Math', 'Otomatis')}
              </span>
              <div className="flex items-center gap-1 text-[#005ac1] dark:text-[#a8c7fa]">
                <ArrowRight size={18} />
              </div>
              <span className="text-xs leading-tight">
                {t('Recipe BOM → Double Entry', 'Resep BOM → Jurnal Umum')}
              </span>
            </div>

            {/* Part 3 (5 cols): Spacious Instant Financial Impact Cards */}
            <div className="lg:col-span-5 grid grid-cols-3 gap-3 text-center font-mono">
              <div className="p-3.5 rounded-xl bg-[#fdfcff] dark:bg-[#111318] border border-[#d8dce6] dark:border-[#262932] flex flex-col justify-between shadow-2xs">
                <span className="block text-xs font-semibold text-[#44474f] dark:text-[#9ca3af] uppercase tracking-wider">
                  {t('Revenue', 'Omset')}
                </span>
                <span className="text-sm sm:text-base font-bold text-[#111318] dark:text-[#f1f3f8] tabular-nums whitespace-nowrap my-1">
                  Rp {formatRp(currentOrder.totalPrice)}
                </span>
                <span className="text-xs text-[#44474f] dark:text-[#9ca3af]">
                  {t('Gross Sales', 'Penjualan Kotor')}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#fdfcff] dark:bg-[#111318] border border-[#d8dce6] dark:border-[#262932] flex flex-col justify-between shadow-2xs">
                <span className="block text-xs font-semibold text-[#44474f] dark:text-[#9ca3af] uppercase tracking-wider">
                  {t('BOM HPP', 'HPP Resep')}
                </span>
                <span className="text-sm sm:text-base font-bold text-[#b3261e] dark:text-[#ffb4ab] tabular-nums whitespace-nowrap my-1">
                  -Rp {formatRp(currentOrder.totalHpp)}
                </span>
                <span className="text-xs text-[#b3261e] dark:text-[#ffb4ab]">
                  {t('Ingredient Cost', 'Bahan Baku')}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#fdfcff] dark:bg-[#111318] border border-[#d8dce6] dark:border-[#262932] flex flex-col justify-between shadow-2xs">
                <span className="block text-xs font-semibold text-[#44474f] dark:text-[#9ca3af] uppercase tracking-wider">
                  {t('Gross Margin', 'Laba Kotor')}
                </span>
                <span className="text-sm sm:text-base font-bold text-[#146c43] dark:text-[#75d59e] tabular-nums whitespace-nowrap my-1">
                  Rp {formatRp(currentOrder.grossProfit)}
                </span>
                <span className="text-xs font-bold text-[#146c43] dark:text-[#75d59e]">
                  {currentOrder.marginPct} {t('Margin', 'Margin')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
