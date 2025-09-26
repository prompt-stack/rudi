const { chromium } = require('playwright');

async function testResultsPage() {
  const browser = await chromium.launch({ headless: false });

  console.log('\n=== Testing Results Page ===\n');

  console.log('1. Testing Desktop View (1920x1080)...');
  const desktopPage = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

  await desktopPage.goto('http://localhost:3000/assessment/results?o=47&c=63&g=50&l=intermediate');
  await desktopPage.waitForLoadState('networkidle');
  await desktopPage.waitForTimeout(2000);

  const desktopTitle = await desktopPage.textContent('h1');
  console.log('   ✓ Title loaded:', desktopTitle);

  const hasRadarChart = await desktopPage.locator('.recharts-surface').count() > 0;
  console.log('   ✓ Radar chart present:', hasRadarChart);

  const hasShareButton = await desktopPage.locator('button:has-text("Share Results")').count() > 0;
  console.log('   ✓ Share button present:', hasShareButton);

  await desktopPage.screenshot({ path: 'test-results-desktop.png', fullPage: true });
  console.log('   ✓ Screenshot saved: test-results-desktop.png');

  console.log('\n2. Testing Mobile View (375x667 - iPhone SE)...');
  const mobilePage = await browser.newPage({ viewport: { width: 375, height: 667 } });

  await mobilePage.goto('http://localhost:3000/assessment/results?o=47&c=63&g=50&l=intermediate');
  await mobilePage.waitForLoadState('networkidle');
  await mobilePage.waitForTimeout(2000);

  const mobileTitle = await mobilePage.textContent('h1');
  console.log('   ✓ Title loaded:', mobileTitle);

  const mobileHasRadarChart = await mobilePage.locator('.recharts-surface').count() > 0;
  console.log('   ✓ Radar chart present:', mobileHasRadarChart);

  const hasHorizontalScroll = await mobilePage.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });
  console.log('   ✓ No horizontal scroll:', !hasHorizontalScroll);

  const canVerticalScroll = await mobilePage.evaluate(() => {
    return document.documentElement.scrollHeight > document.documentElement.clientHeight;
  });
  console.log('   ✓ Can vertical scroll (mobile):', canVerticalScroll);

  await mobilePage.screenshot({ path: 'test-results-mobile.png', fullPage: true });
  console.log('   ✓ Screenshot saved: test-results-mobile.png');

  console.log('\n3. Testing Desktop No Scroll...');
  const desktopHasVerticalScroll = await desktopPage.evaluate(() => {
    return document.documentElement.scrollHeight > window.innerHeight;
  });
  console.log('   ✓ No vertical scroll on desktop:', !desktopHasVerticalScroll);

  console.log('\n✅ Results Page Test Complete!\n');

  await browser.close();
}

testResultsPage().catch(console.error);