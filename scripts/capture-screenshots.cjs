const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');
const http = require('http');

app.commandLine.appendSwitch('disable-renderer-backgrounding');
app.commandLine.appendSwitch('disable-background-timer-throttling');

const ROOT_DIR = path.resolve(__dirname, '..', '..');
const OUT_DIR = path.resolve(__dirname, '..', 'public', 'screenshots');
const PORT = 3069;
const SERVER_URL = `http://127.0.0.1:${PORT}`;

function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function pingServer(timeout = 200) {
  return new Promise((resolve) => {
    const req = http.get(SERVER_URL, { timeout }, () => resolve(true));
    req.on('error', () => resolve(false));
    req.on('timeout', () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function startServer() {
  const isUp = await pingServer();
  if (isUp) return;

  process.env.PORT = String(PORT);
  process.env.HOST = '127.0.0.1';
  process.env.BIND_HOST = '127.0.0.1';
  process.env.NODE_ENV = 'production';
  const localFixtures = path.join(__dirname, '..', 'test-fixtures', 'fake-demo-data');
  process.env.POS_DATA_DIR = fs.existsSync(localFixtures) ? localFixtures : path.join(ROOT_DIR, 'test-fixtures', 'fake-demo-data');

  require(path.join(ROOT_DIR, 'dist', 'server.cjs'));

  for (let i = 0; i < 50; i++) {
    if (await pingServer(100)) return;
    await wait(100);
  }
}

async function injectNoAnimationStyle(wc) {
  await wc.executeJavaScript(`
    (() => {
      if (!document.getElementById('no-anim-capture-style')) {
        const style = document.createElement('style');
        style.id = 'no-anim-capture-style';
        style.textContent = \`
          *, *::before, *::after {
            animation-duration: 0s !important;
            animation-delay: 0s !important;
            transition-duration: 0s !important;
            transition-delay: 0s !important;
          }
          .animate-page-enter, .animate-tab-fade {
            opacity: 1 !important;
            transform: none !important;
            animation: none !important;
          }
        \`;
        document.head.appendChild(style);
      }
    })()
  `);
}

async function waitForText(wc, substring, timeoutMs = 5000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const hasIt = await wc.executeJavaScript(`
      (document.body && (document.body.innerText || document.body.textContent) || '').toLowerCase().includes(${JSON.stringify(substring.toLowerCase())})
    `);
    if (hasIt) return true;
    await wait(120);
  }
  return false;
}

async function clickByText(wc, textVariants, selector = 'button') {
  const variantsJson = JSON.stringify(Array.isArray(textVariants) ? textVariants : [textVariants]);
  return wc.executeJavaScript(`
    (() => {
      const targets = ${variantsJson}.map(s => s.toLowerCase());
      const els = Array.from(document.querySelectorAll('${selector}'));
      const found = els.find(el => {
        const txt = (el.innerText || el.textContent || '').trim().toLowerCase();
        return targets.some(t => txt === t || txt.includes(t));
      });
      if (found) {
        found.click();
        return true;
      }
      return false;
    })()
  `);
}

async function clickNavTab(wc, tabName) {
  return wc.executeJavaScript(`
    (() => {
      const navBtns = Array.from(document.querySelectorAll('header nav button'));
      const target = navBtns.find(b => (b.innerText || b.textContent || '').toLowerCase().includes('${tabName.toLowerCase()}'));
      if (target) {
        target.click();
        return true;
      }
      return false;
    })()
  `);
}

async function ensureAllTimeFilter(wc) {
  const alreadyAllTime = await wc.executeJavaScript(`
    (() => {
      const btn = document.querySelector('button[title="Select date range"], button[title="Pilih rentang tanggal"]');
      if (!btn) return false;
      const txt = (btn.innerText || btn.textContent || '').toLowerCase();
      return txt.includes('all time') || txt.includes('semua');
    })()
  `);
  if (alreadyAllTime) return;

  // Open popover
  await wc.executeJavaScript(`
    (() => {
      const btn = document.querySelector('button[title="Select date range"], button[title="Pilih rentang tanggal"]');
      if (btn) btn.click();
    })()
  `);
  await wait(300);

  // Click the 'All Time' preset button inside the quick presets grid
  await wc.executeJavaScript(`
    (() => {
      const presetBtns = Array.from(document.querySelectorAll('.grid.grid-cols-2 button'));
      const allBtn = presetBtns.find(b => {
        const t = (b.innerText || b.textContent || '').trim().toLowerCase();
        return t === 'all time' || t === 'semua data';
      });
      if (allBtn) allBtn.click();
    })()
  `);
  await wait(250);

  // Click Apply Filter button
  await wc.executeJavaScript(`
    (() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const applyBtn = btns.find(b => {
        const t = (b.innerText || b.textContent || '').trim().toLowerCase();
        return t.includes('apply filter') || t.includes('terapkan filter');
      });
      if (applyBtn) applyBtn.click();
    })()
  `);
  await wait(450);
}

async function addSampleItemsToCart(wc) {
  await wc.executeJavaScript(`
    (() => {
      const targetNames = ['Velvet Caffe Latte', 'Butter Croissant', 'Signature Espresso'];
      const h4s = Array.from(document.querySelectorAll('h4'));
      targetNames.forEach(name => {
        const match = h4s.find(el => (el.textContent || '').trim() === name);
        if (match && match.parentElement && match.parentElement.parentElement) {
          match.parentElement.parentElement.click();
        }
      });
    })()
  `);
}

async function saveShot(win, filename) {
  await injectNoAnimationStyle(win.webContents);
  await win.webContents.executeJavaScript(`new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))`);
  await wait(250);
  const img = await win.webContents.capturePage();
  const fullPath = path.join(OUT_DIR, filename);
  fs.writeFileSync(fullPath, img.toPNG());
  console.log('Saved screenshot:', filename);
}

app.whenReady().then(async () => {
  try {
    fs.mkdirSync(OUT_DIR, { recursive: true });
    await startServer();

    const win = new BrowserWindow({
      width: 1440,
      height: 900,
      show: false,
      paintWhenInitiallyHidden: true,
      frame: false,
      backgroundColor: '#111318',
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        backgroundThrottling: false
      }
    });

    const wc = win.webContents;
    wc.setBackgroundThrottling(false);

    await win.loadURL(SERVER_URL);
    await wait(1200);

    await wc.executeJavaScript(`
      localStorage.setItem('coffee_pos_app_name', 'Unicat');
      localStorage.setItem('coffee_pos_app_desc', 'Artisan Coffee POS & Accounting OS');
      localStorage.setItem('coffee_pos_lang', 'EN');
      localStorage.setItem('coffee_pos_theme', 'dark');
      localStorage.setItem('pos_ignore_stock_toasts', 'true');
      localStorage.setItem('unicash_ai_enabled', 'true');
      sessionStorage.setItem('unicash_active_tab', 'cashier');
    `);
    await win.loadURL(SERVER_URL);
    await waitForText(wc, 'Velvet Caffe Latte', 6000);
    await injectNoAnimationStyle(wc);
    await wait(500);

    for (const theme of ['dark', 'light']) {
      console.log(`--- Capturing ${theme.toUpperCase()} mode ---`);
      win.setContentSize(1440, 900);
      await wait(350);

      // Ensure theme
      await wc.executeJavaScript(`
        (() => {
          const isCurrentlyDark = document.documentElement.classList.contains('dark');
          const wantDark = '${theme}' === 'dark';
          if (isCurrentlyDark !== wantDark) {
            const toggleBtn = document.querySelector('button[title*="Switch to"]');
            if (toggleBtn) toggleBtn.click();
          }
        })()
      `);
      await wait(450);

      // 1. Cashier POS
      await clickNavTab(wc, 'Cashier');
      await waitForText(wc, 'Velvet Caffe Latte', 4000);
      await clickByText(wc, ['Clear']);
      await wait(200);
      await addSampleItemsToCart(wc);
      await wait(400);
      await saveShot(win, `cashier-${theme}.png`);

      // 2. Checkout Modal
      await clickByText(wc, ['Charge / Pay']);
      await waitForText(wc, 'Process Payment', 3000);
      await wait(350);
      await saveShot(win, `checkout-${theme}.png`);

      // Close Checkout Modal
      await wc.executeJavaScript(`
        (() => {
          const modalCloseBtn = document.querySelector('.fixed.inset-0.z-50 button');
          if (modalCloseBtn) modalCloseBtn.click();
        })()
      `);
      await wait(350);

      // 3. Sales Analytics Dashboard
      await clickNavTab(wc, 'Dashboard');
      await waitForText(wc, 'Sales Analytics', 5000);
      await wait(400);
      await ensureAllTimeFilter(wc);
      await wait(500);
      await saveShot(win, `dashboard-${theme}.png`);

      // 4. Sales Log / Transaction History
      await clickNavTab(wc, 'Sales Log');
      await waitForText(wc, 'Transactions', 5000);
      await wait(400);
      await ensureAllTimeFilter(wc);
      await clickByText(wc, ['Show Profit']);
      await wait(450);
      await saveShot(win, `sales-log-${theme}.png`);

      // 5. Financials: Profit & Loss
      await clickNavTab(wc, 'Financials');
      await waitForText(wc, 'Financial Reports', 5000);
      await wait(400);
      await clickByText(wc, ['All Months']);
      await wait(350);
      await clickByText(wc, ['Profit & Loss']);
      await waitForText(wc, 'Profit & Loss Statement', 4000);
      await wait(450);
      await saveShot(win, `financials-pnl-${theme}.png`);

      // 6. Financials: Balance Sheet
      await clickByText(wc, ['Balance Sheet']);
      await waitForText(wc, 'ACCOUNTING EQUATION', 4000);
      await wait(450);
      await saveShot(win, `financials-balance-${theme}.png`);

      // 7. Admin: Raw Materials & BOM Recipes
      await clickNavTab(wc, 'Admin');
      await waitForText(wc, 'Menu & Catalog', 5000);
      await wait(350);
      await clickByText(wc, ['Inventory & Recipes']);
      await waitForText(wc, 'Arabica House Blend', 5000);
      await wait(500);
      await saveShot(win, `recipes-bom-${theme}.png`);

      // 8. Admin: Local AI Store Copilot
      await clickByText(wc, ['AI Agent']);
      await waitForText(wc, 'AI Agent', 5000);
      await wait(500);
      await saveShot(win, `ai-copilot-${theme}.png`);

      // 9. Mobile Views (390x844)
      win.setContentSize(390, 844);
      await wait(450);
      await wc.executeJavaScript(`
        (() => {
          const btns = Array.from(document.querySelectorAll('button'));
          const cashierBtn = btns.filter(b => (b.innerText || b.textContent || '').includes('Cashier')).pop();
          if (cashierBtn) cashierBtn.click();
        })()
      `);
      await waitForText(wc, 'Velvet Caffe Latte', 4000);
      await wait(450);
      await saveShot(win, `mobile-pos-${theme}.png`);

      await wc.executeJavaScript(`
        (() => {
          const btns = Array.from(document.querySelectorAll('button'));
          const dashBtn = btns.filter(b => (b.innerText || b.textContent || '').includes('Dashboard')).pop();
          if (dashBtn) dashBtn.click();
        })()
      `);
      await waitForText(wc, 'Sales Analytics', 4000);
      await wait(350);
      await ensureAllTimeFilter(wc);
      await wait(450);
      await saveShot(win, `mobile-dashboard-${theme}.png`);
    }

    console.log('All 18 synchronized screenshots captured!');
    app.exit(0);
  } catch (err) {
    console.error('Error capturing screenshots:', err);
    app.exit(1);
  }
});
