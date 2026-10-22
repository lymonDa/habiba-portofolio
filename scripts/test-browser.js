import puppeteer from 'puppeteer-core';

async function runTests() {
  console.log('Launching Chromium...');
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
    headless: true,
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push({ text: msg.text(), location: msg.location() });
      console.error('BROWSER ERROR:', msg.text());
    }
  });

  page.on('pageerror', err => {
    console.warn('PAGE ERROR (recovered):', err.message);
  });

  console.log('Navigating to http://localhost:3000/ ...');
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await new Promise(r => setTimeout(r, 1000));

  // 1. Homepage & Title
  const title = await page.title();
  console.log('1. Page Title:', title);

  const heroHeading = await page.$eval('h1', el => el.innerText.trim());
  console.log('   Hero Heading:', heroHeading);

  // 2. Navigation Links
  const navLinks = await page.$$eval('.nav-links a', els => els.map(a => a.innerText.trim()));
  console.log('2. Navigation links:', navLinks);

  // 3. Scroll through page to trigger lazy loading of images
  console.log('3. Scrolling to trigger all image loading...');
  await page.evaluate(async () => {
    const distance = 400;
    const totalHeight = document.body.scrollHeight;
    let current = 0;
    while (current < totalHeight) {
      window.scrollBy(0, distance);
      current += distance;
      await new Promise(r => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
  await new Promise(r => setTimeout(r, 1000));

  // Check all images
  const imageResults = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img'));
    return imgs.map(img => ({
      src: img.src,
      alt: img.alt,
      complete: img.complete,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
    }));
  });

  const brokenImgs = imageResults.filter(img => !img.complete || img.naturalWidth === 0);
  console.log(`   Total images found: ${imageResults.length}`);
  console.log(`   Broken images count: ${brokenImgs.length}`);
  if (brokenImgs.length > 0) {
    console.error('   Broken images:', brokenImgs);
  } else {
    console.log('   All images loaded successfully!');
  }

  // 4. Test Gallery Filter Buttons
  console.log('4. Testing gallery category filters...');
  // Scroll to portfolio section
  await page.evaluate(() => {
    document.getElementById('portfolio')?.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 600));

  const filterTabs = ['Events', 'Workshops', 'Engagements', 'Nature & Moments', 'Products', 'All'];
  for (const tab of filterTabs) {
    const clicked = await page.evaluate((categoryName) => {
      const buttons = Array.from(document.querySelectorAll('.filter-bar button'));
      const target = buttons.find(b => b.innerText.trim() === categoryName);
      if (target) {
        target.click();
        return true;
      }
      return false;
    }, tab);

    await new Promise(r => setTimeout(r, 300));
    const tileCount = await page.$$eval('.mosaic figure', els => els.length);
    console.log(`   Filter [${tab}]: clicked=${clicked}, mosaic tiles = ${tileCount}`);
  }

  await page.screenshot({ path: 'tests/screenshots/test-gallery.png' });
  console.log('   Saved tests/screenshots/test-gallery.png');

  // 5. Test Lightbox
  console.log('5. Testing image lightbox modal...');
  const tileClicked = await page.evaluate(() => {
    const firstTile = document.querySelector('.mosaic figure');
    if (firstTile) {
      firstTile.click();
      return true;
    }
    return false;
  });

  await new Promise(r => setTimeout(r, 500));
  const lbOpen = await page.evaluate(() => {
    const lb = document.querySelector('.lightbox');
    if (!lb) return false;
    const caption = lb.querySelector('figcaption, p, .lb-caption')?.innerText || '';
    const img = lb.querySelector('img');
    return {
      isOpen: true,
      caption,
      imgSrc: img?.src,
      imgLoaded: img?.complete && img?.naturalWidth > 0
    };
  });
  console.log('   Lightbox open state:', lbOpen);

  await page.screenshot({ path: 'tests/screenshots/test-lightbox.png' });
  console.log('   Saved tests/screenshots/test-lightbox.png');

  // Press Escape to close
  await page.keyboard.press('Escape');
  await new Promise(r => setTimeout(r, 400));
  const lbClosed = await page.evaluate(() => !document.querySelector('.lightbox'));
  console.log('   Lightbox closed via Escape:', lbClosed);

  // 6. Test Sections content
  console.log('6. Verifying key sections...');
  const sectionsChecked = await page.evaluate(() => {
    return {
      manifesto: !!document.querySelector('.manifesto-text')?.innerText.includes('sunrise'),
      about: !!document.getElementById('about-story'),
      stories: document.querySelectorAll('#stories .rule-list li').length,
      beyond: document.querySelectorAll('#beyond .rule-list li').length,
      engineering: document.querySelectorAll('#engineering .train-grid li').length,
      skills: document.querySelectorAll('#skills .skill-cols > div').length,
      contactEmail: document.querySelector('.mail-link')?.getAttribute('href'),
      contactForm: !!document.querySelector('form.form-card'),
      whatsapp: !!document.querySelector('a[href*="wa.me"]'),
      linkedin: !!document.querySelector('a[href*="linkedin.com"]'),
      instagram: !!document.querySelector('a[href*="instagram.com"]'),
    };
  });
  console.log('   Sections verification:', sectionsChecked);

  // 7. Test Mobile Responsive Viewport
  console.log('7. Testing mobile layout (375x812)...');
  await page.setViewport({ width: 375, height: 812 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 400));

  const mobileNav = await page.evaluate(() => {
    const burger = document.querySelector('.nav-burger');
    const burgerVisible = burger && window.getComputedStyle(burger).display !== 'none';
    if (burger) burger.click();
    const drawer = document.querySelector('.nav-drawer');
    const drawerVisible = drawer && (drawer.classList.contains('is-open') || window.getComputedStyle(drawer).display !== 'none');
    return { burgerVisible, drawerVisible };
  });
  console.log('   Mobile menu test:', mobileNav);

  await page.screenshot({ path: 'tests/screenshots/test-mobile.png' });
  console.log('   Saved tests/screenshots/test-mobile.png');

  console.log('\n=== ALL TESTS COMPLETE ===');
  await browser.close();
}

runTests().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
