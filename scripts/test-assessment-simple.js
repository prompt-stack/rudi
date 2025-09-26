/**
 * Simplified Playwright script to test RUDI Assessment
 * Run with: node scripts/test-assessment-simple.js
 */

const { chromium } = require('playwright');

async function runAssessment() {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 1000 // Slower to see what's happening
  });

  const page = await browser.newPage();

  try {
    console.log('🚀 Starting assessment test...\n');

    // Go to assessment page
    await page.goto('http://localhost:3000/assessment');
    console.log('✅ Loaded assessment page');

    // Click Start Assessment
    await page.getByText('Start Assessment').click();
    console.log('✅ Started assessment\n');

    // Question 1: Frequency
    console.log('📝 Q1: How often do you use AI tools?');
    await page.getByText('Weekly (1-3 times per week)').click();
    await page.getByRole('button', { name: 'Next' }).click();
    console.log('   ✓ Answered: Weekly\n');

    // Question 2: Tools
    console.log('📝 Q2: Which AI tools have you used?');
    await page.getByText('ChatGPT', { exact: true }).click();
    await page.getByText('Claude (Anthropic)', { exact: true }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    console.log('   ✓ Selected: ChatGPT, Claude\n');

    // Question 3: Task Complexity
    console.log('📝 Q3: Most complex task?');
    await page.getByText('Created basic content').click();
    await page.getByRole('button', { name: 'Next' }).click();
    console.log('   ✓ Answered: Created basic content\n');

    // Question 4: Understanding
    console.log('📝 Q4: How would you explain AI?');
    await page.getByText('It recognizes patterns from large amounts of data').click();
    await page.getByRole('button', { name: 'Next' }).click();
    console.log('   ✓ Answered: Pattern recognition\n');

    // Question 5: Comfort Level
    console.log('📝 Q5: Comfort with new technology?');
    await page.getByText('Comfortable - I figure things out independently').click();
    await page.getByRole('button', { name: 'Next' }).click();
    console.log('   ✓ Answered: Comfortable\n');

    // Question 6: Verification
    console.log('📝 Q6: How do you verify AI content?');
    await page.getByText('Quick review and basic edits').click();
    await page.getByRole('button', { name: 'Next' }).click();
    console.log('   ✓ Answered: Quick review\n');

    // Question 7: Concerns
    console.log('📝 Q7: What concerns you about AI?');
    await page.getByText('Data privacy and security').click();
    await page.getByText('Accuracy and reliability of outputs').click();
    await page.getByRole('button', { name: 'Continue' }).click();
    console.log('   ✓ Selected: Privacy, Accuracy\n');

    // Question 8: Priorities
    console.log('📝 Q8: 60-day priorities?');
    await page.getByText('Understanding AI ethics and responsible use').click();
    await page.getByText('Saving time on routine tasks').click();
    await page.getByRole('button', { name: 'Continue' }).click();
    console.log('   ✓ Selected: Ethics, Time-saving\n');

    // Question 9: Role (Optional)
    console.log('📝 Q9: Your role?');
    await page.getByText('Technical (Development, Engineering, IT)').click();
    await page.getByRole('button', { name: 'Next' }).click();
    console.log('   ✓ Selected: Technical\n');

    // Question 10: Organization AI usage
    console.log('📝 Q10: Organization AI usage?');
    await page.getByText('Several pilots across units').click();

    // Try to click Complete Assessment button if it appears, or wait for auto-navigation
    try {
      await page.waitForSelector('button:has-text("Complete Assessment")', { state: 'visible', timeout: 2000 });
      await page.click('button:has-text("Complete Assessment")');
      console.log('   ✓ Answered: Several pilots\n');
    } catch {
      // Auto-navigated to results
      console.log('   ✓ Answered: Several pilots (auto-submitted)\n');
    }

    // Wait for results page
    console.log('⏳ Waiting for results...');
    await page.waitForURL('**/assessment/results**', { timeout: 10000 });

    // Get results
    await page.waitForTimeout(2000); // Let page fully load

    console.log('\n🎯 ASSESSMENT COMPLETE!\n');
    console.log('📊 Results page loaded successfully');

    // Take screenshot of results
    await page.screenshot({ path: 'assessment-results.png' });
    console.log('📸 Results screenshot saved\n');

    // Keep browser open for 5 seconds to view results
    await page.waitForTimeout(5000);

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    await page.screenshot({ path: 'error-screenshot.png' });
    console.log('📸 Error screenshot saved');
  } finally {
    await browser.close();
    console.log('\n✨ Test completed');
  }
}

// Run the test
runAssessment().catch(console.error);