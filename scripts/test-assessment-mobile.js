/**
 * Test RUDI Assessment on mobile viewport
 */

const { chromium } = require('playwright');

async function testMobile() {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 1000
  });

  const context = await browser.newContext({
    viewport: { width: 375, height: 667 }, // iPhone SE size
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15'
  });

  const page = await context.newPage();

  try {
    console.log('📱 Testing mobile view...\n');

    await page.goto('http://localhost:3000/assessment');
    console.log('✅ Loaded assessment page');

    await page.getByText('Start Assessment').click();
    console.log('✅ Started assessment\n');

    // Answer all questions quickly
    await page.getByText('Weekly (1-3 times per week)').click();
    await page.getByRole('button', { name: 'Next' }).click();

    await page.getByText('ChatGPT', { exact: true }).click();
    await page.getByText('Claude (Anthropic)', { exact: true }).click();
    await page.getByRole('button', { name: 'Continue' }).click();

    await page.getByText('Created basic content').click();
    await page.getByRole('button', { name: 'Next' }).click();

    await page.getByText('recognizes patterns').click();
    await page.getByRole('button', { name: 'Next' }).click();

    await page.getByText('Comfortable - I figure things out').click();
    await page.getByRole('button', { name: 'Next' }).click();

    await page.getByText('Quick review and basic edits').click();
    await page.getByRole('button', { name: 'Next' }).click();

    await page.getByText('Data privacy and security').click();
    await page.getByText('Accuracy and reliability of outputs').click();
    await page.getByRole('button', { name: 'Continue' }).click();

    await page.getByText('Understanding AI ethics and responsible use').click();
    await page.getByText('Saving time on routine tasks').click();
    await page.getByRole('button', { name: 'Continue' }).click();

    await page.getByText('Technical (Development, Engineering, IT)').click();
    await page.getByRole('button', { name: 'Next' }).click();

    console.log('⏳ Waiting for results...\n');
    await page.waitForURL('**/assessment/results**', { timeout: 10000 });

    await page.waitForTimeout(2000);
    console.log('📱 Mobile results page loaded!');

    await page.screenshot({ path: 'mobile-results.png', fullPage: true });
    console.log('📸 Mobile screenshot saved\n');

    await page.waitForTimeout(3000);

  } catch (error) {
    console.error('❌ Error:', error.message);
    await page.screenshot({ path: 'mobile-error.png' });
  } finally {
    await browser.close();
    console.log('✨ Mobile test completed');
  }
}

testMobile().catch(console.error);