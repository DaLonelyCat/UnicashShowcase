import React, { useState, useEffect } from 'react';
import {
  Monitor,
  Smartphone,
  Sun,
  Moon,
  Maximize2,
  X,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { SCREENSHOT_CHAPTERS } from '../data/demoStoreData';

const MOBILE_CHAPTERS = [
  {
    id: 'mobile-pos',
    index: '01',
    tabLabelEn: 'Mobile POS Terminal',
    tabLabelId: 'Kasir POS Mobile',
    titleEn: 'Touch-Optimized Mobile Order Taking with Instant LAN Host Dispatch',
    titleId: 'Pencatatan Pesanan Mobile Ramah Sentuh dengan Sinkronisasi Host LAN',
    descEn: 'Empower floor waitstaff to ring up orders on smartphones or tablets over local Wi-Fi. Features thumb-friendly bottom navigation, category filters, and automatic ticket push to the main cashier station and kitchen printers.',
    descId: 'Beri staf kemudahan mencatat pesanan dari ponsel atau tablet melalui Wi-Fi lokal. Dilengkapi navigasi bawah ergonomis, filter kategori cepat, dan sinkronisasi otomatis ke kasir utama serta printer dapur.',
    darkImg: '/screenshots/mobile-pos-dark.png',
    lightImg: '/screenshots/mobile-pos-light.png',
    specs: [
      { labelEn: 'Form Factor', labelId: 'Format Layar', value: 'Phone & Tablet Touch UI' },
      { labelEn: 'Network', labelId: 'Jaringan', value: 'Local Wi-Fi LAN (0.0.0.0:3060)' },
      { labelEn: 'Host Sync', labelId: 'Sinkronisasi Host', value: '0ms Real-Time Push' }
    ],
    hotspots: [
      {
        x: 50,
        y: 88,
        titleEn: 'Thumb-Friendly Bottom Navigation',
        titleId: 'Navigasi Bawah Ramah Jempol',
        detailEn: 'Ergonomic quick-switch between catalog, ticket, and search designed for single-hand mobile operation.',
        detailId: 'Beralih cepat antara menu, keranjang, dan pencarian yang dirancang untuk pengoperasian satu tangan di ponsel.'
      },
      {
        x: 75,
        y: 72,
        titleEn: 'Floating Cart Dispatch Drawer',
        titleId: 'Laci Keranjang Mengambang',
        detailEn: 'Single-tap floating pill reveals active items, live Rupiah subtotal, and dispatches directly to the host ledger.',
        detailId: 'Tombol mengambang menampilkan ringkasan item, total Rupiah, dan langsung mengirimkan pesanan ke buku kasir utama.'
      }
    ]
  },
  {
    id: 'mobile-dashboard',
    index: '02',
    tabLabelEn: 'Mobile Sales Cockpit',
    tabLabelId: 'Dasbor Analitik Mobile',
    titleEn: 'Live Shift Performance, Revenue & Peak Customer Traffic in Your Pocket',
    titleId: 'Pantauan Omset Shift, Pendapatan & Jam Ramai Langsung di Saku Anda',
    descEn: 'Store owners and supervisors can monitor live daily gross revenue, hourly customer peak spikes, and top-selling products over local Wi-Fi without interrupting the cashier terminal.',
    descId: 'Pemilik toko dan manajer dapat memantau omset kotor harian, grafik jam ramai transaksi, dan menu terlaris melalui Wi-Fi lokal tanpa mengganggu komputer kasir utama.',
    darkImg: '/screenshots/mobile-dashboard-dark.png',
    lightImg: '/screenshots/mobile-dashboard-light.png',
    specs: [
      { labelEn: 'Live Shift Metrics', labelId: 'Metrik Shift', value: 'Gross Revenue & Peak Hours' },
      { labelEn: 'Concurrent Access', labelId: 'Akses Simultan', value: 'Unlimited Mobile Clients' },
      { labelEn: 'Security', labelId: 'Keamanan Data', value: '100% Local Wi-Fi (No Cloud)' }
    ],
    hotspots: [
      {
        x: 50,
        y: 35,
        titleEn: 'Real-Time Revenue Pulse',
        titleId: 'Ringkasan Omset Real-Time',
        detailEn: 'Instant breakdown of today gross sales and completed orders streamed directly from the host.',
        detailId: 'Rincian omset kotor hari ini dan jumlah pesanan selesai yang disiarkan langsung dari komputer host.'
      },
      {
        x: 50,
        y: 62,
        titleEn: 'Peak Hourly Traffic Heatmap',
        titleId: 'Grafik Jam Sibuk Pelanggan',
        detailEn: 'Visual distribution of customer rush hours to coordinate kitchen prep and staff breaks.',
        detailId: 'Distribusi visual jam sibuk pelanggan untuk mengatur persiapan dapur dan jadwal istirahat staf.'
      }
    ]
  }
];

export default function ScreenshotTourSection({ pageTheme, t }) {
  const [viewportMode, setViewportMode] = useState('desktop'); // 'desktop' | 'mobile'
  const [activeId, setActiveId] = useState(SCREENSHOT_CHAPTERS[0].id);
  const [shotTheme, setShotTheme] = useState(pageTheme);
  const [showHotspots, setShowHotspots] = useState(true);
  const [activeHotspotIdx, setActiveHotspotIdx] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [imgState, setImgState] = useState('loading'); // 'loading' | 'loaded' | 'error'

  // Sync screenshot theme when user toggles main page theme
  useEffect(() => {
    setShotTheme(pageTheme);
  }, [pageTheme]);

  const availableChapters = viewportMode === 'mobile' ? MOBILE_CHAPTERS : SCREENSHOT_CHAPTERS;
  const currentIdx = Math.max(0, availableChapters.findIndex((c) => c.id === activeId));
  const chapter = availableChapters[currentIdx] || availableChapters[0];

  const activeImgSrc = shotTheme === 'dark' ? chapter.darkImg : chapter.lightImg;

  // Reset image loading state on source change
  useEffect(() => {
    setImgState('loading');
    setActiveHotspotIdx(0);
  }, [activeImgSrc]);

  // Keyboard Escape & Left/Right navigation for Lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsLightboxOpen(false);
      if (e.key === 'ArrowRight') {
        const next = (currentIdx + 1) % availableChapters.length;
        setActiveId(availableChapters[next].id);
      }
      if (e.key === 'ArrowLeft') {
        const prev = (currentIdx - 1 + availableChapters.length) % availableChapters.length;
        setActiveId(availableChapters[prev].id);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, currentIdx, availableChapters]);

  const handleStepChapter = (delta) => {
    const nextIdx = (currentIdx + delta + availableChapters.length) % availableChapters.length;
    setActiveId(availableChapters[nextIdx].id);
  };

  const handleViewportModeChange = (mode) => {
    setViewportMode(mode);
    const targetChapters = mode === 'mobile' ? MOBILE_CHAPTERS : SCREENSHOT_CHAPTERS;
    if (!targetChapters.some((c) => c.id === activeId)) {
      setActiveId(targetChapters[0].id);
    }
  };

  return (
    <section
      id="tour"
      className="border-b border-[#d8dce6] dark:border-[#262932] py-14 sm:py-20"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-20 xl:px-24 space-y-8">
        {/* Section Editorial Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#d8dce6] dark:border-[#262932]">
          <div className="space-y-2 max-w-3xl">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-[#111318] dark:text-[#f1f3f8] text-balance">
              {t(
                'Every screen captured directly from the live UniCash runtime.',
                'Setiap layar ditangkap langsung dari aplikasi UniCash yang berjalan.'
              )}
            </h2>
            <p className="text-sm sm:text-base text-[#44474f] dark:text-[#9ca3af] text-pretty">
              {viewportMode === 'mobile'
                ? t(
                    'Exclusive Mobile LAN viewports for order-taking staff and remote floor management over local Wi-Fi.',
                    'Layar khusus Mobile LAN untuk pencatatan pesanan staf dan pantauan operasional via Wi-Fi lokal.'
                  )
                : t(
                    'High-resolution captures across Desktop host stations and administrative accounting ledgers.',
                    'Tangkapan layar resolusi tinggi pada stasiun kasir utama Desktop dan buku besar akuntansi.'
                  )}
            </p>
          </div>

          {/* Viewport & Surface Controls */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {/* Desktop / Mobile LAN Toggle */}
            <div
              className="flex items-center p-1 rounded-xl border border-[#d8dce6] dark:border-[#262932] bg-[#f1f3f8] dark:bg-[#181a20]"
              role="group"
              aria-label="Viewport Mode"
            >
              <button
                type="button"
                onClick={() => handleViewportModeChange('desktop')}
                className={`min-h-[44px] px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors ${
                  viewportMode === 'desktop'
                    ? 'bg-[#005ac1] text-white dark:bg-[#a8c7fa] dark:text-[#001a41]'
                    : 'text-[#44474f] dark:text-[#9ca3af] hover:text-[#111318] dark:hover:text-[#f1f3f8]'
                }`}
              >
                <Monitor size={15} />
                <span>Desktop (8)</span>
              </button>
              <button
                type="button"
                onClick={() => handleViewportModeChange('mobile')}
                className={`min-h-[44px] px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors ${
                  viewportMode === 'mobile'
                    ? 'bg-[#005ac1] text-white dark:bg-[#a8c7fa] dark:text-[#001a41]'
                    : 'text-[#44474f] dark:text-[#9ca3af] hover:text-[#111318] dark:hover:text-[#f1f3f8]'
                }`}
              >
                <Smartphone size={15} />
                <span>Mobile LAN (2)</span>
              </button>
            </div>

            {/* Dark / Light Screenshot Toggle */}
            <div
              className="flex items-center p-1 rounded-xl border border-[#d8dce6] dark:border-[#262932] bg-[#f1f3f8] dark:bg-[#181a20]"
              role="group"
              aria-label="Screenshot Theme"
            >
              <button
                type="button"
                onClick={() => setShotTheme('dark')}
                className={`min-h-[44px] px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors ${
                  shotTheme === 'dark'
                    ? 'bg-[#111318] text-[#f1f3f8] border border-[#262932]'
                    : 'text-[#44474f] dark:text-[#9ca3af]'
                }`}
              >
                <Moon size={14} className="text-[#a8c7fa]" />
                <span>Dark</span>
              </button>
              <button
                type="button"
                onClick={() => setShotTheme('light')}
                className={`min-h-[44px] px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors ${
                  shotTheme === 'light'
                    ? 'bg-[#fdfcff] text-[#111318] border border-[#d8dce6]'
                    : 'text-[#44474f] dark:text-[#9ca3af]'
                }`}
              >
                <Sun size={14} className="text-amber-500" />
                <span>Light</span>
              </button>
            </div>

            {/* Hotspot Overlay Toggle */}
            <button
              type="button"
              onClick={() => setShowHotspots((prev) => !prev)}
              className="min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-bold border border-[#d8dce6] dark:border-[#262932] bg-[#f1f3f8] dark:bg-[#181a20] text-[#111318] dark:text-[#f1f3f8] flex items-center gap-1.5 cursor-pointer hover:border-[#005ac1] dark:hover:border-[#a8c7fa]"
            >
              {showHotspots ? <Eye size={14} /> : <EyeOff size={14} />}
              <span>{showHotspots ? t('Hide Callouts', 'Sembunyikan Pin') : t('Show Callouts', 'Tampilkan Pin')}</span>
            </button>
          </div>
        </div>

        {/* Asymmetric Theatre Grid: Left Rail Chapters | Right Stage Interactive Viewport */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Rail: Modules Filtered by Active Viewport Mode */}
          <div className="lg:col-span-4 space-y-2" role="tablist" aria-label="UniCash Operational Modules">
            <div className="px-1 pb-1 font-mono text-xs font-bold uppercase tracking-wider text-[#44474f] dark:text-[#9ca3af]">
              {viewportMode === 'mobile'
                ? t('Mobile LAN Modules (Wi-Fi Only)', 'Modul Mobile LAN (Khusus Wi-Fi)')
                : t('Desktop Terminal Modules (Host)', 'Modul Komputer Kasir (Host)')}
            </div>

            {availableChapters.map((item) => {
              const isSelected = item.id === chapter.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveId(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-[#005ac1] text-white border-[#005ac1] dark:bg-[#1f222a] dark:text-[#f1f3f8] dark:border-[#a8c7fa] shadow-xs'
                      : 'bg-[#f1f3f8] dark:bg-[#181a20] border-[#d8dce6] dark:border-[#262932] text-[#111318] dark:text-[#f1f3f8] hover:border-[#005ac1] dark:hover:border-[#a8c7fa]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`font-mono text-xs font-bold ${
                        isSelected ? 'text-[#d8e2ff] dark:text-[#a8c7fa]' : 'text-[#005ac1] dark:text-[#a8c7fa]'
                      }`}
                    >
                      {item.index}
                    </span>
                    <span className="font-bold text-sm truncate">
                      {t(item.tabLabelEn, item.tabLabelId)}
                    </span>
                  </div>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white dark:bg-[#a8c7fa] shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Stage: High-Resolution Viewport Frame + Hotspots */}
          <div className="lg:col-span-8 space-y-4">
            <div className="rounded-2xl border border-[#d8dce6] dark:border-[#262932] bg-[#f1f3f8] dark:bg-[#181a20] overflow-hidden shadow-xl">
              {/* Header Title Bar */}
              <div className="px-4 py-3 border-b border-[#d8dce6] dark:border-[#262932] flex flex-wrap items-center justify-between gap-3 bg-[#fdfcff] dark:bg-[#111318]">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#d8e2ff] text-[#001a41] dark:bg-[#004881] dark:text-[#d8e2ff] shrink-0">
                    {chapter.index}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-bold text-sm sm:text-base text-[#111318] dark:text-[#f1f3f8] truncate">
                      {t(chapter.titleEn, chapter.titleId)}
                    </h3>
                    <p className="text-xs text-[#44474f] dark:text-[#9ca3af] truncate">
                      {t(chapter.descEn, chapter.descId)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleStepChapter(-1)}
                    className="min-h-[44px] min-w-[44px] p-2.5 rounded-lg border border-[#d8dce6] dark:border-[#262932] text-[#111318] dark:text-[#f1f3f8] hover:border-[#005ac1] dark:hover:border-[#a8c7fa] flex items-center justify-center cursor-pointer transition-colors"
                    title={t('Previous Screen', 'Layar Sebelumnya')}
                    aria-label={t('Previous Screen', 'Layar Sebelumnya')}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStepChapter(1)}
                    className="min-h-[44px] min-w-[44px] p-2.5 rounded-lg border border-[#d8dce6] dark:border-[#262932] text-[#111318] dark:text-[#f1f3f8] hover:border-[#005ac1] dark:hover:border-[#a8c7fa] flex items-center justify-center cursor-pointer transition-colors"
                    title={t('Next Screen', 'Layar Berikutnya')}
                    aria-label={t('Next Screen', 'Layar Berikutnya')}
                  >
                    <ChevronRight size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsLightboxOpen(true)}
                    className="min-h-[44px] px-3.5 py-2 rounded-lg border border-[#d8dce6] dark:border-[#262932] bg-[#f1f3f8] dark:bg-[#181a20] text-xs font-mono font-bold text-[#005ac1] dark:text-[#a8c7fa] hover:border-[#005ac1] dark:hover:border-[#a8c7fa] flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Maximize2 size={14} />
                    <span>{t('Inspect Full Resolution', 'Perbesar Resolusi Penuh')}</span>
                  </button>
                </div>
              </div>

              {/* Viewport Canvas: Desktop Browser Chassis vs Mobile Smartphone Mockup Frame */}
              <div className="relative bg-[#111318] flex items-center justify-center min-h-[340px] sm:min-h-[500px] p-4 sm:p-6">
                {imgState === 'loading' && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#111318]/80 z-10 font-mono text-xs text-[#a8c7fa]">
                    <div className="w-6 h-6 border-2 border-[#a8c7fa] border-t-transparent rounded-full animate-spin" />
                    <span>{t('Loading 2x capture...', 'Memuat tangkapan layar...')}</span>
                  </div>
                )}

                {imgState === 'error' ? (
                  <div className="p-8 text-center space-y-3 font-mono text-xs text-[#ffb4ab]">
                    <AlertCircle size={28} className="mx-auto" />
                    <p>{t('Screenshot asset could not be loaded.', 'Gagal memuat file tangkapan layar.')}</p>
                    <button
                      type="button"
                      onClick={() => setImgState('loading')}
                      className="min-h-[44px] px-4 py-2 rounded-xl bg-[#005ac1] text-white font-bold cursor-pointer"
                    >
                      {t('Retry Load', 'Coba Lagi')}
                    </button>
                  </div>
                ) : viewportMode === 'mobile' ? (
                  /* Authentic Smartphone Chassis */
                  <div
                    key={`${activeImgSrc}-mobile`}
                    className="relative max-w-[310px] w-full aspect-[9/19.5] rounded-[2.5rem] border-4 border-[#262932] dark:border-[#383d4a] bg-[#111318] p-2.5 shadow-2xl animate-stage-switch"
                  >
                    <div className="w-full h-full rounded-[2rem] overflow-hidden relative">
                      <img
                        src={activeImgSrc}
                        alt={`${chapter.titleEn} (${shotTheme} mode)`}
                        loading="lazy"
                        decoding="async"
                        onLoad={() => setImgState('loaded')}
                        onError={() => setImgState('error')}
                        onClick={() => setIsLightboxOpen(true)}
                        className="w-full h-full object-cover object-top block cursor-zoom-in"
                      />

                      {/* Hotspots in Mobile Mode */}
                      {showHotspots &&
                        imgState === 'loaded' &&
                        chapter.hotspots.map((spot, idx) => {
                          const isSpotActive = activeHotspotIdx === idx;
                          return (
                            <button
                              key={spot.titleEn}
                              type="button"
                              onClick={() => setActiveHotspotIdx(idx)}
                              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                              className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full font-mono text-xs font-extrabold flex items-center justify-center transition-transform cursor-pointer shadow-lg ${
                                isSpotActive
                                  ? 'bg-[#005ac1] text-white ring-4 ring-white scale-110 z-20'
                                  : 'bg-[#111318]/90 text-[#a8c7fa] border-2 border-[#a8c7fa] hover:scale-110 z-10'
                              }`}
                              aria-label={t(spot.titleEn, spot.titleId)}
                            >
                              <span className="absolute inset-0 rounded-full bg-[#005ac1] animate-hotspot-ring pointer-events-none" />
                              <span className="relative">{idx + 1}</span>
                            </button>
                          );
                        })}
                    </div>
                  </div>
                ) : (
                  /* Wide Desktop Chassis */
                  <div
                    key={`${activeImgSrc}-desktop`}
                    className="w-full aspect-[16/10] rounded-xl overflow-hidden border border-[#262932] shadow-2xl relative animate-stage-switch"
                  >
                    <img
                      src={activeImgSrc}
                      alt={`${chapter.titleEn} (${shotTheme} mode)`}
                      loading="lazy"
                      decoding="async"
                      onLoad={() => setImgState('loaded')}
                      onError={() => setImgState('error')}
                      onClick={() => setIsLightboxOpen(true)}
                      className="w-full h-full object-cover object-top block cursor-zoom-in"
                    />

                    {/* Hotspots in Desktop Mode */}
                    {showHotspots &&
                      imgState === 'loaded' &&
                      chapter.hotspots.map((spot, idx) => {
                        const isSpotActive = activeHotspotIdx === idx;
                        return (
                          <button
                            key={spot.titleEn}
                            type="button"
                            onClick={() => setActiveHotspotIdx(idx)}
                            style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                            className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full font-mono text-xs font-extrabold flex items-center justify-center transition-transform cursor-pointer shadow-lg ${
                              isSpotActive
                                ? 'bg-[#005ac1] text-white ring-4 ring-white scale-110 z-20'
                                : 'bg-[#111318]/90 text-[#a8c7fa] border-2 border-[#a8c7fa] hover:scale-110 z-10'
                            }`}
                            aria-label={t(spot.titleEn, spot.titleId)}
                          >
                            <span className="absolute inset-0 rounded-full bg-[#005ac1] animate-hotspot-ring pointer-events-none" />
                            <span className="relative">{idx + 1}</span>
                          </button>
                        );
                      })}
                  </div>
                )}
              </div>

              {/* Active Hotspot Detail Bar + Module Specs */}
              <div className="p-4 border-t border-[#d8dce6] dark:border-[#262932] bg-[#fdfcff] dark:bg-[#111318] grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-7 flex items-start gap-3">
                  <div className="flex items-center gap-1 shrink-0 pt-0.5">
                    {chapter.hotspots.map((spot, idx) => (
                      <button
                        key={spot.titleEn}
                        type="button"
                        onClick={() => setActiveHotspotIdx(idx)}
                        className={`w-7 h-7 rounded-lg font-mono text-xs font-bold cursor-pointer transition-colors ${
                          activeHotspotIdx === idx
                            ? 'bg-[#005ac1] text-white dark:bg-[#a8c7fa] dark:text-[#001a41]'
                            : 'bg-[#f1f3f8] dark:bg-[#181a20] text-[#44474f] dark:text-[#9ca3af]'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    ))}
                  </div>
                  <div className="space-y-0.5">
                    <div className="font-bold text-xs sm:text-sm text-[#111318] dark:text-[#f1f3f8]">
                      {t(
                        chapter.hotspots[activeHotspotIdx]?.titleEn,
                        chapter.hotspots[activeHotspotIdx]?.titleId
                      )}
                    </div>
                    <p className="text-xs text-[#44474f] dark:text-[#9ca3af]">
                      {t(
                        chapter.hotspots[activeHotspotIdx]?.detailEn,
                        chapter.hotspots[activeHotspotIdx]?.detailId
                      )}
                    </p>
                  </div>
                </div>

                <div className="md:col-span-5 grid grid-cols-3 gap-2 border-t md:border-t-0 md:border-l border-[#d8dce6] dark:border-[#262932] pt-3 md:pt-0 md:pl-4 font-mono">
                  {chapter.specs.map((sp) => (
                    <div key={sp.labelEn} className="space-y-0.5">
                      <span className="block text-xs text-[#44474f] dark:text-[#9ca3af] uppercase truncate">
                        {t(sp.labelEn, sp.labelId)}
                      </span>
                      <span className="block text-xs font-bold text-[#111318] dark:text-[#f1f3f8] truncate">
                        {sp.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col p-4 sm:p-6 animate-in fade-in"
        >
          <div className="max-w-[1400px] w-full mx-auto flex items-center justify-between gap-4 pb-4 text-white">
            <div>
              <div className="font-bold text-sm sm:text-base">
                {chapter.index} // {t(chapter.titleEn, chapter.titleId)}
              </div>
              <div className="font-mono text-xs text-zinc-400">
                {viewportMode.toUpperCase()} // {shotTheme.toUpperCase()}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleStepChapter(-1)}
                className="min-h-[44px] min-w-[44px] p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
                aria-label="Previous"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={() => handleStepChapter(1)}
                className="min-h-[44px] min-w-[44px] p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
                aria-label="Next"
              >
                <ChevronRight size={20} />
              </button>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="min-h-[44px] min-w-[44px] p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto flex items-center justify-center p-2">
            <img
              src={activeImgSrc}
              alt={chapter.titleEn}
              className={`object-contain max-h-[82vh] ${
                viewportMode === 'mobile' ? 'max-w-[360px] rounded-2xl' : 'max-w-full rounded-lg'
              }`}
            />
          </div>
        </div>
      )}
    </section>
  );
}
