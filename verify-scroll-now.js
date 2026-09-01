const { chromium } = require('playwright');
(async () => {
  for (const port of [3000, 3001]) {
    try {
      const browser = await chromium.launch();
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await page.goto(`http://localhost:${port}`, { waitUntil: 'domcontentloaded', timeout: 8000 });
      await page.waitForTimeout(800);
      const before = await page.evaluate(() => ({
        scrollY: window.scrollY,
        scrollHeight: document.documentElement.scrollHeight,
        clientHeight: document.documentElement.clientHeight,
        htmlOverflowY: getComputedStyle(document.documentElement).overflowY,
        bodyOverflowY: getComputedStyle(document.body).overflowY,
        bodyPosition: getComputedStyle(document.body).position,
        playgroundOpen: document.documentElement.classList.contains('playground-overlay-open'),
        overlayCount: document.querySelectorAll('.playground-overlay').length,
      }));
      await page.mouse.wheel(0, 600);
      await page.waitForTimeout(200);
      const after = await page.evaluate(() => window.scrollY);
      console.log('port', port, JSON.stringify({ before, after }));
      await browser.close();
    } catch (e) {
      console.log('port', port, 'failed', e.message);
    }
  }
})();
