// Fictional sample dataset for Unicat Artisan Cafe & Roastery demo

export const INITIAL_RAW_MATERIALS = [
  { id: 'mat-arabica', name: 'Arabica House Blend', nameEn: 'Arabica House Blend', unit: 'g', stock: 1200, costPerUnit: 150 },
  { id: 'mat-milk', name: 'Fresh Barista Milk', nameEn: 'Fresh Barista Milk', unit: 'ml', stock: 2400, costPerUnit: 25 },
  { id: 'mat-caramel', name: 'Artisan Caramel Syrup', nameEn: 'Artisan Caramel Syrup', unit: 'ml', stock: 680, costPerUnit: 120 },
  { id: 'mat-matcha', name: 'Ceremonial Matcha Powder', nameEn: 'Ceremonial Matcha Powder', unit: 'g', stock: 420, costPerUnit: 200 },
  { id: 'mat-cup', name: 'Eco Paper Cup & Lid', nameEn: 'Eco Paper Cup & Lid', unit: 'pcs', stock: 165, costPerUnit: 850 },
  { id: 'mat-croissant', name: 'Pre-baked Butter Croissant', nameEn: 'Pre-baked Butter Croissant', unit: 'pcs', stock: 32, costPerUnit: 9000 },
  { id: 'mat-cinnamon', name: 'Artisan Cinnamon Roll', nameEn: 'Artisan Cinnamon Roll', unit: 'pcs', stock: 28, costPerUnit: 10000 },
  { id: 'mat-brownie', name: 'Chocolate Fudge Brownie', nameEn: 'Chocolate Fudge Brownie', unit: 'pcs', stock: 24, costPerUnit: 8000 }
];

export const DEMO_PRODUCTS = [
  {
    id: 'prod-latte',
    name: 'Velvet Caffe Latte',
    nameEn: 'Velvet Caffe Latte',
    category: 'Coffee',
    price: 28000,
    cost: 7500,
    stock: 45,
    minStock: 5,
    sku: 'COF-01',
    bom: [
      { materialId: 'mat-arabica', qty: 18, label: '18g Arabica Beans' },
      { materialId: 'mat-milk', qty: 180, label: '180ml Fresh Milk' },
      { materialId: 'mat-cup', qty: 1, label: '1 pcs Eco Cup' }
    ]
  },
  {
    id: 'prod-macchiato',
    name: 'Iced Caramel Macchiato',
    nameEn: 'Iced Caramel Macchiato',
    category: 'Coffee',
    price: 32000,
    cost: 9000,
    stock: 40,
    minStock: 5,
    sku: 'COF-02',
    bom: [
      { materialId: 'mat-arabica', qty: 18, label: '18g Arabica Beans' },
      { materialId: 'mat-milk', qty: 160, label: '160ml Fresh Milk' },
      { materialId: 'mat-caramel', qty: 20, label: '20ml Caramel Syrup' },
      { materialId: 'mat-cup', qty: 1, label: '1 pcs Eco Cup' }
    ]
  },
  {
    id: 'prod-espresso',
    name: 'Signature Espresso',
    nameEn: 'Signature Espresso',
    category: 'Coffee',
    price: 18000,
    cost: 4500,
    stock: 60,
    minStock: 5,
    sku: 'COF-03',
    bom: [
      { materialId: 'mat-arabica', qty: 18, label: '18g Arabica Beans' },
      { materialId: 'mat-cup', qty: 1, label: '1 pcs Eco Cup' }
    ]
  },
  {
    id: 'prod-matcha',
    name: 'Kyoto Matcha Latte',
    nameEn: 'Kyoto Matcha Latte',
    category: 'Tea',
    price: 30000,
    cost: 8000,
    stock: 35,
    minStock: 5,
    sku: 'TEA-01',
    bom: [
      { materialId: 'mat-matcha', qty: 15, label: '15g Ceremonial Matcha' },
      { materialId: 'mat-milk', qty: 180, label: '180ml Fresh Milk' },
      { materialId: 'mat-cup', qty: 1, label: '1 pcs Eco Cup' }
    ]
  },
  {
    id: 'prod-croissant',
    name: 'Butter Croissant',
    nameEn: 'Butter Croissant',
    category: 'Pastry',
    price: 24000,
    cost: 9000,
    stock: 32,
    minStock: 5,
    sku: 'PAS-01',
    bom: [
      { materialId: 'mat-croissant', qty: 1, label: '1 pcs Pre-baked Croissant' }
    ]
  },
  {
    id: 'prod-cinnamon',
    name: 'Artisan Cinnamon Roll',
    nameEn: 'Artisan Cinnamon Roll',
    category: 'Pastry',
    price: 26000,
    cost: 10000,
    stock: 28,
    minStock: 5,
    sku: 'PAS-02',
    bom: [
      { materialId: 'mat-cinnamon', qty: 1, label: '1 pcs Artisan Roll' }
    ]
  },
  {
    id: 'prod-brownie',
    name: 'Chocolate Fudge Brownie',
    nameEn: 'Chocolate Fudge Brownie',
    category: 'Pastry',
    price: 22000,
    cost: 8000,
    stock: 24,
    minStock: 5,
    sku: 'PAS-03',
    bom: [
      { materialId: 'mat-brownie', qty: 1, label: '1 pcs Fudge Brownie' }
    ]
  }
];

export const SCREENSHOT_CHAPTERS = [
  {
    id: 'cashier',
    index: '01',
    tabLabelEn: 'Cashier POS',
    tabLabelId: 'Kasir POS',
    titleEn: 'Dual-Layout Cashier Terminal with Real-Time Stock Lock',
    titleId: 'Terminal Kasir Dual-Layout dengan Kunci Stok Otomatis',
    descEn: 'Switch between Standard and Large tile density, filter by category, and prevent overselling before checkout. Cart quantities automatically cap at available inventory.',
    descId: 'Beralih antara tampilan Standar dan Besar, saring per kategori, dan cegah penjualan melebihi stok. Jumlah di keranjang otomatis terkunci sesuai sisa inventori.',
    darkImg: '/screenshots/cashier-dark.png',
    lightImg: '/screenshots/cashier-light.png',
    mobileDarkImg: '/screenshots/mobile-pos-dark.png',
    mobileLightImg: '/screenshots/mobile-pos-light.png',
    specs: [
      { labelEn: 'Cart Protection', labelId: 'Proteksi Keranjang', value: 'Hard Stock Cap' },
      { labelEn: 'Layout Modes', labelId: 'Mode Tata Letak', value: 'Compact / Large Grid' },
      { labelEn: 'LAN Sync', labelId: 'Sinkronisasi LAN', value: '0.0.0.0:3060' }
    ],
    hotspots: [
      {
        x: 28,
        y: 34,
        titleEn: 'Live Inventory Badges',
        titleId: 'Indikator Stok Langsung',
        detailEn: 'Each product card displays remaining stock and highlights low-stock items using Material 3 alert tokens.',
        detailId: 'Setiap kartu menu menampilkan sisa stok secara langsung dan menandai item yang hampir habis.'
      },
      {
        x: 78,
        y: 48,
        titleEn: 'Active Ticket & Quick Qty',
        titleId: 'Tiket Aktif & Kuantitas Cepat',
        detailEn: 'Single-tap quantity controls with instant Rupiah subtotal calculation.',
        detailId: 'Kontrol kuantitas satu sentuhan dengan perhitungan subtotal Rupiah instan.'
      }
    ]
  },
  {
    id: 'checkout',
    index: '02',
    tabLabelEn: 'QRIS & Cash Checkout',
    tabLabelId: 'Pembayaran QRIS & Tunai',
    titleEn: 'Split-Second Tender Processing with Discount & Change Math',
    titleId: 'Proses Pembayaran Cepat dengan Diskon & Hitung Kembalian',
    descEn: 'Support QRIS digital payments and Cash tender with preset percentage discounts (5%, 10%, 15%), nominal Rupiah discounts, quick bill denominations, and automatic ESC/POS receipt trigger.',
    descId: 'Mendukung pembayaran QRIS maupun Tunai dengan pilihan diskon persentase (5%, 10%, 15%), potongan nominal Rupiah, pecahan uang cepat, serta cetak struk ESC/POS otomatis.',
    darkImg: '/screenshots/checkout-dark.png',
    lightImg: '/screenshots/checkout-light.png',
    mobileDarkImg: '/screenshots/mobile-pos-dark.png',
    mobileLightImg: '/screenshots/mobile-pos-light.png',
    specs: [
      { labelEn: 'Payment Methods', labelId: 'Metode Bayar', value: 'QRIS / Cash Tender' },
      { labelEn: 'Discounts', labelId: 'Mode Diskon', value: '5% / 10% / 15% / Rp' },
      { labelEn: 'Drawer Trigger', labelId: 'Laci Kasir', value: 'RJ11 Kick Pulse' }
    ],
    hotspots: [
      {
        x: 50,
        y: 42,
        titleEn: 'QRIS & Cash Switcher',
        titleId: 'Pilihan QRIS & Tunai',
        detailEn: 'Defaults to QRIS for fast digital settlement or switches to Cash with exact change calculation.',
        detailId: 'Default ke QRIS untuk transaksi digital cepat atau beralih ke Tunai dengan kalkulator kembalian.'
      },
      {
        x: 52,
        y: 68,
        titleEn: 'Flexible Discount Engine',
        titleId: 'Mesin Diskon Fleksibel',
        detailEn: 'Apply percentage or custom Rupiah discounts that are recorded directly into the sales ledger.',
        detailId: 'Terapkan diskon persen atau nominal Rupiah yang langsung tercatat ke jurnal penjualan.'
      }
    ]
  },
  {
    id: 'dashboard',
    index: '03',
    tabLabelEn: 'Sales Analytics',
    tabLabelId: 'Analitik Penjualan',
    titleEn: '24-Hour Peak Heatmaps, Donut Mix & Custom Timeframes',
    titleId: 'Grafik Jam Sibuk 24 Jam, Bauran Menu & Rentang Waktu Kustom',
    descEn: 'Analyze Revenue, COGS (HPP), Gross Profit, Operating Expenses, Net Profit, and Average Order Value across custom date ranges and hourly timeslots.',
    descId: 'Analisis Omset, HPP, Laba Kotor, Beban Operasional, Laba Bersih, dan Rata-rata Nilai Pesanan (AOV) pada rentang tanggal dan jam operasional pilihan Anda.',
    darkImg: '/screenshots/dashboard-dark.png',
    lightImg: '/screenshots/dashboard-light.png',
    mobileDarkImg: '/screenshots/mobile-dashboard-dark.png',
    mobileLightImg: '/screenshots/mobile-dashboard-light.png',
    specs: [
      { labelEn: 'Charts', labelId: 'Visualisasi', value: 'SVG Donut + 24h Bar' },
      { labelEn: 'Timeframe Picker', labelId: 'Filter Waktu', value: 'Date + Hour Slot' },
      { labelEn: 'Core Metrics', labelId: 'Metrik Utama', value: 'Revenue, HPP, Net, AOV' }
    ],
    hotspots: [
      {
        x: 35,
        y: 55,
        titleEn: 'Interactive Sales Mix Donut',
        titleId: 'Donut Bauran Penjualan',
        detailEn: 'Inspect product share by unit volume and revenue contribution.',
        detailId: 'Lihat kontribusi setiap produk berdasarkan volume unit dan nilai omset.'
      },
      {
        x: 72,
        y: 55,
        titleEn: 'Hourly Traffic Distribution',
        titleId: 'Distribusi Jam Sibuk',
        detailEn: 'Identify peak store hours to optimize staff scheduling and ingredient prep.',
        detailId: 'Identifikasi jam ramai toko untuk mengatur jadwal staf dan persiapan bahan.'
      }
    ]
  },
  {
    id: 'sales-log',
    index: '04',
    tabLabelEn: 'Transaction Log',
    tabLabelId: 'Riwayat Transaksi',
    titleEn: 'Auditable Sales Ledger with HPP Reveal & 1-Click Reprint',
    titleId: 'Buku Riwayat Transaksi dengan Tampilan HPP & Cetak Ulang Struk',
    descEn: 'Filter historical orders by payment method or timeframe, toggle per-item HPP cost and gross profit columns, edit transaction mistakes, export to CSV, or reprint thermal receipts.',
    descId: 'Saring riwayat pesanan berdasarkan metode bayar atau waktu, tampilkan kolom modal HPP dan laba kotor per transaksi, koreksi data, ekspor CSV, atau cetak ulang struk.',
    darkImg: '/screenshots/sales-log-dark.png',
    lightImg: '/screenshots/sales-log-light.png',
    mobileDarkImg: '/screenshots/mobile-pos-dark.png',
    mobileLightImg: '/screenshots/mobile-pos-light.png',
    specs: [
      { labelEn: 'Margin Audit', labelId: 'Audit Margin', value: 'Per-Row HPP Toggle' },
      { labelEn: 'Receipt Action', labelId: 'Aksi Struk', value: 'Historical Reprint' },
      { labelEn: 'Data Sync', labelId: 'Sinkronisasi Data', value: 'Auto CSV + JSON' }
    ],
    hotspots: [
      {
        x: 64,
        y: 26,
        titleEn: 'Show/Hide Profit & HPP Toggle',
        titleId: 'Tombol Tampilkan Laba & HPP',
        detailEn: 'Reveal unit COGS and gross profit margin on every historical line item.',
        detailId: 'Tampilkan modal HPP dan laba kotor pada setiap baris transaksi.'
      },
      {
        x: 86,
        y: 52,
        titleEn: 'Instant Receipt Reprint',
        titleId: 'Cetak Ulang Struk Instan',
        detailEn: 'Re-send any past order to your USB, Serial, or Bluetooth thermal printer.',
        detailId: 'Cetak ulang struk transaksi lama ke printer thermal USB, Serial, atau Bluetooth.'
      }
    ]
  },
  {
    id: 'financials-pnl',
    index: '05',
    tabLabelEn: 'Journal & P&L',
    tabLabelId: 'Jurnal & Laba Rugi',
    titleEn: 'Automated Double-Entry General Journal & Profit/Loss Statement',
    titleId: 'Jurnal Umum Double-Entry & Laporan Laba Rugi Otomatis',
    descEn: 'Every sale, COGS deduction, and operational expense automatically generates balanced debit/credit rows in Jurnal Umum and updates Laporan Laba Rugi in real time.',
    descId: 'Setiap penjualan, pemotongan HPP, dan pengeluaran operasional otomatis membentuk baris debit/kredit seimbang di Jurnal Umum serta memperbarui Laporan Laba Rugi.',
    darkImg: '/screenshots/financials-pnl-dark.png',
    lightImg: '/screenshots/financials-pnl-light.png',
    mobileDarkImg: '/screenshots/mobile-dashboard-dark.png',
    mobileLightImg: '/screenshots/mobile-dashboard-light.png',
    specs: [
      { labelEn: 'Accounting Standard', labelId: 'Standar Akuntansi', value: 'Double-Entry (Debit = Credit)' },
      { labelEn: 'Statements', labelId: 'Laporan', value: 'Jurnal, Laba Rugi, Neraca, Arus Kas' },
      { labelEn: 'Export Format', labelId: 'Format Ekspor', value: 'Native PDF-1.4 / PNG / CSV' }
    ],
    hotspots: [
      {
        x: 34,
        y: 36,
        titleEn: 'Statement Segmented Switcher',
        titleId: 'Pemilih Laporan Keuangan',
        detailEn: 'Switch between Expenses, General Journal, Profit & Loss, Balance Sheet, Cash Flow, and All-Months Matrix.',
        detailId: 'Beralih antar Beban, Jurnal Umum, Laba Rugi, Neraca, Arus Kas, dan Rekap Semua Bulan.'
      },
      {
        x: 78,
        y: 20,
        titleEn: 'Executive Mentor Report Card',
        titleId: 'Kartu Laporan Mentor Eksekutif',
        detailEn: 'Generate formatted executive financial sheets in binary PDF-1.4 or high-DPI images.',
        detailId: 'Buat lembar laporan eksekutif dalam format PDF-1.4 murni atau gambar resolusi tinggi.'
      }
    ]
  },
  {
    id: 'financials-balance',
    index: '06',
    tabLabelEn: 'Balance Sheet & Reimburse',
    tabLabelId: 'Neraca & Reimburse',
    titleEn: 'Balance Sheet Equation Verifier & Partner Expense Reimbursements',
    titleId: 'Verifikasi Persamaan Neraca & Reimburse Talangan Mitra',
    descEn: 'Track operational expenses paid via personal partner funds (Christian, Felix, Jowie) versus store cash, roll over unpaid liabilities across months, and verify Assets = Liabilities + Equity.',
    descId: 'Lacak pengeluaran operasional yang ditalangi dana pribadi mitra dibanding kas toko, pantau akumulasi hutang talangan lintas bulan, dan pastikan Aset = Liabilitas + Ekuitas.',
    darkImg: '/screenshots/financials-balance-dark.png',
    lightImg: '/screenshots/financials-balance-light.png',
    mobileDarkImg: '/screenshots/mobile-dashboard-dark.png',
    mobileLightImg: '/screenshots/mobile-dashboard-light.png',
    specs: [
      { labelEn: 'Funding Sources', labelId: 'Sumber Dana', value: 'Personal Cash vs Store Cash' },
      { labelEn: 'Debt Rollover', labelId: 'Rollover Hutang', value: 'Multi-Month Liability Tracking' },
      { labelEn: 'Balance Check', labelId: 'Cek Keseimbangan', value: 'Assets = Liabilities + Equity' }
    ],
    hotspots: [
      {
        x: 30,
        y: 62,
        titleEn: 'Partner Reimbursement Ledger',
        titleId: 'Buku Reimburse Mitra',
        detailEn: 'Audit out-of-pocket purchases by team member and settle reimbursements from store profits in one batch.',
        detailId: 'Audit pembelian talangan per anggota tim dan selesaikan reimburse dari laba toko sekaligus.'
      },
      {
        x: 74,
        y: 52,
        titleEn: 'Live Inventory Valuation',
        titleId: 'Valuasi Inventori Otomatis',
        detailEn: 'Automatically values unsold catalog stock (Stock * Unit Cost) as a current asset on the Balance Sheet.',
        detailId: 'Menghitung nilai stok barang dagang secara otomatis sebagai aset lancar di Neraca.'
      }
    ]
  },
  {
    id: 'recipes-bom',
    index: '07',
    tabLabelEn: 'BOM & Recipes',
    tabLabelId: 'Resep & HPP (BOM)',
    titleEn: 'Raw Material Formulation & Automatic Menu HPP Engine',
    titleId: 'Formulasi Bahan Baku & Kalkulator HPP Menu Otomatis',
    descEn: 'Define raw materials by gram, milliliter, shot, or piece. Link ingredient quantities to menu items so product COGS (HPP) updates automatically whenever raw material prices change.',
    descId: 'Catat bahan baku dalam satuan gram, mililiter, shot, atau pcs. Hubungkan takaran resep ke menu sehingga HPP produk otomatis diperbarui saat harga bahan berubah.',
    darkImg: '/screenshots/recipes-bom-dark.png',
    lightImg: '/screenshots/recipes-bom-light.png',
    mobileDarkImg: '/screenshots/mobile-pos-dark.png',
    mobileLightImg: '/screenshots/mobile-pos-light.png',
    specs: [
      { labelEn: 'Supported Units', labelId: 'Satuan Takaran', value: 'g, ml, kg, L, shot, pcs, pump' },
      { labelEn: 'Cost Engine', labelId: 'Mesin HPP', value: 'Auto BOM Cost Rollup' },
      { labelEn: 'Stock Deduction', labelId: 'Potong Stok', value: 'Automatic on Sale' }
    ],
    hotspots: [
      {
        x: 32,
        y: 48,
        titleEn: 'Raw Material Stock & Unit Cost',
        titleId: 'Stok & Biaya Satuan Bahan Baku',
        detailEn: 'Track exact gram/ml costs (e.g., Bubuk Apel at Rp 75/g, Mint Syrup at Rp 112/ml).',
        detailId: 'Pantau biaya presisi per gram/ml (misal Bubuk Apel Rp 75/g, Mint Syrup Rp 112/ml).'
      },
      {
        x: 72,
        y: 52,
        titleEn: 'Recipe Bill of Materials Builder',
        titleId: 'Penyusun Komposisi Resep (BOM)',
        detailEn: 'Combine ingredients to compute exact unit HPP and gross margin percentage before setting menu prices.',
        detailId: 'Gabungkan bahan baku untuk menghitung HPP per porsi dan persentase margin sebelum menetapkan harga jual.'
      }
    ]
  },
  {
    id: 'ai-copilot',
    index: '08',
    tabLabelEn: 'Local AI & Admin',
    tabLabelId: 'AI Lokal & Admin',
    titleEn: 'Offline Ollama AI Store Copilot, Recall Points & Hardware Hub',
    titleId: 'Asisten Toko AI Ollama Lokal, Titik Pemulihan & Pusat Perangkat',
    descEn: 'Run local LLM models (qwen2.5 via Ollama on 127.0.0.1:11434) with zero cloud API fees. Ask financial questions, trigger restocks via chat, create disaster-recovery Recall Points, and pair ESC/POS printers.',
    descId: 'Jalankan model AI lokal (qwen2.5 via Ollama di 127.0.0.1:11434) tanpa biaya langganan cloud. Tanya ringkasan laba, tambah stok lewat chat, buat snapshot pemulihan data, dan hubungkan printer thermal.',
    darkImg: '/screenshots/ai-copilot-dark.png',
    lightImg: '/screenshots/ai-copilot-light.png',
    mobileDarkImg: '/screenshots/mobile-pos-dark.png',
    mobileLightImg: '/screenshots/mobile-pos-light.png',
    specs: [
      { labelEn: 'AI Runtime', labelId: 'Runtime AI', value: 'Local Ollama (127.0.0.1:11434)' },
      { labelEn: 'Disaster Recovery', labelId: 'Pemulihan Data', value: 'Automated & Manual Recall Points' },
      { labelEn: 'Printer Stack', labelId: 'Koneksi Printer', value: 'WebUSB / WebSerial / BLE' }
    ],
    hotspots: [
      {
        x: 52,
        y: 44,
        titleEn: 'Actionable POS AI Agent',
        titleId: 'Agen AI POS Eksekusional',
        detailEn: 'Streams financial tables via SSE and executes real store actions such as restocking items or opening reports.',
        detailId: 'Menampilkan tabel analisis keuangan secara real-time dan mengeksekusi aksi toko seperti restock menu.'
      },
      {
        x: 24,
        y: 22,
        titleEn: 'Unified Admin Control Bar',
        titleId: 'Bar Kontrol Admin Terpadu',
        detailEn: 'Manage Catalog, BOM Recipes, Local AI, Recall Point Snapshots, Thermal Printers, and Store Branding in one panel.',
        detailId: 'Kelola Katalog, Resep BOM, AI Lokal, Snapshot Pemulihan, Printer Thermal, dan Profil Toko dalam satu panel.'
      }
    ]
  }
];

export const ACCOUNTING_LEDGER_DATA = {
  periodLabelEn: 'October 2026 Store Ledger (Sample Period)',
  periodLabelId: 'Buku Besar Toko Oktober 2026 (Periode Sampel)',
  summary: {
    grossRevenue: 6450000,
    totalCogs: 2180000,
    grossProfit: 4270000,
    operatingExpenses: 890000,
    netProfit: 3380000,
    netMarginPct: '52.4%',
    totalOrders: 185,
    qrisShare: 4850000,
    cashShare: 1600000
  },
  journalEntries: [
    {
      id: 'JRN-1013-01',
      date: '2026-10-13 09:14',
      ref: 'ORD-261013-089',
      descEn: 'POS Sale (QRIS): 2x Velvet Caffe Latte, 1x Butter Croissant',
      descId: 'Penjualan POS (QRIS): 2x Velvet Caffe Latte, 1x Butter Croissant',
      lines: [
        { accountCode: '1102', accountEn: 'Bank / QRIS Settlement', accountId: 'Kas Bank / QRIS', debit: 80000, credit: 0 },
        { accountCode: '4101', accountEn: 'F&B Sales Revenue', accountId: 'Pendapatan Penjualan', debit: 0, credit: 80000 },
        { accountCode: '5101', accountEn: 'Cost of Goods Sold (HPP)', accountId: 'Harga Pokok Penjualan (HPP)', debit: 24000, credit: 0 },
        { accountCode: '1104', accountEn: 'Raw Materials Inventory', accountId: 'Persediaan Bahan Baku', debit: 0, credit: 24000 }
      ]
    },
    {
      id: 'JRN-1012-04',
      date: '2026-10-12 16:40',
      ref: 'EXP-261012-014',
      descEn: 'Expense (Store Cash): 5kg Arabica House Blend Restock',
      descId: 'Beban (Kas Toko): Restock 5kg Biji Kopi Arabica House Blend',
      lines: [
        { accountCode: '1104', accountEn: 'Raw Materials Inventory', accountId: 'Persediaan Bahan Baku', debit: 750000, credit: 0 },
        { accountCode: '1101', accountEn: 'Petty Cash / Store Cash', accountId: 'Kas Toko / Kas Kecil', debit: 0, credit: 750000 }
      ]
    },
    {
      id: 'JRN-1012-09',
      date: '2026-10-12 20:05',
      ref: 'RMB-261012-003',
      descEn: 'Partner Advance Reimbursement Settlement from Operational Profits',
      descId: 'Pelunasan Dana Talangan Mitra dari Laba Operasional Toko',
      lines: [
        { accountCode: '2101', accountEn: 'Partner Advance Payable', accountId: 'Hutang Talangan Mitra', debit: 250000, credit: 0 },
        { accountCode: '1102', accountEn: 'Bank / QRIS Settlement', accountId: 'Kas Bank / QRIS', debit: 0, credit: 250000 }
      ]
    }
  ],
  pnlLines: [
    { sectionEn: 'Operating Revenue', sectionId: 'Pendapatan Operasional', items: [
      { labelEn: 'QRIS Digital Settlements', labelId: 'Penjualan QRIS Digital', amount: 4850000, type: 'revenue' },
      { labelEn: 'Cash Drawer Tender', labelId: 'Penjualan Kas Tunai', amount: 1600000, type: 'revenue' }
    ], totalLabelEn: 'Total Gross Revenue', totalLabelId: 'Total Omset Penjualan', total: 6450000 },
    { sectionEn: 'Cost of Goods Sold (HPP)', sectionId: 'Harga Pokok Penjualan (HPP)', items: [
      { labelEn: 'Specialty Coffee Beans & Barista Milk (BOM Deducted)', labelId: 'Biji Kopi & Susu Barista (Potong Resep BOM)', amount: -1280000, type: 'cost' },
      { labelEn: 'Pastry & Bakery Stock Inventory', labelId: 'Inventori Pastry & Roti Panggang', amount: -900000, type: 'cost' }
    ], totalLabelEn: 'Gross Profit (Laba Kotor)', totalLabelId: 'Laba Kotor (Gross Profit)', total: 4270000 },
    { sectionEn: 'Operating Expenses (OPEX)', sectionId: 'Beban Operasional Toko (OPEX)', items: [
      { labelEn: 'Ice Tube Delivery & Filtered Water Supply', labelId: 'Pasokan Es Kristal & Air Filtrasi', amount: -320000, type: 'expense' },
      { labelEn: 'Eco Cups, Paper Bags & Wooden Cutlery', labelId: 'Cup Kertas, Kantong Kertas & Alat Makan', amount: -360000, type: 'expense' },
      { labelEn: 'Barista Station Utility & Maintenance', labelId: 'Listrik & Kebersihan Barista Bar', amount: -210000, type: 'expense' }
    ], totalLabelEn: 'Net Operating Profit (Laba Bersih)', totalLabelId: 'Laba Bersih Operasional', total: 3380000 }
  ],
  balanceSheet: {
    assets: [
      { labelEn: 'Cash in Register & QRIS Settlement Balance', labelId: 'Kas Laci & Saldo QRIS Bank', amount: 5640000 },
      { labelEn: 'Unsold Beverage Ingredients & Bakery Inventory', labelId: 'Persediaan Bahan Minuman & Pastry', amount: 2850000 },
      { labelEn: 'Espresso Machine & Counter Fixtures', labelId: 'Mesin Espresso & Peralatan Kasir', amount: 3200000 }
    ],
    totalAssets: 11690000,
    liabilities: [
      { labelEn: 'Pending Partner Reimbursements', labelId: 'Hutang Talangan Mitra', amount: 250000 }
    ],
    equity: [
      { labelEn: 'Initial Founder Capital & Barista Setup', labelId: 'Modal Awal Pendiri & Peralatan Bar', amount: 8060000 },
      { labelEn: 'Current Period Retained Net Profit', labelId: 'Laba Ditahan Periode Berjalan', amount: 3380000 }
    ],
    totalLiabilitiesAndEquity: 11690000
  },
  cashFlow: [
    { categoryEn: 'Operating Cash Inflows (Sales)', categoryId: 'Arus Kas Masuk Operasional (Penjualan)', amount: 6450000, noteEn: '185 completed POS orders', noteId: '185 pesanan POS selesai' },
    { categoryEn: 'Direct Store Cash Purchases', categoryId: 'Pembelian Langsung Kas Toko', amount: -320000, noteEn: 'Daily ice tube & barista consumables', noteId: 'Es kristal harian & bahan barista' },
    { categoryEn: 'Settled Partner Reimbursements', categoryId: 'Pelunasan Reimburse Dana Talangan Mitra', amount: -250000, noteEn: 'Operational reimbursement payout', noteId: 'Pencairan reimburse operasional' },
    { categoryEn: 'Ending Net Cash Position', categoryId: 'Posisi Kas Bersih Akhir Periode', amount: 5880000, noteEn: 'Reconciled with physical drawer + QRIS', noteId: 'Terekonsiliasi dengan laci kas + QRIS' }
  ]
};

export const TECHNICAL_SPECS = [
  {
    code: 'ARCH-01',
    titleEn: 'Zero-Cloud Local File Database',
    titleId: 'Basis Data File Lokal Tanpa Cloud',
    metric: './data/*.json + .csv',
    descEn: 'All products, recipes, sales logs, and expense ledgers live directly on your machine in human-readable JSON with real-time background synchronization to CSV spreadsheets. Zero monthly SaaS fees and zero internet dependency.',
    descId: 'Seluruh data menu, resep, riwayat transaksi, dan buku beban tersimpan langsung di perangkat Anda dalam format JSON yang mudah dibaca, lengkap dengan sinkronisasi otomatis ke file CSV. Tanpa biaya langganan bulanan dan tetap berjalan tanpa internet.'
  },
  {
    code: 'ARCH-02',
    titleEn: 'ESC/POS Hardware Printer Engine',
    titleId: 'Mesin Cetak Struk Hardware ESC/POS',
    metric: 'WebUSB / Serial / BLE',
    descEn: 'Communicates directly with 58mm and 80mm thermal receipt printers over USB, COM Serial ports, or Bluetooth Low Energy, plus system print fallback, automatic paper cutter commands, and RJ11 cash drawer kick pulses.',
    descId: 'Terhubung langsung ke printer struk thermal 58mm dan 80mm melalui kabel USB, port COM Serial, atau Bluetooth hemat daya, dilengkapi perintah potong kertas otomatis serta pemicu buka laci kasir RJ11.'
  },
  {
    code: 'ARCH-03',
    titleEn: 'LAN Multi-Device Terminal Host',
    titleId: 'Host Terminal Multi-Perangkat via LAN',
    metric: '0.0.0.0:3060',
    descEn: 'Run UniCash on your main Windows/macOS/Linux cashier desktop and connect smartphones or tablets over local Wi-Fi. Mobile devices automatically receive a thumb-friendly bottom navigation bar and floating cart drawer.',
    descId: 'Jalankan UniCash di komputer kasir utama (Windows/macOS/Linux) dan buka dari ponsel atau tablet staf melalui Wi-Fi lokal yang sama. Perangkat seluler otomatis menampilkan navigasi bawah yang ergonomis.'
  },
  {
    code: 'ARCH-04',
    titleEn: 'Offline Ollama AI Store Copilot',
    titleId: 'Asisten Toko AI Ollama Lokal (Offline)',
    metric: '127.0.0.1:11434 (qwen2.5)',
    descEn: 'Connects to a local Ollama instance running qwen2.5:7b or qwen2.5:3b. Ask natural-language questions about best-selling items, profit margins, or low stock, and let the agent execute restocks or navigate reports via Server-Sent Events.',
    descId: 'Terintegrasi dengan server Ollama lokal yang menjalankan model qwen2.5. Tanyakan produk terlaris, margin keuntungan, atau saran restock dengan bahasa sehari-hari, serta jalankan perintah langsung dari ruang chat.'
  },
  {
    code: 'ARCH-05',
    titleEn: 'Catastrophe Recall Points & Checkpoints',
    titleId: 'Titik Pemulihan Data (Recall Points)',
    metric: 'Auto Daily + Pre-Restore',
    descEn: 'Creates automatic daily snapshots, pre-AI action checkpoints, and pre-restore safety backups. Restore your entire catalog and accounting ledger to any prior timestamp in one click or export portable backup archives.',
    descId: 'Membuat snapshot harian otomatis, titik aman sebelum aksi AI, dan cadangan sebelum pemulihan. Kembalikan seluruh katalog dan pembukuan ke titik waktu mana pun dengan satu klik.'
  },
  {
    code: 'ARCH-06',
    titleEn: 'Client-Side Binary PDF-1.4 Report Generator',
    titleId: 'Generator Laporan PDF-1.4 & Kartu Mentor',
    metric: 'Native DCTDecode PDF',
    descEn: 'Generates executive mentorship report cards and formal financial statements in binary PDF-1.4, high-DPI PNG, or JPEG directly in the browser without external cloud rendering servers.',
    descId: 'Menghasilkan kartu laporan eksekutif dan lembar laporan keuangan resmi dalam format PDF-1.4 murni, PNG resolusi tinggi, atau JPEG langsung dari perangkat tanpa server eksternal.'
  }
];

export const PRODUCT_FAQ = [
  {
    id: 'faq-lan',
    qEn: 'How do multiple phones or tablets connect to UniCash during peak hours?',
    qId: 'Bagaimana cara menghubungkan beberapa ponsel atau tablet ke UniCash saat jam ramai?',
    aEn: 'The Express backend binds to 0.0.0.0:3060 on the host computer. Running the included Allow-UniCash-Firewall.bat script opens TCP port 3060 on Windows Firewall, allowing any phone or tablet on the same Wi-Fi network to open http://<HOST-LAN-IP>:3060 and ring up orders concurrently against the same local database.',
    aId: 'Server Express UniCash berjalan pada alamat 0.0.0.0:3060 di komputer utama. Cukup jalankan skrip Allow-UniCash-Firewall.bat untuk membuka port TCP 3060 di Windows Firewall, lalu ponsel atau tablet di jaringan Wi-Fi yang sama dapat mengakses http://<IP-KOMPUTER>:3060 secara bersamaan.'
  },
  {
    id: 'faq-bom',
    qEn: 'How does the Recipe Bill of Materials (BOM) affect product COGS (HPP) and inventory?',
    qId: 'Bagaimana cara kerja Resep (BOM) terhadap perhitungan HPP dan stok bahan baku?',
    aEn: 'In the Admin Inventory & Recipes view, you record raw materials with their unit cost (for example, Bubuk Apel at Rp 75/g and Packaging Cup at Rp 790/pcs). When you assign a recipe to a menu item, UniCash computes the exact unit COGS (HPP) from the sum of its ingredients and logs that cost on every sale for accurate Profit & Loss reporting.',
    aId: 'Di menu Inventori & Resep Admin, Anda mencatat bahan baku beserta harga per satuannya (misal Bubuk Apel Rp 75/g dan Cup Rp 790/pcs). Saat resep dihubungkan ke menu, UniCash menghitung HPP per porsi secara otomatis dan mencatat modal tersebut pada setiap transaksi untuk perhitungan Laba Rugi yang akurat.'
  },
  {
    id: 'faq-reimburse',
    qEn: 'How does partner expense tracking and reimbursement rollover work?',
    qId: 'Bagaimana sistem pencatatan pengeluaran talangan mitra dan rollover reimburse bekerja?',
    aEn: 'When logging an expense in the Financials tab, you select the buyer (e.g., Christian, Felix, Jowie) and whether it was paid using Store Cash or Personal Cash. Personal Cash expenses are tracked as pending partner liabilities that automatically roll over across calendar months until you execute a batch reimbursement payout from store profits.',
    aId: 'Saat mencatat pengeluaran di tab Keuangan, Anda memilih nama pembeli dan sumber dana (Kas Toko atau Dana Pribadi). Pengeluaran dana pribadi tercatat sebagai hutang talangan yang otomatis terakumulasi lintas bulan hingga Anda melakukan pelunasan reimburse dari laba toko.'
  },
  {
    id: 'faq-printer',
    qEn: 'Which thermal receipt printers work with UniCash?',
    qId: 'Printer struk thermal apa saja yang kompatibel dengan UniCash?',
    aEn: 'UniCash includes a custom ESC/POS driver supporting WebUSB, WebSerial (COM port), and Web Bluetooth (BLE) for both 58mm (32-character) and 80mm (48-character) thermal printers, plus standard OS printer drivers via a hidden print iframe.',
    aId: 'UniCash memiliki layanan cetak ESC/POS internal yang mendukung koneksi WebUSB, WebSerial (port COM), dan Web Bluetooth (BLE) untuk ukuran kertas 58mm maupun 80mm, serta mode cetak driver sistem operasi standar.'
  },
  {
    id: 'faq-ai',
    qEn: 'Does the Admin AI Copilot send store financial data to external cloud servers?',
    qId: 'Apakah Asisten AI Admin mengirim data keuangan toko ke server cloud pihak ketiga?',
    aEn: 'No. Admin Copilot connects to your local Ollama instance at http://127.0.0.1:11434 running open-weight models like qwen2.5:7b or qwen2.5:3b directly on your hardware. All store metrics, stock queries, and chat actions remain 100% on your local machine.',
    aId: 'Tidak. Admin Copilot terhubung ke server Ollama lokal di http://127.0.0.1:11434 yang menjalankan model seperti qwen2.5:7b atau qwen2.5:3b langsung di perangkat Anda. Seluruh data keuangan dan percakapan tetap berada 100% di komputer lokal Anda.'
  }
];

export const PRICING_TIERS = {
  community: {
    id: 'community',
    code: 'TIER-01',
    badgeEn: 'Community Edition',
    badgeId: 'Edisi Komunitas',
    priceIdr: 0,
    priceLabelEn: 'Free Forever',
    priceLabelId: 'Gratis Selamanya',
    periodEn: 'No recurring fees or credit card required',
    periodId: 'Tanpa biaya berulang atau kartu kredit',
    taglineEn: 'For single-counter popups, indie home brewers, and initial testing.',
    taglineId: 'Untuk stan popup satu kasir, usaha rumahan, dan uji coba awal.',
    features: [
      {
        included: true,
        labelEn: 'Single Cashier Register (Cash & QRIS Tender)',
        labelId: 'Terminal Kasir Tunggal (Tunai & QRIS)'
      },
      {
        included: true,
        labelEn: 'Standard Inventory Stock Counter & Low-Stock Badges',
        labelId: 'Pencatatan Stok Standar & Indikator Stok Menipis'
      },
      {
        included: true,
        labelEn: 'Full Transaction Log & Real-Time CSV Spreadsheet Sync',
        labelId: 'Riwayat Transaksi Lengkap & Sinkronisasi CSV Real-Time'
      },
      {
        included: true,
        labelEn: '100% On-Premise Storage (./data/*.json on local drive)',
        labelId: '100% Penyimpanan Lokal (./data/*.json di hard drive)'
      },
      {
        included: true,
        labelEn: 'Standard Daily Summary Report & PDF Mentorship Export',
        labelId: 'Ringkasan Penjualan Harian & Ekspor PDF Kartu Mentor'
      },
      {
        included: false,
        labelEn: 'Multi-Device LAN Sync (Wi-Fi Tablets & Phones)',
        labelId: 'Sinkronisasi LAN Multi-Perangkat (Tablet & HP di Wi-Fi)'
      },
      {
        included: false,
        labelEn: 'Recipe Bill of Materials (BOM) Gram-Level Auto Deduction',
        labelId: 'Resep Komposisi (BOM) dengan Potong Stok per Gram/ml'
      },
      {
        included: false,
        labelEn: 'Double-Entry Ledgers (Jurnal Umum, Laba Rugi, Neraca, Arus Kas)',
        labelId: 'Pembukuan Lengkap (Jurnal Umum, Laba Rugi, Neraca, Arus Kas)'
      },
      {
        included: false,
        labelEn: 'Direct ESC/POS Thermal Printing (USB, Serial, Bluetooth, Drawer Kick)',
        labelId: 'Cetak Struk ESC/POS Direct (USB, Serial, Bluetooth, Kick Laci)'
      },
      {
        included: false,
        labelEn: 'Offline Local Ollama AI Store Copilot (qwen2.5:7b / 3b)',
        labelId: 'Asisten AI Ollama Offline Lokal (qwen2.5:7b / 3b)'
      }
    ],
    ctaEn: 'Download Free Community Edition',
    ctaId: 'Unduh Gratis Edisi Komunitas'
  },
  commercial: {
    id: 'commercial',
    code: 'TIER-02',
    badgeEn: 'Commercial Lifetime',
    badgeId: 'Komersial Seumur Hidup',
    priceIdr: 499000,
    priceLabelEn: 'Rp 499.000',
    priceLabelId: 'Rp 499.000',
    periodEn: 'One-time payment per outlet / Lifetime updates',
    periodId: 'Sekali bayar per gerai / Pembaruan seumur hidup',
    taglineEn: 'For bustling coffee bars, retail booths, and multi-staff food counters.',
    taglineId: 'Untuk kedai kopi ramai, booth ritel, dan gerai F&B multi-staf.',
    features: [
      {
        included: true,
        labelEn: 'Everything included in Community Edition',
        labelId: 'Semua fitur dalam Edisi Komunitas'
      },
      {
        included: true,
        labelEn: 'Multi-Device LAN Sync (Unlimited concurrent phones & tablets)',
        labelId: 'Sinkronisasi LAN Multi-Perangkat (HP & tablet tanpa batas)'
      },
      {
        included: true,
        labelEn: 'Recipe Bill of Materials (BOM) Gram & Milliliter Auto Deduction',
        labelId: 'Resep Komposisi (BOM) dengan Potong Stok Otomatis Gram & ml'
      },
      {
        included: true,
        labelEn: 'Complete 4-Statement Double-Entry Ledger (Jurnal, Laba Rugi, Neraca, Arus Kas)',
        labelId: 'Pembukuan Lengkap 4 Laporan (Jurnal, Laba Rugi, Neraca, Arus Kas)'
      },
      {
        included: true,
        labelEn: 'Partner Out-of-Pocket Liability & Reimbursement Tracking',
        labelId: 'Pelacakan Hutang Dana Talangan & Reimburse Mitra'
      },
      {
        included: true,
        labelEn: 'Direct ESC/POS Printing (58mm/80mm USB, COM, BLE, RJ11 Cash Drawer)',
        labelId: 'Cetak Struk ESC/POS Direct (58mm/80mm USB, COM, BLE, Laci Kasir)'
      },
      {
        included: true,
        labelEn: 'Offline Ollama AI Store Copilot with Restock Actions',
        labelId: 'Asisten Toko AI Ollama Offline dengan Eksekusi Restok'
      },
      {
        included: true,
        labelEn: 'Automated Daily Recall Points & Pre-Restore Catastrophe Vault',
        labelId: 'Snapshot Titik Pemulihan Harian & Vault Cadangan Darurat'
      },
      {
        included: true,
        labelEn: 'Offline Cryptographic License Key (Zero validation pingbacks)',
        labelId: 'Kunci Lisensi Kriptografi Offline (Tanpa ping ke server cloud)'
      }
    ],
    ctaEn: 'Coming Soon',
    ctaId: 'Segera Hadir'
  }
};

