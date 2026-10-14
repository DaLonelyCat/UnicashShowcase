import React, { useState } from 'react';
import {
  Cpu,
  Wifi,
  HardDrive,
  Printer,
  ChevronDown,
  Terminal,
  ShieldCheck,
  HelpCircle,
  RotateCcw,
  FileText
} from 'lucide-react';
import { TECHNICAL_SPECS, PRODUCT_FAQ } from '../data/demoStoreData';

const SPEC_ICONS = [HardDrive, Printer, Wifi, Cpu, RotateCcw, FileText];

export default function ArchitectureSpecSection({ isDark, t }) {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  return (
    <section
      id="architecture"
      className={`py-20 sm:py-28 border-b border-[#d8dce6] dark:border-[#262932] transition-colors ${
        isDark ? 'bg-[#111318]' : 'bg-[#fdfcff]'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-20 xl:px-24">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14">
          <div className="lg:col-span-7">
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight leading-[1.06] text-[#111318] dark:text-[#f1f3f8] text-balance">
              {t(
                'Engineered to survive dead Wi-Fi, peak queues, and hardware resets.',
                'Dirancang tahan gangguan internet mati, antrean padat, dan reset perangkat.'
              )}
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm sm:text-base leading-relaxed text-[#44474f] dark:text-[#9ca3af]">
              {t(
                'UniCash packages an Express 5 local server, atomic JSON + CSV persistence, WebUSB/WebBluetooth thermal printer drivers, and an offline Ollama LLM endpoint inside a single desktop runtime.',
                'UniCash mengemas server lokal Express 5, penyimpanan JSON + CSV atomik, driver printer thermal WebUSB/WebBluetooth, dan endpoint LLM Ollama offline di dalam satu runtime desktop.'
              )}
            </p>
          </div>
        </div>

        {/* 6-Card Hardware & Architecture Spec Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {TECHNICAL_SPECS.map((spec, idx) => {
            const Icon = SPEC_ICONS[idx % SPEC_ICONS.length];
            return (
              <div
                key={spec.code}
                className="p-6 rounded-3xl border border-[#d8dce6] dark:border-[#262932] bg-[#fdfcff] dark:bg-[#181a20] flex flex-col justify-between transition-colors shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 pb-4 mb-4 border-b border-[#d8dce6] dark:border-[#262932]">
                    <div className="w-10 h-10 rounded-2xl bg-[#005ac1]/10 dark:bg-[#a8c7fa]/15 text-[#005ac1] dark:text-[#a8c7fa] flex items-center justify-center shrink-0">
                      <Icon size={18} />
                    </div>
                    <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-[#f1f3f8] dark:bg-[#1f222a] text-[#005ac1] dark:text-[#a8c7fa]">
                      {spec.metric}
                    </span>
                  </div>

                  <div className="text-xs font-mono uppercase tracking-widest text-[#44474f] dark:text-[#9ca3af] mb-1 font-bold">
                    {spec.code}
                  </div>
                  <h3 className="font-display font-bold text-lg tracking-tight mb-2 text-[#111318] dark:text-[#f1f3f8]">
                    {t(spec.titleEn, spec.titleId)}
                  </h3>
                  <p className="text-xs leading-relaxed text-[#44474f] dark:text-[#9ca3af]">
                    {t(spec.descEn, spec.descId)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Product-Specific Technical FAQ Accordion */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest mb-3 border bg-[#f1f3f8] dark:bg-[#181a20] border-[#d8dce6] dark:border-[#262932]">
              <HelpCircle size={13} className="text-[#005ac1] dark:text-[#a8c7fa]" />
              <span className="text-[#111318] dark:text-[#f1f3f8]">{t('Operational FAQ', 'Tanya Jawab Operasional')}</span>
            </div>
            <h3 className="font-display font-extrabold text-2xl sm:text-4xl tracking-tight leading-tight mb-3 text-[#111318] dark:text-[#f1f3f8]">
              {t(
                'Questions from store owners & baristas.',
                'Pertanyaan dari pemilik toko & barista.'
              )}
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed mb-6 text-[#44474f] dark:text-[#9ca3af]">
              {t(
                'Direct answers about LAN multi-device sync, BOM recipe deductions, catastrophe recall snapshots, and running local Ollama models on store hardware.',
                'Jawaban langsung seputar sinkronisasi LAN multi-perangkat, pemotongan resep BOM, snapshot pemulihan darurat, dan cara menjalankan model Ollama lokal di komputer kasir.'
              )}
            </p>

            <div className="p-4 rounded-2xl border border-[#d8dce6] dark:border-[#262932] bg-[#fdfcff] dark:bg-[#181a20] flex items-start gap-3 text-xs text-[#44474f] dark:text-[#9ca3af]">
              <ShieldCheck size={18} className="text-[#198754] dark:text-[#75d59e] shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <span className="font-bold text-[#111318] dark:text-[#f1f3f8] block mb-0.5">
                  {t('100% Local Data Ownership', '100% Kepemilikan Data Lokal')}
                </span>
                {t(
                  'Your menu catalog, recipe ratios, sales history, and accounting ledgers stay on your machine in open JSON and CSV files.',
                  'Katalog menu, rasio resep, riwayat transaksi, dan buku besar akuntansi tersimpan di perangkat Anda dalam format JSON dan CSV terbuka.'
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-3">
            {PRODUCT_FAQ.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-colors ${
                    isOpen
                      ? 'bg-[#fdfcff] dark:bg-[#181a20] border-[#005ac1] dark:border-[#a8c7fa] shadow-sm'
                      : 'bg-[#fdfcff] dark:bg-[#181a20] border-[#d8dce6] dark:border-[#262932]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                    aria-expanded={isOpen}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer min-h-[56px]"
                  >
                    <span className="font-semibold text-sm sm:text-base tracking-tight text-[#111318] dark:text-[#f1f3f8]">
                      {t(faq.qEn, faq.qId)}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#005ac1] dark:text-[#a8c7fa]' : 'text-[#44474f] dark:text-[#9ca3af]'
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm leading-relaxed border-t border-[#d8dce6] dark:border-[#262932] text-[#44474f] dark:text-[#9ca3af]">
                      {t(faq.aEn, faq.aId)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
