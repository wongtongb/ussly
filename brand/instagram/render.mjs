import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const jobs = [
  { html: 'avatar.html',           out: 'exports/avatar.png',           w: 1080, h: 1080 },
  { html: 'post-01-intro.html',    out: 'exports/post-01-intro.png',    w: 1080, h: 1350 },
  { html: 'post-02-now-live.html', out: 'exports/post-02-now-live.png', w: 1080, h: 1350 },
  { html: 'post-03-principle.html',out: 'exports/post-03-principle.png',w: 1080, h: 1350 },
];

const browser = await chromium.launch();
for (const job of jobs) {
  const ctx = await browser.newContext({
    viewport: { width: job.w, height: job.h },
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();
  const url = 'file://' + resolve(__dirname, job.html);
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(async () => {
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
  });
  await page.waitForTimeout(400);
  await page.screenshot({
    path: resolve(__dirname, job.out),
    clip: { x: 0, y: 0, width: job.w, height: job.h },
  });
  console.log('rendered', job.out);
  await ctx.close();
}
await browser.close();
