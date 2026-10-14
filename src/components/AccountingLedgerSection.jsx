import React, { useState } from 'react';
import {
  BookOpen,
  TrendingUp,
  Scale,
  Wallet,
  CheckCircle2,
  FileSpreadsheet,
  Search
} from 'lucide-react';
import { ACCOUNTING_LEDGER_DATA } from '../data/demoStoreData';

export default function AccountingLedgerSection({ isDark, t, formatRp }) {
  const [activeStatement, setActiveStatement] = useState('journal'); // 'journal' | 'pnl' | 'balance' | 'cashflow'
  const [searchQuery, setSearchQuery] = useState('');

  const filteredJournal = ACCOUNTING_LEDGER_DATA.journalEntries.filter((entry) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      entry.id.toLowerCase().includes(q) ||
      entry.ref.toLowerCase().includes(q) ||
      entry.descEn.toLowerCase().includes(q) ||
      entry.descId.toLowerCase().includes(q) ||
      entry.lines.some(
        (l) =>
          l.accountCode.toLowerCase().includes(q) ||
          l.accountEn.toLowerCase().includes(q) ||
          l.accountId.toLowerCase().includes(q)
      )
    );
  });

  const totalJournalDebit = filteredJournal.reduce(
    (sum, entry) => sum + entry.lines.reduce((s, l) => s + l.debit, 0),
    0
  );
  const totalJournalCredit = filteredJournal.reduce(
    (sum, entry) => sum + entry.lines.reduce((s, l) => s + l.credit, 0),
    0
  );

  const statementTabs = [
    {
      id: 'journal',
      icon: BookOpen,
      code: 'JURNAL UMUM',
      labelEn: 'General Journal',
      labelId: 'Jurnal Umum',
      descEn: 'Chronological Debit & Credit double-entry ledger',
      descId: 'Buku besar entri ganda Debit & Kredit kronologis'
    },
    {
      id: 'pnl',
      icon: TrendingUp,
      code: 'LABA RUGI',
      labelEn: 'Profit & Loss Statement',
      labelId: 'Laporan Laba Rugi',
      descEn: 'Gross Sales, COGS (HPP), Operating Expenses & Net Profit',
      descId: 'Penjualan Kotor, HPP, Beban Operasional & Laba Bersih'
    },
    {
      id: 'balance',
      icon: Scale,
      code: 'NERACA KEUANGAN',
      labelEn: 'Balance Sheet',
      labelId: 'Neraca Keuangan',
      descEn: 'Assets = Liabilities + Equity real-time verification',
      descId: 'Verifikasi real-time Aset = Liabilitas + Ekuitas'
    },
    {
      id: 'cashflow',
      icon: Wallet,
      code: 'ARUS KAS & REIMBURSE',
      labelEn: 'Cash Flow & Partner Reimbursements',
      labelId: 'Arus Kas & Reimburse Mitra',
      descEn: 'Operating cash inflows, store expenses, and partner payouts',
      descId: 'Kas masuk operasional, biaya toko, dan pelunasan talangan mitra'
    }
  ];

  return (
    <section
      id="accounting"
      className={`py-20 sm:py-28 border-b transition-colors ${
        isDark ? 'bg-[#111318] border-white/[0.08]' : 'bg-[#fdfcff] border-black/[0.08]'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-20 xl:px-24">
        {/* Editorial Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-7">
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight leading-[1.06] text-balance">
              {t(
                'Every cup poured is already reconciled in the Balance Sheet.',
                'Setiap cup yang terjual langsung terekonsiliasi di Neraca Keuangan.'
              )}
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
              {t(
                'Most cashier apps force you to export CSVs and rebuild your own spreadsheets at midnight. UniCash writes standard Indonesian accounting statements (Jurnal Umum, Laba Rugi, Neraca, Arus Kas) automatically from live POS orders and expense logs.',
                'Sebagian besar aplikasi kasir memaksa Anda mengekspor CSV dan menyusun ulang pembukuan di tengah malam. UniCash menyusun laporan akuntansi standar (Jurnal Umum, Laba Rugi, Neraca, Arus Kas) secara otomatis dari transaksi kasir dan catatan pengeluaran.'
              )}
            </p>
          </div>
        </div>

        {/* Statement Selector Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {statementTabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeStatement === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveStatement(tab.id)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[116px] ${
                  active
                    ? isDark
                      ? 'bg-[#004a77]/40 border-[#a8c7fa] text-white shadow-lg'
                      : 'bg-[#d8e2ff]/65 border-[#005ac1] text-zinc-950 shadow-sm'
                    : isDark
                    ? 'bg-[#181a20] border-white/[0.08] text-zinc-300 hover:bg-white/[0.04]'
                    : 'bg-[#f4f6fb] border-black/[0.08] text-zinc-700 hover:bg-black/[0.03]'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                    active
                      ? isDark
                        ? 'bg-[#005ac1] text-white'
                        : 'bg-[#005ac1] text-white'
                      : isDark
                      ? 'bg-white/[0.06] text-zinc-400'
                      : 'bg-black/[0.06] text-zinc-600'
                  }`}>
                    <Icon size={16} />
                  </div>
                </div>
                <div>
                  <div className="font-bold text-sm tracking-tight mb-0.5">
                    {t(tab.labelEn, tab.labelId)}
                  </div>
                  <p className={`text-xs leading-snug ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    {t(tab.descEn, tab.descId)}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Statement Inspector Surface */}
        <div className={`rounded-3xl border overflow-hidden transition-colors ${
          isDark ? 'bg-[#16181d] border-white/[0.1] shadow-2xl' : 'bg-white border-black/[0.1] shadow-xl'
        }`}>
          {/* Statement Top Bar */}
          <div className={`px-5 py-4 border-b flex flex-wrap items-center justify-between gap-3 ${
            isDark ? 'bg-[#1b1d24] border-white/[0.08]' : 'bg-[#f4f6fb] border-black/[0.08]'
          }`}>
            <div className="flex items-center gap-3">
              <FileSpreadsheet size={18} className="text-[#005ac1] dark:text-[#a8c7fa]" />
              <div>
                <div className="text-xs font-bold uppercase tracking-wider">
                  {t(ACCOUNTING_LEDGER_DATA.periodLabelEn, ACCOUNTING_LEDGER_DATA.periodLabelId)}
                </div>
                <div className={`text-xs font-mono ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  {t('Source: ./data/sales_log.json + ./data/expenses_log.json', 'Sumber: ./data/sales_log.json + ./data/expenses_log.json')}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#198754]/15 text-[#198754] dark:text-[#75d59e] border border-[#198754]/25">
                <CheckCircle2 size={13} />
                <span>{t('DEBIT = CREDIT BALANCED', 'DEBIT = KREDIT SEIMBANG')}</span>
              </span>
            </div>
          </div>

          {/* TAB 1: GENERAL JOURNAL (JURNAL UMUM) */}
          {activeStatement === 'journal' && (
            <div className="p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-5">
                <div className="text-xs font-mono text-zinc-400">
                  {t(
                    'Showing double-entry POS sales, raw material COGS, and partner expense reimbursements.',
                    'Menampilkan jurnal entri ganda penjualan POS, HPP bahan baku, dan reimburse pengeluaran mitra.'
                  )}
                </div>

                <div className="relative min-w-[240px]">
                  <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('Filter account code or ref...', 'Cari kode akun atau ref...')}
                    aria-label={t('Filter general journal entries', 'Cari entri jurnal umum')}
                    className={`w-full pl-9 pr-3 py-2 rounded-xl text-xs border focus:outline-none ${
                      isDark
                        ? 'bg-[#111318] border-white/[0.1] text-white placeholder:text-zinc-500 focus:border-[#a8c7fa]'
                        : 'bg-[#f8f9fc] border-black/[0.1] text-zinc-900 placeholder:text-zinc-400 focus:border-[#005ac1]'
                    }`}
                  />
                </div>
              </div>

              <div className={`rounded-2xl border overflow-x-auto ${
                isDark ? 'border-white/[0.08]' : 'border-black/[0.08]'
              }`}>
                <table className="w-full text-left text-xs">
                  <thead className={`text-xs font-mono uppercase tracking-wider border-b ${
                    isDark ? 'bg-white/[0.03] border-white/[0.08] text-zinc-400' : 'bg-[#f4f6fb] border-black/[0.08] text-zinc-600'
                  }`}>
                    <tr>
                      <th className="py-3 px-4">{t('Journal ID / Date', 'ID Jurnal / Waktu')}</th>
                      <th className="py-3 px-4">{t('Ref Code', 'Kode Ref')}</th>
                      <th className="py-3 px-4">{t('Account & Description', 'Akun & Keterangan')}</th>
                      <th className="py-3 px-4 text-right">{t('Debit (Rp)', 'Debit (Rp)')}</th>
                      <th className="py-3 px-4 text-right">{t('Credit (Rp)', 'Kredit (Rp)')}</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${isDark ? 'divide-white/[0.06]' : 'divide-black/[0.06]'}`}>
                    {filteredJournal.map((entry) => (
                      <React.Fragment key={entry.id}>
                        <tr className={isDark ? 'bg-white/[0.02]' : 'bg-black/[0.015]'}>
                          <td className="py-2.5 px-4 font-mono font-bold text-[#005ac1] dark:text-[#a8c7fa]">
                            <div>{entry.id}</div>
                            <div className="text-xs font-normal text-zinc-500">{entry.date}</div>
                          </td>
                          <td className="py-2.5 px-4">
                            <span className="px-2 py-0.5 rounded text-xs font-mono font-semibold bg-[#005ac1]/15 text-[#005ac1] dark:bg-[#a8c7fa]/15 dark:text-[#a8c7fa]">
                              {entry.ref}
                            </span>
                          </td>
                          <td colSpan={3} className="py-2.5 px-4 font-semibold">
                            {t(entry.descEn, entry.descId)}
                          </td>
                        </tr>
                        {entry.lines.map((line, idx) => (
                          <tr key={`${entry.id}-${idx}`} className="font-mono">
                            <td className="py-2 px-4"></td>
                            <td className="py-2 px-4 text-zinc-400 text-xs">{line.accountCode}</td>
                            <td className={`py-2 px-4 ${line.credit > 0 ? 'pl-10 text-zinc-500 dark:text-zinc-400' : 'font-medium'}`}>
                              {t(line.accountEn, line.accountId)}
                            </td>
                            <td className="py-2 px-4 text-right tabular-nums">
                              {line.debit > 0 ? `Rp ${formatRp(line.debit)}` : '-'}
                            </td>
                            <td className="py-2 px-4 text-right tabular-nums">
                              {line.credit > 0 ? `Rp ${formatRp(line.credit)}` : '-'}
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                  <tfoot className={`border-t font-mono font-bold text-xs ${
                    isDark ? 'bg-[#1b1d24] border-white/[0.1]' : 'bg-[#f4f6fb] border-black/[0.1]'
                  }`}>
                    <tr>
                      <td colSpan={3} className="py-3 px-4 text-right uppercase tracking-wider">
                        {t('Total Filtered Journal Balance', 'Total Saldo Jurnal Terfilter')}
                      </td>
                      <td className="py-3 px-4 text-right tabular-nums text-[#198754] dark:text-[#75d59e]">
                        Rp {formatRp(totalJournalDebit)}
                      </td>
                      <td className="py-3 px-4 text-right tabular-nums text-[#198754] dark:text-[#75d59e]">
                        Rp {formatRp(totalJournalCredit)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: PROFIT & LOSS (LAPORAN LABA RUGI) */}
          {activeStatement === 'pnl' && (
            <div className="p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 space-y-4">
                {ACCOUNTING_LEDGER_DATA.pnlLines.map((sec, idx) => (
                  <div
                    key={idx}
                    className={`p-5 rounded-2xl border ${
                      isDark ? 'bg-[#111318] border-white/[0.08]' : 'bg-[#f8f9fc] border-black/[0.08]'
                    }`}
                  >
                    <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-3">
                      {idx + 1}. {t(sec.sectionEn, sec.sectionId)}
                    </div>
                    <div className="space-y-2 text-xs font-mono">
                      {sec.items.map((item, i) => (
                        <div key={i} className="flex justify-between">
                          <span>{t(item.labelEn, item.labelId)}</span>
                          <span className={`tabular-nums ${item.amount < 0 ? 'text-rose-500' : 'font-semibold'}`}>
                            {item.amount < 0 ? `(Rp ${formatRp(Math.abs(item.amount))})` : `Rp ${formatRp(item.amount)}`}
                          </span>
                        </div>
                      ))}
                      <div className="pt-2.5 border-t border-black/[0.08] dark:border-white/[0.08] flex justify-between font-bold text-sm text-[#198754] dark:text-[#75d59e]">
                        <span>{t(sec.totalLabelEn, sec.totalLabelId)}</span>
                        <span className="tabular-nums">Rp {formatRp(sec.total)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between gap-4">
                <div className={`p-5 rounded-2xl border flex-1 flex flex-col justify-between ${
                  isDark ? 'bg-[#111318] border-white/[0.08]' : 'bg-[#f4f6fb] border-black/[0.08]'
                }`}>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-widest text-[#005ac1] dark:text-[#a8c7fa] font-bold mb-2">
                      {t('Payment Channel Split', 'Rincian Metode Pembayaran')}
                    </div>
                    <p className={`text-xs mb-5 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      {t(
                        'Every checkout tags the settlement channel so Cash Drawer and QRIS Bank settlements never mix.',
                        'Setiap pembayaran menandai jalur pelunasan sehingga uang tunai di laci dan saldo QRIS bank tidak pernah tercampur.'
                      )}
                    </p>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-xs font-mono mb-1">
                          <span>{t('QRIS / Digital Settlement', 'Pelunasan QRIS / Digital')}</span>
                          <span className="font-bold">Rp {formatRp(ACCOUNTING_LEDGER_DATA.summary.qrisShare)} (75.0%)</span>
                        </div>
                        <div className="h-2.5 rounded-full bg-black/[0.08] dark:bg-white/[0.08] overflow-hidden">
                          <div className="h-full bg-[#005ac1] dark:bg-[#a8c7fa] rounded-full" style={{ width: '75%' }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-mono mb-1">
                          <span>{t('Cash Drawer / Tunai', 'Laci Kasir / Tunai')}</span>
                          <span className="font-bold">Rp {formatRp(ACCOUNTING_LEDGER_DATA.summary.cashShare)} (25.0%)</span>
                        </div>
                        <div className="h-2.5 rounded-full bg-black/[0.08] dark:bg-white/[0.08] overflow-hidden">
                          <div className="h-full bg-[#198754] dark:bg-[#75d59e] rounded-full" style={{ width: '25%' }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`mt-6 p-4 rounded-xl border font-mono text-xs ${
                    isDark ? 'bg-[#181a20] border-white/[0.06]' : 'bg-white border-black/[0.06]'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-400">{t('NET PROFIT MARGIN', 'MARGIN LABA BERSIH')}</span>
                      <span className="text-lg font-bold text-[#198754] dark:text-[#75d59e]">
                        {ACCOUNTING_LEDGER_DATA.summary.netMarginPct}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: BALANCE SHEET (NERACA KEUANGAN) */}
          {activeStatement === 'balance' && (
            <div className="p-5 sm:p-6 space-y-6">
              <div className={`p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-4 ${
                isDark ? 'bg-[#198754]/10 border-[#198754]/30' : 'bg-[#198754]/10 border-[#198754]/25'
              }`}>
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-[#198754] dark:text-[#75d59e] shrink-0" />
                  <div>
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#198754] dark:text-[#75d59e]">
                      {t('ACCOUNTING EQUATION VERIFIED (ASSETS = LIABILITIES + EQUITY)', 'PERSAMAAN AKUNTANSI TERVERIFIKASI (ASET = LIABILITAS + EKUITAS)')}
                    </div>
                    <div className="text-xs font-mono mt-0.5">
                      Rp {formatRp(ACCOUNTING_LEDGER_DATA.balanceSheet.totalAssets)} = Rp {formatRp(ACCOUNTING_LEDGER_DATA.balanceSheet.totalLiabilitiesAndEquity)}
                    </div>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-[#198754] text-white">
                  {t('DISCREPANCY: Rp 0', 'SELISIH: Rp 0')}
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className={`p-5 rounded-2xl border flex flex-col justify-between ${
                  isDark ? 'bg-[#111318] border-white/[0.08]' : 'bg-[#f8f9fc] border-black/[0.08]'
                }`}>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-widest text-[#005ac1] dark:text-[#a8c7fa] font-bold mb-4">
                      {t('ASSETS (AKTIVA / HARTA)', 'ASET (AKTIVA / HARTA)')}
                    </div>
                    <div className="space-y-3 text-xs font-mono">
                      {ACCOUNTING_LEDGER_DATA.balanceSheet.assets.map((a, idx) => (
                        <div key={idx} className="flex items-center justify-between py-1.5 border-b border-black/[0.05] dark:border-white/[0.05]">
                          <span className="font-sans font-medium">{t(a.labelEn, a.labelId)}</span>
                          <span className="font-bold tabular-nums">Rp {formatRp(a.amount)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="pt-4 mt-4 border-t border-black/[0.1] dark:border-white/[0.1] flex justify-between font-mono font-bold text-sm text-[#005ac1] dark:text-[#a8c7fa]">
                    <span>{t('TOTAL ASSETS', 'TOTAL ASET')}</span>
                    <span className="tabular-nums">Rp {formatRp(ACCOUNTING_LEDGER_DATA.balanceSheet.totalAssets)}</span>
                  </div>
                </div>

                <div className={`p-5 rounded-2xl border flex flex-col justify-between ${
                  isDark ? 'bg-[#111318] border-white/[0.08]' : 'bg-[#f8f9fc] border-black/[0.08]'
                }`}>
                  <div className="space-y-5">
                    <div>
                      <div className="text-xs font-mono uppercase tracking-widest text-[#e37400] dark:text-[#fbbd05] font-bold mb-3">
                        {t('LIABILITIES (KEWAJIBAN / UTANG)', 'LIABILITAS (KEWAJIBAN / UTANG)')}
                      </div>
                      <div className="space-y-2.5 text-xs font-mono">
                        {ACCOUNTING_LEDGER_DATA.balanceSheet.liabilities.map((l, idx) => (
                          <div key={idx} className="flex items-center justify-between py-1.5 border-b border-black/[0.05] dark:border-white/[0.05]">
                            <span className="font-sans font-medium">{t(l.labelEn, l.labelId)}</span>
                            <span className="font-bold tabular-nums">Rp {formatRp(l.amount)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-mono uppercase tracking-widest text-[#198754] dark:text-[#75d59e] font-bold mb-3">
                        {t('EQUITY (MODAL & LABA DITAHAN)', 'EKUITAS (MODAL & LABA DITAHAN)')}
                      </div>
                      <div className="space-y-2.5 text-xs font-mono">
                        {ACCOUNTING_LEDGER_DATA.balanceSheet.equity.map((eq, idx) => (
                          <div key={idx} className="flex items-center justify-between py-1.5 border-b border-black/[0.05] dark:border-white/[0.05]">
                            <span className="font-sans font-medium">{t(eq.labelEn, eq.labelId)}</span>
                            <span className="font-bold tabular-nums">Rp {formatRp(eq.amount)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-black/[0.1] dark:border-white/[0.1] flex justify-between font-mono font-bold text-sm text-[#198754] dark:text-[#75d59e]">
                    <span>{t('TOTAL LIABILITIES + EQUITY', 'TOTAL LIABILITAS + EKUITAS')}</span>
                    <span className="tabular-nums">
                      Rp {formatRp(ACCOUNTING_LEDGER_DATA.balanceSheet.totalLiabilitiesAndEquity)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CASH FLOW & PARTNER REIMBURSEMENTS */}
          {activeStatement === 'cashflow' && (
            <div className="p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {ACCOUNTING_LEDGER_DATA.cashFlow.map((cf, idx) => (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl border flex flex-col justify-between ${
                    isDark ? 'bg-[#111318] border-white/[0.08]' : 'bg-[#f8f9fc] border-black/[0.08]'
                  }`}
                >
                  <div>
                    <div className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                      0{idx + 1} / {t('CASH FLOW LINE', 'BARIS ARUS KAS')}
                    </div>
                    <div className="font-bold text-sm mt-1">
                      {t(cf.categoryEn, cf.categoryId)}
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-black/[0.06] dark:border-white/[0.06]">
                    <div className={`text-lg font-mono font-bold tabular-nums ${
                      cf.amount < 0 ? 'text-rose-500' : 'text-[#198754] dark:text-[#75d59e]'
                    }`}>
                      {cf.amount < 0 ? `-Rp ${formatRp(Math.abs(cf.amount))}` : `Rp ${formatRp(cf.amount)}`}
                    </div>
                    <div className="text-xs text-zinc-500 mt-0.5">
                      {t(cf.noteEn, cf.noteId)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
