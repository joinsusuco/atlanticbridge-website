const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

async function generateOGImage() {
  const logoPath = path.resolve(__dirname, "../public/Logo A-02.png");
  const logoBase64 = fs.readFileSync(logoPath).toString("base64");
  const logoDataUrl = `data:image/png;base64,${logoBase64}`;

  const heroPath = path.resolve(__dirname, "../public/hero-cargo-ship-aerial.jpg");
  const heroBase64 = fs.readFileSync(heroPath).toString("base64");
  const heroDataUrl = `data:image/jpeg;base64,${heroBase64}`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: 1200px;
      height: 630px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      overflow: hidden;
      position: relative;
    }
    .bg {
      position: absolute;
      inset: 0;
      background: url('${heroDataUrl}') center/cover no-repeat;
    }
    .overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(15,35,65,0.7) 0%, rgba(26,54,93,0.55) 50%, rgba(26,54,93,0.4) 100%);
    }
    .content {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 60px 80px;
      height: 100%;
    }
    .logo {
      width: 220px;
      height: auto;
      margin-bottom: 32px;
    }
    .title {
      font-size: 52px;
      font-weight: 800;
      color: white;
      line-height: 1.15;
      margin-bottom: 20px;
    }
    .title span {
      color: #f07c00;
    }
    .subtitle {
      font-size: 24px;
      color: rgba(255,255,255,0.85);
      line-height: 1.5;
      max-width: 700px;
    }
    .accent-bar {
      width: 80px;
      height: 4px;
      background: #f07c00;
      border-radius: 2px;
      margin-bottom: 24px;
    }
    .bottom-bar {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 6px;
      background: linear-gradient(90deg, #f07c00, #ff9a2e, #f07c00);
    }
    .url {
      position: absolute;
      bottom: 28px;
      right: 80px;
      font-size: 20px;
      color: rgba(255,255,255,0.6);
      font-weight: 600;
      letter-spacing: 0.5px;
    }
  </style>
</head>
<body>
  <div class="bg"></div>
  <div class="overlay"></div>
  <div class="content">
    <img src="${logoDataUrl}" class="logo" alt="Kalajulas Xpress" />
    <div class="accent-bar"></div>
    <div class="title">
      Ship to <span>Gambia</span> from USA
    </div>
    <div class="subtitle">
      Vehicles, products, and cargo shipping from the United States to Banjul. Reliable export services to West Africa.
    </div>
  </div>
  <div class="url">kalajulasxpress.com</div>
  <div class="bottom-bar"></div>
</body>
</html>`;

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630 });
  await page.setContent(html, { waitUntil: "networkidle0" });

  const outputPath = path.resolve(__dirname, "../public/og-image.png");
  await page.screenshot({ path: outputPath, type: "png" });

  await browser.close();
  console.log(`OG image generated: ${outputPath}`);
}

generateOGImage().catch(console.error);
