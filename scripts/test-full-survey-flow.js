const { chromium } = require('playwright');

async function testFullSurveyFlow() {
  const browser = await chromium.launch({ headless: false });

  console.log('\n=== Testing Full Survey Flow ===\n');

  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

  console.log('1. Navigate to assessment intro page...');
  await page.goto('http://localhost:3000/assessment');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);
  console.log('   ✓ On assessment intro page');

  console.log('\n2. Click "For Individuals" button...');
  await page.click('button:has-text("For Individuals")');
  await page.waitForURL('**/assessment/survey**');
  console.log('   ✓ Navigated to survey');

  console.log('\n3. Answering 10 questions...');

  // Q1: Frequency - Radio button
  console.log('   Q1: Frequency...');
  await page.click('input[value="daily"]');
  await page.waitForTimeout(500);

  // Q2: Tools Used - Checkboxes (select 3)
  console.log('   Q2: Tools Used...');
  await page.click('input[value="ChatGPT"]');
  await page.click('input[value="Claude"]');
  await page.click('input[value="Gemini"]');
  await page.click('button:has-text("Next")');
  await page.waitForTimeout(500);

  // Q3: Task Complexity - Radio button
  console.log('   Q3: Task Complexity...');
  await page.click('input[value="complex"]');
  await page.waitForTimeout(500);

  // Q4: Understanding - Radio button
  console.log('   Q4: Understanding...');
  await page.click('input[value="strong"]');
  await page.waitForTimeout(500);

  // Q5: Comfort Level - Radio button
  console.log('   Q5: Comfort Level...');
  await page.click('input[value="very_comfortable"]');
  await page.waitForTimeout(500);

  // Q7: Verification - Radio button
  console.log('   Q7: Verification...');
  await page.click('input[value="always"]');
  await page.waitForTimeout(500);

  // Q8: Concerns - Checkboxes (select 2)
  console.log('   Q8: Concerns...');
  await page.click('input[value="Privacy concerns"]');
  await page.click('input[value="Bias and fairness"]');
  await page.click('button:has-text("Next")');
  await page.waitForTimeout(500);

  // Q9: Priorities - Checkboxes (rank top 3)
  console.log('   Q9: Priorities...');
  await page.click('input[value="Learning AI skills"]');
  await page.click('input[value="Understanding AI limitations"]');
  await page.click('input[value="AI ethics and governance"]');
  await page.click('button:has-text("Next")');
  await page.waitForTimeout(500);

  // Q10: Role - Radio button
  console.log('   Q10: Role...');
  await page.click('input[value="manager"]');
  await page.waitForTimeout(500);

  // Q11: Org AI Usage - Radio button
  console.log('   Q11: Org AI Usage...');
  await page.click('input[value="actively_using"]');
  await page.waitForTimeout(500);

  console.log('   ✓ All 10 questions answered');

  console.log('\n4. Wait for processing screen...');
  await page.waitForTimeout(3000); // Wait for processing

  console.log('\n5. Check results page...');
  await page.waitForURL('**/assessment/results**', { timeout: 5000 });
  console.log('   ✓ On results page');

  const title = await page.textContent('h1');
  console.log('   ✓ Results title:', title);

  const hasRadarChart = await page.locator('.recharts-surface').count() > 0;
  console.log('   ✓ Radar chart present:', hasRadarChart);

  const hasShareButton = await page.locator('button:has-text("Share Results")').count() > 0;
  console.log('   ✓ Share button present:', hasShareButton);

  const hasRetakeButton = await page.locator('button:has-text("Retake Assessment")').count() > 0;
  console.log('   ✓ Retake button present:', hasRetakeButton);

  const hasCreateTeamButton = await page.locator('button:has-text("Create for Team")').count() > 0;
  console.log('   ✓ Create for Team button present:', hasCreateTeamButton);

  await page.screenshot({ path: 'test-full-flow-results.png', fullPage: true });
  console.log('   ✓ Screenshot saved: test-full-flow-results.png');

  console.log('\n✅ Full Survey Flow Test Complete!\n');

  await browser.close();
}

testFullSurveyFlow().catch(console.error);