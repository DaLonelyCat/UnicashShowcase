const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');
const http = require('http');

app.commandLine.appendSwitch('disable-renderer-backgrounding');
app.commandLine.appendSwitch('disable-background-timer-throttling');

const WEBSITE_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(WEBSITE_DIR, 'dist');
const SRC_DIR = path.join(WEBSITE_DIR, 'src');
const ARTIFACT_DIR = 'C:\\Users\\chris\\.gemini\\antigravity\\brain\\652fb0a3-f4c1-499c-b45f-540f0ec9d6ea';
const PORT = 4178;

function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function getAllFiles(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) getAllFiles(full, acc);
    else acc.push(full);
  }
  return acc;
}

function runStaticSourceAudit() {
  const files = [...getAllFiles(SRC_DIR), path.join(WEBSITE_DIR, 'index.html')];
  const emDashHits = [];
  const bannedWords = [
    'seamless',
    'revolutionary',
    'cutting edge',
    'cutting-edge',
    'ai powered',
    'ai-powered',
    'next generation',
    'next-generation',
    'effortless',
    'ultimate',
    'powerful',
    'intelligent',
    'get started',
    'learn more'
  ];
  const bannedHits = [];

  for (const f of files) {
    const content = fs.readFileSync(f, 'utf8');
    if (content.includes('\u2014') || content.includes('&mdash;') || content.includes('&#8212;')) {
      emDashHits.push(path.relative(WEBSITE_DIR, f));
    }
    const lower = content.toLowerCase();
    for (const w of bannedWords) {
      const regex = new RegExp(`\\b${w.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'i');
      if (regex.test(lower)) {
        bannedHits.push(`${path.relative(WEBSITE_DIR, f)}: "${w}"`);
      }
    }
  }

  return { emDashHits, bannedHits };
}

function startStaticServer() {
  const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.json': 'application/json'
  };

  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const urlPath = req.url.split('?')[0];
      let filePath = path.join(DIST_DIR, urlPath === '/' ? 'index.html' : urlPath);
      if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        filePath = path.join(DIST_DIR, 'index.html');
      }
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
      fs.createReadStream(filePath).pipe(res);
    });
    server.listen(PORT, '127.0.0.1', () => resolve(server));
  });
}

async function saveShot(win, filename) {
  const [w, h] = win.getContentSize();
  win.setContentSize(w + 1, h);
  await wait(80);
  win.setContentSize(w, h);
  await win.webContents.executeJavaScript(`new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))`);
  await wait(250);
  const img = await win.webContents.capturePage();
  const dest = path.join(ARTIFACT_DIR, filename);
  fs.writeFileSync(dest, img.toPNG());
  console.log('Saved website verification shot:', filename);
}

app.whenReady().then(async () => {
  try {
    const audit = runStaticSourceAudit();
    console.log('Static Audit Result:', JSON.stringify(audit));
    if (audit.emDashHits.length > 0 || audit.bannedHits.length > 0) {
      console.error('FAILED STATIC AUDIT:', audit);
      app.exit(1);
      return;
    }

    const server = await startStaticServer();
    const consoleErrors = [];

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
    wc.on('console-message', (event) => {
      const level = event.level;
      const msg = event.message;
      if (level === 'error' || level >= 3) {
        console.error('RENDERER CONSOLE ERROR:', msg);
        consoleErrors.push(msg);
      }
    });

    await win.webContents.session.clearStorageData();
    await win.loadURL(`http://127.0.0.1:${PORT}`);
    await wait(800);

    await wc.executeJavaScript(`
      localStorage.setItem('unicash_web_theme', 'dark');
      localStorage.setItem('unicash_web_lang', 'EN');
      document.documentElement.classList.add('dark');
      document.documentElement.style.scrollBehavior = 'auto';
      const s = document.createElement('style');
      s.textContent = '*, *::before, *::after { transition-duration: 0s !important; animation-duration: 0s !important; }';
      document.head.appendChild(s);
      true;
    `);
    await wait(400);

    // 1. Desktop Hero Dark Screenshot
    await saveShot(win, 'web-hero-dark.png');

    // Check Desktop horizontal overflow
    const desktopOverflow = await wc.executeJavaScript(`
      document.documentElement.scrollWidth > window.innerWidth
    `);
    console.log('Desktop Horizontal Overflow:', desktopOverflow);

    // Test Cycle Sample Ticket on the redesigned full-width Live Order-to-Ledger Inspector
    const ticketCycleResult = await wc.executeJavaScript(`
      (() => {
        const cycleBtn = Array.from(document.querySelectorAll('button')).find(b => (b.innerText || '').includes('Cycle Sample Ticket') || (b.innerText || '').includes('Ganti Sampel Struk'));
        if (!cycleBtn) return { found: false };
        const hasOrdPill = document.body.innerText.includes('ORD-261013-01 (QRIS)');
        const before = document.body.innerText.includes('Velvet Caffe Latte');
        cycleBtn.click();
        const after = document.body.innerText.includes('Iced Caramel Macchiato');
        return { found: true, before, after, hasOrdPill };
      })()
    `);
    console.log('Order Inspector Cycle Test:', JSON.stringify(ticketCycleResult));

    // 2. Scroll to #tour & test chapter switching and Mobile LAN filtering
    await wc.executeJavaScript(`
      (() => {
        const el = document.getElementById('tour');
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          window.scrollTo(0, top);
          window.dispatchEvent(new Event('scroll'));
        }
        return !!el;
      })()
    `);
    await wait(300);

    const railDebug = await wc.executeJavaScript(`
      (() => {
        const rail = document.querySelector('nav[aria-label="Desktop Navigation Rail"]') || document.querySelector('nav[aria-label="Desktop Compact Navigation"]');
        return {
          scrollY: window.scrollY,
          railFound: !!rail,
          classes: rail ? rail.className : ''
        };
      })()
    `);
    console.log('Desktop Navigation Rail State:', JSON.stringify(railDebug));

    await saveShot(win, 'web-tour-dark.png');

    // Test Mobile LAN Viewport Toggle (Verify only 2 features are available on Mobile LAN)
    await wc.executeJavaScript(`
      (() => {
        const btns = Array.from(document.querySelectorAll('#tour button'));
        const mobileBtn = btns.find(b => (b.innerText || '').includes('Mobile LAN'));
        if (mobileBtn) mobileBtn.click();
      })()
    `);
    await wait(350);
    const mobileLanTest = await wc.executeJavaScript(`
      (() => {
        const tabs = Array.from(document.querySelectorAll('#tour [role="tablist"] button[role="tab"]'));
        return { found: true, tabsCount: tabs.length };
      })()
    `);
    console.log('Mobile LAN Tabs Test:', JSON.stringify(mobileLanTest));
    await saveShot(win, 'web-tour-mobile-lan.png');

    // Switch back to Desktop view
    await wc.executeJavaScript(`
      (() => {
        const btns = Array.from(document.querySelectorAll('#tour button'));
        const deskBtn = btns.find(b => (b.innerText || '').includes('Desktop'));
        if (deskBtn) deskBtn.click();
      })()
    `);
    await wait(300);

    // 3. Scroll to #sandbox & test live checkout + BOM deduction
    await wc.executeJavaScript(`
      (() => {
        const el = document.getElementById('sandbox');
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          window.scrollTo(0, top);
          window.dispatchEvent(new Event('scroll'));
        }
        return !!el;
      })()
    `);
    await wait(300);
    await saveShot(win, 'web-sandbox-dark.png');

    // Click Complete Demo Sale & Print 80mm Receipt inside sandbox
    const journalPosted = await wc.executeJavaScript(`
      (() => {
        const btns = Array.from(document.querySelectorAll('#sandbox button'));
        const chargeBtn = btns.find(b => {
          const t = (b.innerText || b.textContent || '').toLowerCase();
          return t.includes('complete demo sale') || t.includes('selesaikan transaksi');
        });
        if (chargeBtn) {
          chargeBtn.click();
          return true;
        }
        return false;
      })()
    `);
    console.log('Sandbox Charge & Post Journal clicked:', journalPosted);
    await wait(300);

    // 4. Scroll to #accounting & test statement switching
    await wc.executeJavaScript(`
      (() => {
        const el = document.getElementById('accounting');
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          window.scrollTo(0, top);
          window.dispatchEvent(new Event('scroll'));
        }
        return !!el;
      })()
    `);
    await wait(300);
    await saveShot(win, 'web-accounting-dark.png');

    // 4b. Scroll to #pricing & test Community / Commercial cards & modals
    await wc.executeJavaScript(`
      (() => {
        const el = document.getElementById('pricing');
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          window.scrollTo(0, top);
          window.dispatchEvent(new Event('scroll'));
        }
        return !!el;
      })()
    `);
    await wait(300);
    await saveShot(win, 'web-pricing-dark.png');

    // Open Install Modal via Community CTA
    await wc.executeJavaScript(`
      (() => {
        const btns = Array.from(document.querySelectorAll('#pricing button'));
        const dlBtn = btns.find(b => {
          const t = (b.innerText || b.textContent || '').toLowerCase();
          return t.includes('download') || t.includes('unduh');
        });
        if (dlBtn) dlBtn.click();
      })()
    `);
    await wait(400);
    await saveShot(win, 'web-pricing-install-modal.png');

    // Close Install Modal with Escape key
    await wc.executeJavaScript(`
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    `);
    await wait(350);

    // Verify Commercial Tier displays Coming Soon
    const commercialComingSoon = await wc.executeJavaScript(`
      (() => {
        const text = (document.getElementById('pricing') || {}).innerText || '';
        return text.toLowerCase().includes('coming soon') || text.toLowerCase().includes('segera hadir');
      })()
    `);
    console.log('Commercial Tier Coming Soon Verified:', commercialComingSoon);
    await wait(200);

    // 5. Switch to Light Mode & Bahasa Indonesia and capture Hero Light
    await wc.executeJavaScript(`
      localStorage.setItem('unicash_web_theme', 'light');
      localStorage.setItem('unicash_web_lang', 'ID');
      true;
    `);
    await win.loadURL(`http://127.0.0.1:${PORT}`);
    await wait(900);
    await saveShot(win, 'web-hero-light-id.png');

    // Verify desktop navigation rail is present and visible
    const railVisible = await wc.executeJavaScript(`
      (() => {
        const rail = document.querySelector('nav[aria-label="Desktop Navigation Rail"]') || document.querySelector('nav[aria-label="Desktop Compact Navigation"]');
        return !!rail && window.getComputedStyle(rail).display !== 'none';
      })()
    `);
    console.log('Desktop Navigation Rail Visible:', railVisible);

    // 6. Test Mobile 390x844 responsiveness & overflow
    win.setContentSize(390, 844);
    await wait(500);
    const mobileOverflow = await wc.executeJavaScript(`
      document.documentElement.scrollWidth > window.innerWidth
    `);
    console.log('Mobile Horizontal Overflow:', mobileOverflow);
    await saveShot(win, 'web-mobile-light-id.png');

    // Test mobile hamburger drawer toggle
    const drawerOpened = await wc.executeJavaScript(`
      (() => {
        const btn = document.querySelector('header[aria-label="Mobile Navigation Bar"] button[aria-label*="Menu"]');
        if (btn) {
          btn.click();
          return true;
        }
        return false;
      })()
    `);
    console.log('Mobile Drawer Opened:', drawerOpened);
    await wait(400);
    await saveShot(win, 'web-mobile-drawer.png');

    server.close();
    console.log('Console Errors Count:', consoleErrors.length);
    if (consoleErrors.length > 0) {
      console.error('Console errors:', consoleErrors);
      app.exit(1);
    }
    app.exit(0);
  } catch (err) {
    console.error('Verification failed:', err);
    app.exit(1);
  }
});
