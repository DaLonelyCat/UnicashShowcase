import React, { useState, useMemo } from 'react';
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Search,
  Printer,
  QrCode,
  Banknote,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  FlaskConical,
  BookOpen,
  X
} from 'lucide-react';
import { DEMO_PRODUCTS, INITIAL_RAW_MATERIALS } from '../data/demoStoreData';

export default function InteractiveSandboxSection({ t, formatRp }) {
  const [products, setProducts] = useState(DEMO_PRODUCTS);
  const [materials, setMaterials] = useState(INITIAL_RAW_MATERIALS);
  const [cart, setCart] = useState([
    { id: 'prod-latte', qty: 2 },
    { id: 'prod-croissant', qty: 1 }
  ]);
  const [category, setCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('QRIS'); // 'QRIS' | 'Cash'
  const [discountPct, setDiscountPct] = useState(0); // 0, 5, 10, 15
  const [cashTendered, setCashTendered] = useState(100000);
  const [uiSimState, setUiSimState] = useState('live'); // 'live' | 'loading' | 'empty' | 'error' (R-27)
  const [lastCompletedOrder, setLastCompletedOrder] = useState(null);
  const [orderCounter, setOrderCounter] = useState(104);

  // Filter catalog items
  const filteredProducts = useMemo(() => {
    if (uiSimState === 'empty') return [];
    return products.filter((p) => {
      const matchCat = category === 'All' || p.category === category;
      const q = searchQuery.trim().toLowerCase();
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.nameEn.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [products, category, searchQuery, uiSimState]);

  // Enrich cart items with product details
  const detailedCart = useMemo(() => {
    return cart
      .map((c) => {
        const prod = products.find((p) => p.id === c.id);
        if (!prod) return null;
        return {
          ...prod,
          qty: c.qty,
          lineSubtotal: prod.price * c.qty,
          lineCost: prod.cost * c.qty
        };
      })
      .filter(Boolean);
  }, [cart, products]);

  // Calculate subtotal, discount, final total, HPP, and gross margin
  const totals = useMemo(() => {
    const subtotal = detailedCart.reduce((acc, item) => acc + item.lineSubtotal, 0);
    const totalHpp = detailedCart.reduce((acc, item) => acc + item.lineCost, 0);
    const discountAmount = Math.round((subtotal * discountPct) / 100);
    const finalTotal = Math.max(0, subtotal - discountAmount);
    const grossProfit = finalTotal - totalHpp;
    const marginPct = finalTotal > 0 ? ((grossProfit / finalTotal) * 100).toFixed(1) : '0.0';
    const changeDue = paymentMethod === 'Cash' ? Math.max(0, cashTendered - finalTotal) : 0;

    return {
      subtotal,
      totalHpp,
      discountAmount,
      finalTotal,
      grossProfit,
      marginPct,
      changeDue
    };
  }, [detailedCart, discountPct, paymentMethod, cashTendered]);

  // Calculate live BOM raw material deductions for current cart
  const bomDeductions = useMemo(() => {
    const map = {};
    detailedCart.forEach((item) => {
      (item.bom || []).forEach((b) => {
        if (!map[b.materialId]) {
          map[b.materialId] = 0;
        }
        map[b.materialId] += b.qty * item.qty;
      });
    });

    return Object.entries(map)
      .map(([matId, requiredQty]) => {
        const mat = materials.find((m) => m.id === matId);
        if (!mat) return null;
        return {
          ...mat,
          requiredQty,
          remainingStock: Math.max(0, mat.stock - requiredQty)
        };
      })
      .filter(Boolean);
  }, [detailedCart, materials]);

  const handleAddToCart = (prodId) => {
    const prod = products.find((p) => p.id === prodId);
    if (!prod || prod.stock <= 0) return;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === prodId);
      if (existing) {
        if (existing.qty >= prod.stock) return prev;
        return prev.map((item) =>
          item.id === prodId ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { id: prodId, qty: 1 }];
    });
  };

  const handleUpdateQty = (prodId, delta) => {
    const prod = products.find((p) => p.id === prodId);
    const maxStock = prod ? prod.stock : 99;

    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id !== prodId) return item;
          const nextQty = Math.min(maxStock, item.qty + delta);
          return nextQty > 0 ? { ...item, qty: nextQty } : null;
        })
        .filter(Boolean)
    );
  };

  const handleCompleteSale = () => {
    if (detailedCart.length === 0) return;

    // Deduct product stock
    setProducts((prev) =>
      prev.map((p) => {
        const inCart = cart.find((c) => c.id === p.id);
        if (!inCart) return p;
        return { ...p, stock: Math.max(0, p.stock - inCart.qty) };
      })
    );

    // Deduct BOM raw materials
    setMaterials((prev) =>
      prev.map((m) => {
        const ded = bomDeductions.find((d) => d.id === m.id);
        if (!ded) return m;
        return { ...m, stock: ded.remainingStock };
      })
    );

    const newOrderNum = orderCounter + 1;
    setOrderCounter(newOrderNum);

    setLastCompletedOrder({
      orderId: `ORD-261013-${newOrderNum}`,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      paymentMethod,
      discountPct,
      items: detailedCart,
      ...totals
    });
  };

  const handleResetSandbox = () => {
    setProducts(DEMO_PRODUCTS);
    setMaterials(INITIAL_RAW_MATERIALS);
    setCart([
      { id: 'prod-teh-apel-mint', qty: 2 },
      { id: 'prod-keripik-nangka', qty: 1 }
    ]);
    setDiscountPct(0);
    setPaymentMethod('QRIS');
    setUiSimState('live');
    setSearchQuery('');
    setCategory('All');
    setLastCompletedOrder(null);
  };

  // Active receipt displays either the live cart preview or the just-completed order
  const activeReceipt = lastCompletedOrder || {
    orderId: `PREVIEW-${orderCounter + 1}`,
    timestamp: 'LIVE TICKET',
    paymentMethod,
    discountPct,
    items: detailedCart,
    ...totals
  };

  return (
    <section
      id="sandbox"
      className="border-b border-[#d8dce6] dark:border-[#262932] py-14 sm:py-20 bg-[#f1f3f8]/60 dark:bg-[#181a20]/50"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-20 xl:px-24 space-y-8">
        {/* Section Editorial Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#d8dce6] dark:border-[#262932]">
          <div className="space-y-2 max-w-3xl">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-[#111318] dark:text-[#f1f3f8] text-balance">
              {t(
                'Test the Cashier, BOM Recipe Engine, and Double-Entry Journal live.',
                'Uji Kasir, Mesin Resep BOM, dan Jurnal Double-Entry secara langsung.'
              )}
            </h2>
            <p className="text-sm sm:text-base text-[#44474f] dark:text-[#9ca3af] text-pretty">
              {t(
                'Add menu items below to watch raw materials deduct by the gram, apply a promo discount, tender via QRIS or Cash, and inspect the generated 80mm thermal receipt and double-entry journal rows.',
                'Tambahkan menu di bawah untuk melihat pemotongan bahan baku per gram, terapkan diskon promo, pilih bayar QRIS atau Tunai, dan periksa hasil cetak struk thermal 80mm beserta baris Jurnal Umumnya.'
              )}
            </p>
          </div>

          {/* Sandbox Controls: Clean Status & Store Reset */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <div className="px-3 py-2 rounded-xl border border-[#d8dce6] dark:border-[#262932] bg-[#fdfcff] dark:bg-[#111318] flex items-center gap-2 text-xs font-mono text-[#44474f] dark:text-[#9ca3af]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{t('Simulated POS Terminal', 'Terminal POS Simulasi')}</span>
            </div>

            <button
              type="button"
              onClick={handleResetSandbox}
              className="min-h-[44px] px-4 py-2.5 rounded-xl font-mono text-xs font-bold border border-[#d8dce6] dark:border-[#262932] bg-[#fdfcff] dark:bg-[#111318] text-[#111318] dark:text-[#f1f3f8] hover:border-[#005ac1] dark:hover:border-[#a8c7fa] flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
            >
              <RotateCcw size={14} />
              <span>{t('Reset Demo Store', 'Reset Toko Demo')}</span>
            </button>
          </div>
        </div>

        {/* 3-Column Interactive Architecture Workbench */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* COLUMN 1 (5 cols): Menu Catalog + BOM Raw Material Meter */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl border border-[#d8dce6] dark:border-[#262932] bg-[#fdfcff] dark:bg-[#111318] p-4 space-y-4">
              {/* Category Chips & Search Input */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-[#d8dce6] dark:border-[#262932]">
                <div className="flex items-center gap-1.5" role="tablist" aria-label="Menu Category Filter">
                  {['All', 'Tea', 'Snacks'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      role="tab"
                      aria-selected={category === cat}
                      onClick={() => setCategory(cat)}
                      className={`min-h-[44px] px-3.5 py-2 rounded-lg text-xs font-bold cursor-pointer transition-colors flex items-center justify-center ${
                        category === cat
                          ? 'bg-[#005ac1] text-white dark:bg-[#a8c7fa] dark:text-[#001a41]'
                          : 'bg-[#f1f3f8] dark:bg-[#181a20] text-[#44474f] dark:text-[#9ca3af]'
                      }`}
                    >
                      {cat === 'All' ? t('All Menu', 'Semua') : cat}
                    </button>
                  ))}
                </div>

                <div className="relative flex-1 sm:max-w-[190px]">
                  <Search
                    size={13}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#44474f] dark:text-[#9ca3af] pointer-events-none"
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('Filter item or SKU...', 'Cari menu / SKU...')}
                    aria-label={t('Filter menu items', 'Cari menu')}
                    className="w-full min-h-[38px] pl-8 pr-7 py-1.5 rounded-lg text-xs bg-[#f1f3f8] dark:bg-[#181a20] border border-[#d8dce6] dark:border-[#262932] text-[#111318] dark:text-[#f1f3f8] placeholder:text-[#44474f] dark:placeholder:text-[#9ca3af]"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      aria-label={t('Clear search', 'Hapus pencarian')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-[#44474f] dark:text-[#9ca3af] cursor-pointer"
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>
              </div>

              {/* Catalog Grid with Complete UI States (R-27: Loading, Error, Empty, Live) */}
              {uiSimState === 'loading' ? (
                <div className="grid grid-cols-2 gap-2.5 py-2" aria-busy="true">
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <div
                      key={n}
                      className="h-28 rounded-xl border border-[#d8dce6] dark:border-[#262932] bg-[#f1f3f8] dark:bg-[#181a20] p-3 flex flex-col justify-between animate-pulse"
                    >
                      <div className="h-3 w-16 rounded bg-[#d8dce6] dark:bg-[#262932]" />
                      <div className="h-4 w-28 rounded bg-[#d8dce6] dark:bg-[#262932]" />
                      <div className="h-3 w-20 rounded bg-[#d8dce6] dark:bg-[#262932]" />
                    </div>
                  ))}
                </div>
              ) : uiSimState === 'error' ? (
                <div className="p-6 rounded-xl border border-[#b3261e] dark:border-[#ffb4ab]/40 bg-[#b3261e]/5 dark:bg-[#ffb4ab]/10 text-center space-y-3">
                  <AlertTriangle size={24} className="mx-auto text-[#b3261e] dark:text-[#ffb4ab]" />
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm text-[#111318] dark:text-[#f1f3f8]">
                      {t('Local Database Sync Interrupted', 'Sinkronisasi Basis Data Lokal Terputus')}
                    </h3>
                    <p className="text-xs text-[#44474f] dark:text-[#9ca3af]">
                      {t(
                        'Simulated error state: Unable to read ./data/products.json on port 3060.',
                        'Simulasi status galat: Tidak dapat membaca ./data/products.json pada port 3060.'
                      )}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setUiSimState('live')}
                    className="min-h-[38px] px-4 py-1.5 rounded-lg text-xs font-bold bg-[#005ac1] text-white dark:bg-[#a8c7fa] dark:text-[#001a41] cursor-pointer"
                  >
                    {t('Reconnect Local Store DB', 'Hubungkan Ulang DB Lokal')}
                  </button>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="p-8 rounded-xl border border-dashed border-[#d8dce6] dark:border-[#262932] text-center space-y-3">
                  <p className="font-bold text-sm text-[#111318] dark:text-[#f1f3f8]">
                    {t('No matching menu items found', 'Tidak ada produk menu yang cocok')}
                  </p>
                  <p className="text-xs text-[#44474f] dark:text-[#9ca3af]">
                    {t(
                      'Try clearing the search filter or restoring the live catalog dataset.',
                      'Coba hapus kata kunci pencarian atau kembalikan data katalog aktif.'
                    )}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setCategory('All');
                      setUiSimState('live');
                    }}
                    className="min-h-[38px] px-4 py-1.5 rounded-lg text-xs font-bold bg-[#005ac1] text-white dark:bg-[#a8c7fa] dark:text-[#001a41] cursor-pointer"
                  >
                    {t('Reset Catalog Filter', 'Reset Filter Katalog')}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {filteredProducts.map((prod) => {
                    const inCart = cart.find((c) => c.id === prod.id);
                    const isLow = prod.stock <= prod.minStock && prod.stock > 0;
                    const isOut = prod.stock <= 0;

                    return (
                      <button
                        key={prod.id}
                        type="button"
                        disabled={isOut}
                        onClick={() => handleAddToCart(prod.id)}
                        className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between gap-2 cursor-pointer relative ${
                          isOut
                            ? 'opacity-50 cursor-not-allowed border-[#d8dce6] dark:border-[#262932]'
                            : inCart
                            ? 'border-[#005ac1] dark:border-[#a8c7fa] bg-[#d8e2ff]/25 dark:bg-[#004881]/25'
                            : 'border-[#d8dce6] dark:border-[#262932] bg-[#f1f3f8] dark:bg-[#181a20] hover:border-[#005ac1] dark:hover:border-[#a8c7fa]'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1 w-full font-mono text-xs">
                          <span className="px-1.5 py-0.5 rounded bg-[#fdfcff] dark:bg-[#111318] text-[#44474f] dark:text-[#9ca3af] font-bold">
                            {prod.sku}
                          </span>
                          <span
                            className={`font-bold ${
                              isOut
                                ? 'text-[#b3261e] dark:text-[#ffb4ab]'
                                : isLow
                                ? 'text-amber-600 dark:text-amber-400'
                                : 'text-[#44474f] dark:text-[#9ca3af]'
                            }`}
                          >
                            {isOut
                              ? t('SOLD OUT', 'HABIS')
                              : `${prod.stock} ${t('left', 'stok')}`}
                          </span>
                        </div>

                        <div>
                          <div className="font-bold text-sm text-[#111318] dark:text-[#f1f3f8]">
                            {prod.name}
                          </div>
                          <div className="text-xs text-[#44474f] dark:text-[#9ca3af]">
                            HPP: Rp {formatRp(prod.cost)}
                          </div>
                        </div>

                        <div className="pt-2 border-t border-[#d8dce6] dark:border-[#262932] flex items-center justify-between w-full font-mono">
                          <span className="text-xs font-extrabold text-[#111318] dark:text-[#f1f3f8]">
                            Rp {formatRp(prod.price)}
                          </span>
                          <span className="text-xs font-bold text-[#005ac1] dark:text-[#a8c7fa]">
                            {inCart ? `${inCart.qty} in ticket` : '+ Add'}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Live BOM Raw Materials Deduction Box */}
            <div className="rounded-2xl border border-[#d8dce6] dark:border-[#262932] bg-[#fdfcff] dark:bg-[#111318] p-4 space-y-3">
              <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#d8dce6] dark:border-[#262932]">
                <div className="flex items-center gap-2">
                  <FlaskConical size={15} className="text-[#005ac1] dark:text-[#a8c7fa]" />
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#111318] dark:text-[#f1f3f8]">
                    {t('Live BOM Ingredient Deduction', 'Potongan Bahan Baku Resep (BOM)')}
                  </h3>
                </div>
                <span className="font-mono text-xs text-[#44474f] dark:text-[#9ca3af]">
                  ./data/recipes.json
                </span>
              </div>

              {bomDeductions.length === 0 ? (
                <p className="text-xs text-[#44474f] dark:text-[#9ca3af] py-2">
                  {t(
                    'Add menu items to inspect automatic gram/ml raw material deductions.',
                    'Tambahkan menu ke tiket untuk melihat kalkulasi pemotongan bahan baku otomatis.'
                  )}
                </p>
              ) : (
                <div className="space-y-1.5 font-mono text-xs">
                  {bomDeductions.map((mat) => (
                    <div
                      key={mat.id}
                      className="flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-[#f1f3f8] dark:bg-[#181a20]"
                    >
                      <span className="font-semibold text-[#111318] dark:text-[#f1f3f8]">
                        {mat.name}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="text-[#b3261e] dark:text-[#ffb4ab] font-bold">
                          -{mat.requiredQty}
                          {mat.unit}
                        </span>
                        <span className="text-xs text-[#44474f] dark:text-[#9ca3af]">
                          ({mat.stock}
                          {mat.unit} &rarr; {mat.remainingStock}
                          {mat.unit})
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* COLUMN 2 (4 cols): Active Order Ticket & Tender Controls */}
          <div className="lg:col-span-4 rounded-2xl border border-[#d8dce6] dark:border-[#262932] bg-[#fdfcff] dark:bg-[#111318] p-4 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#d8dce6] dark:border-[#262932]">
              <div className="flex items-center gap-2">
                <ShoppingCart size={16} className="text-[#005ac1] dark:text-[#a8c7fa]" />
                <h3 className="font-bold text-sm text-[#111318] dark:text-[#f1f3f8]">
                  {t('Active Cashier Ticket', 'Tiket Kasir Aktif')}
                </h3>
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-full bg-[#d8e2ff] text-[#001a41] dark:bg-[#004881] dark:text-[#d8e2ff]">
                  {detailedCart.reduce((s, i) => s + i.qty, 0)}
                </span>
              </div>

              {detailedCart.length > 0 && (
                <button
                  type="button"
                  onClick={() => setCart([])}
                  className="min-h-[44px] px-3 py-2 rounded-lg text-xs font-semibold text-[#b3261e] dark:text-[#ffb4ab] hover:bg-[#b3261e]/10 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Trash2 size={14} />
                  <span>{t('Clear', 'Kosongkan')}</span>
                </button>
              )}
            </div>

            {/* Cart Items List (with Empty State) */}
            {detailedCart.length === 0 ? (
              <div className="py-10 text-center space-y-2 border border-dashed border-[#d8dce6] dark:border-[#262932] rounded-xl">
                <ShoppingCart size={24} className="mx-auto text-[#44474f] dark:text-[#9ca3af]" />
                <p className="text-xs font-bold text-[#111318] dark:text-[#f1f3f8]">
                  {t('Ticket is currently empty', 'Tiket pesanan masih kosong')}
                </p>
                <p className="text-xs text-[#44474f] dark:text-[#9ca3af] px-4">
                  {t('Select any product on the left to populate the order.', 'Pilih menu di sebelah kiri untuk mulai membuat pesanan.')}
                </p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[240px] overflow-y-auto pr-1">
                {detailedCart.map((item) => (
                  <div
                    key={item.id}
                    className="p-2.5 rounded-xl border border-[#d8dce6] dark:border-[#262932] bg-[#f1f3f8] dark:bg-[#181a20] flex items-center justify-between gap-2"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-xs text-[#111318] dark:text-[#f1f3f8] truncate">
                        {item.name}
                      </div>
                      <div className="font-mono text-xs text-[#44474f] dark:text-[#9ca3af]">
                        Rp {formatRp(item.price)} (HPP: Rp {formatRp(item.cost)})
                      </div>
                    </div>

                    <div className="flex items-center gap-1 font-mono">
                      <button
                        type="button"
                        onClick={() => handleUpdateQty(item.id, -1)}
                        aria-label={`Decrease ${item.name}`}
                        className="min-w-[40px] min-h-[40px] sm:min-w-[32px] sm:min-h-[32px] rounded-lg border border-[#d8dce6] dark:border-[#262932] bg-[#fdfcff] dark:bg-[#111318] flex items-center justify-center cursor-pointer transition-colors hover:border-[#005ac1] dark:hover:border-[#a8c7fa]"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="w-6 text-center text-xs font-bold">{item.qty}</span>
                      <button
                        type="button"
                        onClick={() => handleUpdateQty(item.id, 1)}
                        aria-label={`Increase ${item.name}`}
                        className="min-w-[40px] min-h-[40px] sm:min-w-[32px] sm:min-h-[32px] rounded-lg border border-[#d8dce6] dark:border-[#262932] bg-[#fdfcff] dark:bg-[#111318] flex items-center justify-center cursor-pointer transition-colors hover:border-[#005ac1] dark:hover:border-[#a8c7fa]"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Payment Method & Promo Discount Selector */}
            <div className="space-y-3 pt-2 border-t border-[#d8dce6] dark:border-[#262932]">
              <div className="space-y-1.5">
                <span className="block font-mono text-xs font-bold uppercase text-[#44474f] dark:text-[#9ca3af]">
                  {t('Payment Method', 'Metode Pembayaran')}
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('QRIS')}
                    className={`min-h-[48px] py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 border cursor-pointer transition-colors ${
                      paymentMethod === 'QRIS'
                        ? 'bg-[#005ac1] text-white border-[#005ac1] dark:bg-[#a8c7fa] dark:text-[#001a41] dark:border-[#a8c7fa]'
                        : 'bg-[#f1f3f8] dark:bg-[#181a20] border-[#d8dce6] dark:border-[#262932] text-[#111318] dark:text-[#f1f3f8]'
                    }`}
                  >
                    <QrCode size={16} />
                    <span>QRIS Digital</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Cash')}
                    className={`min-h-[48px] py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 border cursor-pointer transition-colors ${
                      paymentMethod === 'Cash'
                        ? 'bg-[#005ac1] text-white border-[#005ac1] dark:bg-[#a8c7fa] dark:text-[#001a41] dark:border-[#a8c7fa]'
                        : 'bg-[#f1f3f8] dark:bg-[#181a20] border-[#d8dce6] dark:border-[#262932] text-[#111318] dark:text-[#f1f3f8]'
                    }`}
                  >
                    <Banknote size={16} />
                    <span>{t('Cash Tender', 'Tunai Kasir')}</span>
                  </button>
                </div>
              </div>

              {paymentMethod === 'Cash' && (
                <div className="space-y-1.5">
                  <span className="block font-mono text-xs font-bold uppercase text-[#44474f] dark:text-[#9ca3af]">
                    {t('Quick Cash Denomination', 'Nominal Uang Tunai Diterima')}
                  </span>
                  <div className="grid grid-cols-3 gap-1.5 font-mono text-xs">
                    {[50000, 100000, 200000].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setCashTendered(amt)}
                        className={`min-h-[44px] py-2 rounded-lg border font-bold cursor-pointer transition-colors ${
                          cashTendered === amt
                            ? 'border-[#005ac1] dark:border-[#a8c7fa] bg-[#d8e2ff]/40 dark:bg-[#004881]/40'
                            : 'border-[#d8dce6] dark:border-[#262932] bg-[#f1f3f8] dark:bg-[#181a20]'
                        }`}
                      >
                        Rp {formatRp(amt)}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <span className="block font-mono text-xs font-bold uppercase text-[#44474f] dark:text-[#9ca3af]">
                  {t('Promo Discount Preset', 'Pilihan Diskon Promo')}
                </span>
                <div className="grid grid-cols-4 gap-1.5 font-mono text-xs">
                  {[0, 5, 10, 15].map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => setDiscountPct(pct)}
                      className={`min-h-[44px] py-2 rounded-lg border font-bold cursor-pointer transition-colors flex items-center justify-center ${
                        discountPct === pct
                          ? 'bg-[#005ac1] text-white border-[#005ac1] dark:bg-[#a8c7fa] dark:text-[#001a41]'
                          : 'bg-[#f1f3f8] dark:bg-[#181a20] border-[#d8dce6] dark:border-[#262932] text-[#111318] dark:text-[#f1f3f8]'
                      }`}
                    >
                      {pct === 0 ? t('None', '0%') : `${pct}%`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Financial Breakdown */}
              <div className="p-3 rounded-xl bg-[#f1f3f8] dark:bg-[#181a20] border border-[#d8dce6] dark:border-[#262932] space-y-1.5 font-mono text-xs">
                <div className="flex justify-between text-[#44474f] dark:text-[#9ca3af]">
                  <span>Subtotal</span>
                  <span>Rp {formatRp(totals.subtotal)}</span>
                </div>
                {totals.discountAmount > 0 && (
                  <div className="flex justify-between text-[#b3261e] dark:text-[#ffb4ab]">
                    <span>Discount ({discountPct}%)</span>
                    <span>-Rp {formatRp(totals.discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#44474f] dark:text-[#9ca3af]">
                  <span>{t('Total BOM COGS (HPP)', 'Total Modal HPP')}</span>
                  <span>Rp {formatRp(totals.totalHpp)}</span>
                </div>
                <div className="flex justify-between text-[#146c43] dark:text-[#75d59e] font-bold">
                  <span>{t('Estimated Gross Profit', 'Estimasi Laba Kotor')}</span>
                  <span>
                    Rp {formatRp(totals.grossProfit)} ({totals.marginPct}%)
                  </span>
                </div>
                <div className="pt-2 border-t border-[#d8dce6] dark:border-[#262932] flex justify-between text-sm font-extrabold text-[#111318] dark:text-[#f1f3f8]">
                  <span>{t('Total Due', 'Total Bayar')}</span>
                  <span>Rp {formatRp(totals.finalTotal)}</span>
                </div>
              </div>

              <button
                type="button"
                disabled={detailedCart.length === 0}
                onClick={handleCompleteSale}
                className="w-full min-h-[48px] py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-[#005ac1] hover:bg-[#00489e] disabled:opacity-40 text-white dark:bg-[#a8c7fa] dark:hover:bg-[#8ab4f8] dark:text-[#001a41] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer size={16} />
                <span>
                  {t('Complete Demo Sale & Print 80mm Receipt', 'Selesaikan Transaksi & Cetak Struk 80mm')}
                </span>
              </button>
            </div>
          </div>

          {/* COLUMN 3 (3 cols): Live 80mm Thermal Receipt + Auto-Posted Journal Entry */}
          <div className="lg:col-span-3 space-y-4">
            {/* 80mm Thermal Paper Artifact */}
            <div
              key={activeReceipt.orderId}
              className="rounded-xl border border-[#d8dce6] dark:border-[#262932] bg-[#fdfcff] text-[#111318] p-4 font-mono text-xs shadow-lg space-y-3 animate-receipt-print"
            >
              <div className="text-center border-b border-dashed border-[#9ca3af] pb-2.5 space-y-0.5">
                <div className="font-extrabold text-sm tracking-tight">UNICAT POS TERMINAL</div>
                <div className="text-xs text-[#44474f]">80MM ESC/POS THERMAL OUTPUT</div>
                <div className="text-xs text-[#44474f]">
                  {activeReceipt.orderId} // {activeReceipt.timestamp}
                </div>
              </div>

              {activeReceipt.items.length === 0 ? (
                <div className="py-6 text-center text-xs text-[#44474f]">
                  {t('Waiting for items...', 'Menunggu item pesanan...')}
                </div>
              ) : (
                <div className="space-y-1.5 border-b border-dashed border-[#9ca3af] pb-2.5">
                  {activeReceipt.items.map((it) => (
                    <div key={it.id} className="flex justify-between gap-2 text-xs">
                      <span className="truncate">
                        {it.qty}x {it.name}
                      </span>
                      <span className="font-bold shrink-0">Rp {formatRp(it.lineSubtotal)}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="space-y-1 text-xs border-b border-dashed border-[#9ca3af] pb-2.5">
                <div className="flex justify-between">
                  <span>SUBTOTAL</span>
                  <span>Rp {formatRp(activeReceipt.subtotal)}</span>
                </div>
                {activeReceipt.discountAmount > 0 && (
                  <div className="flex justify-between text-[#b3261e]">
                    <span>DISC ({activeReceipt.discountPct}%)</span>
                    <span>-Rp {formatRp(activeReceipt.discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between font-extrabold text-xs pt-1">
                  <span>TOTAL ({activeReceipt.paymentMethod})</span>
                  <span>Rp {formatRp(activeReceipt.finalTotal)}</span>
                </div>
                {activeReceipt.paymentMethod === 'Cash' && (
                  <div className="flex justify-between text-xs text-[#44474f]">
                    <span>CHANGE DUE</span>
                    <span>Rp {formatRp(activeReceipt.changeDue)}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-xs text-[#146c43] font-bold">
                <span className="flex items-center gap-1">
                  <CheckCircle2 size={12} />
                  <span>
                    {lastCompletedOrder
                      ? t('STOCK & JOURNAL POSTED', 'STOK & JURNAL TERCATAT')
                      : t('LIVE RECEIPT PREVIEW', 'PRATINJAU STRUK AKTIF')}
                  </span>
                </span>
                <span>ESC/POS OK</span>
              </div>
            </div>

            {/* Auto-Generated Double-Entry Journal Entry Preview */}
            <div className="rounded-xl border border-[#d8dce6] dark:border-[#262932] bg-[#fdfcff] dark:bg-[#111318] p-3.5 space-y-2.5 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-[#d8dce6] dark:border-[#262932] pb-2">
                <span className="font-bold text-[#005ac1] dark:text-[#a8c7fa] flex items-center gap-1.5">
                  <BookOpen size={13} />
                  <span>{t('Auto-Posted Jurnal Umum', 'Jurnal Umum Otomatis')}</span>
                </span>
                <span className="text-xs text-[#146c43] dark:text-[#75d59e] font-bold">
                  DEBIT = CREDIT
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[#111318] dark:text-[#f1f3f8]">
                    1101 {activeReceipt.paymentMethod} Asset (Dr)
                  </span>
                  <span className="font-bold text-[#111318] dark:text-[#f1f3f8]">
                    Rp {formatRp(activeReceipt.finalTotal)}
                  </span>
                </div>
                <div className="flex justify-between pl-3 text-[#44474f] dark:text-[#9ca3af]">
                  <span>4101 Sales Revenue (Cr)</span>
                  <span>Rp {formatRp(activeReceipt.finalTotal)}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-dashed border-[#d8dce6] dark:border-[#262932]">
                  <span className="text-[#111318] dark:text-[#f1f3f8]">5101 COGS / HPP (Dr)</span>
                  <span className="font-bold text-[#b3261e] dark:text-[#ffb4ab]">
                    Rp {formatRp(activeReceipt.totalHpp)}
                  </span>
                </div>
                <div className="flex justify-between pl-3 text-[#44474f] dark:text-[#9ca3af]">
                  <span>1104 Raw Inventory (Cr)</span>
                  <span>Rp {formatRp(activeReceipt.totalHpp)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
