/**
 * Playwright script to simulate taking the RUDI Assessment
 * Run with: node scripts/test-assessment.js
 */

const { chromium } = require('playwright');

async function simulateAssessment() {
  const browser = await chromium.launch({
    headless: false, // Set to true for headless mode
    slowMo: 500 // Slow down actions to see what's happening
  });

  const page = await browser.newPage();

  try {
    console.log('🚀 Starting assessment simulation...');

    // Navigate to assessment page
    await page.goto('http://localhost:3000/assessment');
    console.log('📍 Navigated to assessment page');

    // Wait for the intro page to load - look for the actual heading
    await page.waitForSelector('h1', { timeout: 10000 });
    console.log('📄 Intro page loaded');

    // Add a small delay to ensure page is fully rendered
    await page.waitForTimeout(1000);

    // Take a screenshot to see what's on the page
    await page.screenshot({ path: 'assessment-intro.png' });
    console.log('📸 Screenshot saved as assessment-intro.png');

    // Click the "Start Assessment" link for individuals
    await page.click('text=Start Assessment');
    console.log('🎯 Clicked Start Assessment');

    // Wait for navigation to survey page
    await page.waitForURL('**/assessment/survey', { timeout: 5000 });
    console.log('📄 Navigated to survey page');

    // Take another screenshot to see the survey page
    await page.screenshot({ path: 'assessment-survey.png' });
    console.log('📸 Screenshot saved as assessment-survey.png');

    // Wait for first question to load - check the actual text
    await page.waitForSelector('h2', { timeout: 5000 });
    const questionText = await page.locator('h2').first().textContent();
    console.log(`Found question: "${questionText}"`);

    // Q1: Frequency (How often do you use AI tools?)
    // Find and click the radio button by looking for the input element
    const weeklyOption = await page.locator('input[type="radio"][value="3"]');
    await weeklyOption.click();
    console.log('📝 Selected Weekly frequency');

    // Wait a moment for the UI to update
    await page.waitForTimeout(500);

    // Click Next button
    await page.click('button >> text=Next');
    console.log('✅ Q1: Frequency answered');

    // Q2: Tool Familiarity (Which AI tools have you used?)
    await page.waitForSelector('h2:has-text("Which AI tools have you used?")', { timeout: 5000 });
    await page.locator('label:has-text("ChatGPT")').click();
    await page.locator('label:has-text("Claude")').click();
    await page.click('button:has-text("Next")');
    console.log('✅ Q2: Tools answered');

    // Q3: Task Complexity (Most complex AI task)
    await page.waitForSelector('h2:has-text("What\'s the most complex")', { timeout: 5000 });
    await page.locator('label:has-text("Created basic content")').click();
    await page.waitForSelector('button:has-text("Next")', { state: 'visible' });
    await page.click('button:has-text("Next")');
    console.log('✅ Q3: Task complexity answered');

    // Q4: Understanding (How would you explain AI?)
    await page.waitForSelector('h2:has-text("How would you explain")', { timeout: 5000 });
    await page.locator('label:has-text("recognizes patterns")').click();
    await page.waitForSelector('button:has-text("Next")', { state: 'visible' });
    await page.click('button:has-text("Next")');
    console.log('✅ Q4: Understanding answered');

    // Q5: Comfort Level (Learning new tools)
    await page.waitForSelector('h2:has-text("How comfortable are you")', { timeout: 5000 });
    await page.locator('label:has-text("Comfortable - I figure things out")').click();
    await page.waitForSelector('button:has-text("Next")', { state: 'visible' });
    await page.click('button:has-text("Next")');
    console.log('✅ Q5: Comfort level answered');

    // Q6: Verification (How do you verify AI content?)
    await page.waitForSelector('h2:has-text("How do you verify")', { timeout: 5000 });
    await page.locator('label:has-text("Quick review and basic edits")').click();
    await page.waitForSelector('button:has-text("Next")', { state: 'visible' });
    await page.click('button:has-text("Next")');
    console.log('✅ Q6: Verification answered');

    // Q7: Concerns (What concerns you about AI?)
    await page.waitForSelector('h2:has-text("What concerns you")', { timeout: 5000 });
    await page.locator('label:has-text("Privacy and data security")').click();
    await page.locator('label:has-text("Accuracy and reliability")').click();
    await page.click('button:has-text("Next")');
    console.log('✅ Q7: Concerns answered');

    // Q8: Priorities (60-day priorities)
    await page.waitForSelector('h2:has-text("In the next 60 days")', { timeout: 5000 });
    await page.locator('label:has-text("Understanding AI ethics")').click();
    await page.locator('label:has-text("Saving time on routine")').click();
    await page.click('button:has-text("Next")');
    console.log('✅ Q8: Priorities answered');

    // Q9: Role (Optional)
    await page.waitForSelector('h2:has-text("What\'s your role")', { timeout: 5000 });
    const roleInput = await page.locator('input[type="text"]').first();
    await roleInput.fill('Software Developer');
    await page.click('button:has-text("Next")');
    console.log('✅ Q9: Role answered');

    // Q10: Organization AI Usage (Optional)
    await page.waitForSelector('h2:has-text("How does your organization")', { timeout: 5000 });
    await page.locator('label:has-text("Several pilots")').click();
    await page.waitForSelector('button:has-text("Complete Assessment")', { state: 'visible' });

    // Submit assessment
    await page.click('button:has-text("Complete Assessment")');
    console.log('📤 Assessment submitted');

    // Wait for results page
    await page.waitForSelector('text=Assessment Complete', { timeout: 10000 });
    console.log('🎉 Results page loaded');

    // Get the results
    const level = await page.textContent('h2.text-3xl');
    const overallScore = await page.textContent('.text-5xl');

    console.log(`\n📊 Results:`);
    console.log(`   Level: ${level}`);
    console.log(`   Overall Score: ${overallScore}`);

    // Get dimension scores
    const operational = await page.locator('text=Operational').locator('..').locator('text=%').textContent();
    const conceptual = await page.locator('text=Conceptual').locator('..').locator('text=%').textContent();
    const governance = await page.locator('text=Governance').locator('..').locator('text=%').textContent();

    console.log(`   Operational: ${operational}`);
    console.log(`   Conceptual: ${conceptual}`);
    console.log(`   Governance: ${governance}`);

    console.log('\n✨ Assessment simulation completed successfully!');

    // Keep browser open for 5 seconds to see results
    await page.waitForTimeout(5000);

  } catch (error) {
    console.error('❌ Error during simulation:', error.message);
  } finally {
    await browser.close();
    console.log('🔒 Browser closed');
  }
}

// Run the simulation
simulateAssessment().catch(console.error);