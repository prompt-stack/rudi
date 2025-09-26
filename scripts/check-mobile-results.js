/**
 * Check mobile results page directly
 */

const { chromium } = require('playwright');

async function checkMobileResults() {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 500
  });

  const context = await browser.newContext({
    viewport: { width: 375, height: 667 }, // iPhone SE
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15'
  });

  const page = await context.newPage();

  try {
    console.log('📱 Checking mobile results view...\n');

    // Navigate directly to results with sample scores
    await page.goto('http://localhost:3000/assessment/results?o=47&c=63&g=50&l=intermediate');

    await page.waitForTimeout(2000);
    console.log('✅ Mobile results loaded');

    await page.screenshot({ path: 'mobile-results.png', fullPage: true });
    console.log('📸 Mobile screenshot saved (mobile-results.png)\n');

    await page.waitForTimeout(5000);

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
    console.log('✨ Done');
  }
}

checkMobileResults().catch(console.error);