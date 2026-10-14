# UniCash Startup Website — Design Direction (`DESIGN.md`)

## 1. Design Read & Dials
> Reading this as: **Product Showcase & Interactive Web Sandbox** for **F&B and Retail SME owners**, in a **Bold Editorial Startup** visual language, dial **ENERGY 3 / RHYTHM 3 / MOTION 3**.

- **Dial:** `ENERGY 3 / RHYTHM 3 / MOTION 3`
- **Identity:** Precision financial journalism meets high-craft Point-of-Sale hardware engineering. UniCash is not a generic SaaS dashboard; it is a local-first cash register, double-entry accounting ledger, recipe BOM calculator, and local AI copilot that runs on a store's own hardware.
- **Personality:** Authoritative, tactile, transparent, and mathematically exact.

## 2. Color Palette (3 Core Colors + 1 Deliberate Accent)
Every color complies with WCAG AA minimum contrast (4.5:1 normal text, 3:1 large text) in both Light and Dark modes.

| Role | Light Mode Token | Dark Mode Token | Purpose (R-29, R-31) |
| :--- | :--- | :--- | :--- |
| **Core 1: Primary Surface** | `#fdfcff` (Ledger Paper) | `#111318` (Obsidian Register) | Directly mirrors UniCash's native Material 3 light and dark canvas backgrounds. |
| **Core 2: Elevated Container** | `#f1f3f8` / `#ebedf3` | `#181a20` / `#1f222a` | Separates interactive POS panels and accounting ledger tables from the page canvas without heavy drop shadows. |
| **Core 3: Structural Ink & Rules** | `#111318` (Primary Ink), `#44474f` (Secondary Ink), `#d8dce6` (Rule Line) | `#f1f3f8` (Primary Ink), `#9ca3af` (Secondary Ink), `#262932` (Rule Line) | Provides crisp 1px accounting ledger borders and high-contrast editorial typography. |
| **Accent: Register Cobalt** | `#005ac1` (Hover: `#00489e`, Container: `#d8e2ff`, On-Container: `#001a41`) | `#a8c7fa` (Container: `#004881`, On-Container: `#d8e2ff`) | Matches UniCash's primary interactive action color (`--color-md-primary`) to guide eyes to the primary focal point per screen. |

*Semantic Data Indicators (used strictly inside live accounting/stock data rows, never as page decoration):*
- **Positive Margin / Balanced Ledger:** `#146c43` (Light) / `#75d59e` (Dark)
- **Low Stock / Expense Debit Alert:** `#b3261e` (Light) / `#ffb4ab` (Dark)

## 3. Typography
- **Display & Headlines (`--font-display`):** `'Syne'`, `'Plus Jakarta Sans'`, sans-serif.
  - *Reason (R-06, R-31):* High-contrast editorial display geometry gives the startup landing page a bold, unmistakable headline voice at `ENERGY 3`.
- **UI & Editorial Body (`--font-sans`):** `'Plus Jakarta Sans'`, `'Google Sans'`, system-ui, sans-serif.
  - *Reason (R-06, R-31):* Exceptional legibility at compact POS interface sizes and natural harmony with Indonesian & English bilingual copy.
- **Financial & Ledger Numerals (`--font-mono`):** `'Roboto Mono'`, monospace with `font-variant-numeric: tabular-nums`.
  - *Reason (R-06, R-31):* Matches UniCash's internal tabular monospace font so Rupiah (`Rp`) columns, BOM gram/ml costs, and thermal receipt lines align vertically to the pixel.

## 4. Identity Motif & Levers
1. **Perforated Thermal Receipt & Double-Entry Ledger Grid:**
   - Sections are framed by 1px structural ledger rules with monospace coordinate indices (`01 // POS TERMINAL`, `02 // SCREEN ARCHITECTURE`, `03 // LIVE SANDBOX`, `04 // DOUBLE-ENTRY LEDGER`, `05 // HARDWARE & LOCAL AI`).
   - Interactive receipt components feature authentic serrated paper edges (`repeating-linear-gradient` sawtooth) and real-time `Rp` math.
2. **One Focal Point Per Screen:**
   - Hero focuses on the interactive dual-theme POS & live thermal receipt stage.
   - Tour focuses on the 2x Retina viewport frame with interactive hotspots.
   - Sandbox focuses on the working 3-step Cashier -> BOM -> Receipt/Journal loop.
3. **Rhythm (`RHYTHM 3` — Asymmetric & Varied Compositions):**
   - Section 1: 7/5 Asymmetric Editorial Hero with interactive dual-theme slider & live mini-receipt.
   - Section 2: Studio Viewport Theatre with left vertical rail controller, top device/theme bar, and interactive zoom lightbox.
   - Section 3: 3-Column Live POS & BOM Interactive Sandbox (Menu Catalog | Active Cart & Checkout | Live Thermal Receipt & Journal Output).
   - Section 4: Split-Screen Financial Statement Inspector (Interactive Ledger Sheet with live statement switching: *Jurnal Umum*, *Laba Rugi*, *Neraca*, *Arus Kas*).
   - Section 5: Architectural Blueprint Spec Matrix + Product-Specific Technical Accordion.
   - Section 6: Editorial Colophon & Interactive Quick-Jump Bar.

## 5. Written Purpose Log for Purpose-Gate Rules (R-01 to R-22)
- **R-01 (Gradients):** No decorative background orbs or blue-purple gradients. Subtle surface tint transitions are used solely to distinguish active interactive controls.
- **R-04 (Icons):** Icons are used only inside functional POS controls, hardware interface indicators (USB, Serial, Bluetooth, LAN), and theme/language switches, where each icon directly maps to the hardware protocol or UI action.
- **R-06 (Typography):** Monospace type (`Roboto Mono`) is restricted to numeric `Rp` currency values, BOM quantities, port numbers (`:3060`), and coordinate markers.
- **R-07 (Background):** Solid high-contrast Ledger Paper (`#fdfcff`) and Obsidian (`#111318`) framed by 1px accounting ledger lines; no decorative dot/blueprint wallpaper.
- **R-08 (Button Arrows):** Used only on the primary scroll-to-sandbox CTA and external lightbox triggers to indicate directional movement.
- **R-09 (Badges):** Status chips are strictly functional (showing live stock count, `EN/ID` active locale, `LIGHT/DARK` active theme, or `58mm/80mm` printer mode).
- **R-10 (Glassmorphism):** Restricted exclusively to the sticky top navigation bar (`backdrop-filter: blur(12px)`) so scrolling ledger lines remain softly visible beneath the header; zero blur on cards or sections.
- **R-11 (Border Radius):** Sharp-to-medium architectural radii (`0px` on ledger grid cells, `12px` on interactive panels, `9999px` only on segmented mode toggles matching UniCash's Material 3 navbar pills).
- **R-12 (Shadow):** Elevation shadow used only on the floating thermal receipt paper and the active screenshot stage frame to separate the foreground artifact from the ledger canvas.
- **R-13 (Glow):** Zero decorative glow.
- **R-14 (Feature Cards):** No uniform 3-card feature grid; capabilities are demonstrated through the 8-screen interactive tour, the live POS sandbox, the split financial ledger, and the technical spec matrix.
- **R-19 (Animations):** Spring transitions (`cubic-bezier(0.16, 1, 0.3, 1)`) drive the Light/Dark comparison wipe, thermal receipt paper feed animation upon checkout, and scroll-linked section reveals (`MOTION 3`).
- **R-22 (Illustrations):** Zero generic vector illustrations; 100% real UniCash application screenshots and live interactive UI components.
