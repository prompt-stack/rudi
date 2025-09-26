const { chromium } = require('playwright');

async function testIntroPage() {
  const browser = await chromium.launch({ headless: false });

  console.log('\n=== Testing Assessment Intro Page ===\n');

  console.log('1. Testing Desktop View (1920x1080)...');
  const desktopPage = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

  await desktopPage.goto('http://localhost:3000/assessment');
  await desktopPage.waitForLoadState('networkidle');
  await desktopPage.waitForTimeout(1000);

  const desktopTitle = await desktopPage.textContent('h1');
  console.log('   ✓ Title loaded:', desktopTitle);

  const hasStartButton = await desktopPage.locator('button:has-text("Start Assessment")').count() > 0;
  console.log('   ✓ Start button present:', hasStartButton);

  await desktopPage.screenshot({ path: 'audit-intro-desktop.png', fullPage: true });
  console.log('   ✓ Screenshot saved: audit-intro-desktop.png');

  console.log('\n2. Testing Mobile View (375x667 - iPhone SE)...');
  const mobilePage = await browser.newPage({ viewport: { width: 375, height: 667 } });

  await mobilePage.goto('http://localhost:3000/assessment');
  await mobilePage.waitForLoadState('networkidle');
  await mobilePage.waitForTimeout(1000);

  const mobileTitle = await mobilePage.textContent('h1');
  console.log('   ✓ Title loaded:', mobileTitle);

  const mobileHasStartButton = await mobilePage.locator('button:has-text("Start Assessment")').count() > 0;
  console.log('   ✓ Start button present:', mobileHasStartButton);

  const hasHorizontalScroll = await mobilePage.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });
  console.log('   ✓ No horizontal scroll:', !hasHorizontalScroll);

  await mobilePage.screenshot({ path: 'audit-intro-mobile.png', fullPage: true });
  console.log('   ✓ Screenshot saved: audit-intro-mobile.png');

  console.log('\n3. Testing Start Button Click...');
  await desktopPage.click('button:has-text("Start Assessment")');
  await desktopPage.waitForURL('**/assessment/survey**');
  console.log('   ✓ Navigation to survey successful');

  console.log('\n✅ Assessment Intro Page Audit Complete!\n');

  await browser.close();
}

testIntroPage().catch(console.error);