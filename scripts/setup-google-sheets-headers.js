/**
 * Script to set up Google Sheets headers for RUDI Assessment
 * Run with: node scripts/setup-google-sheets-headers.js
 */

const { google } = require('googleapis');
require('dotenv').config({ path: '.env.local' });

async function setupHeaders() {
  try {
    // Initialize Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    if (!spreadsheetId) {
      console.error('❌ GOOGLE_SHEET_ID not found in environment variables');
      return;
    }

    // Define the headers
    const headers = [
      'Timestamp',
      'Organization',
      'Operational Score',
      'Conceptual Score',
      'Governance Score',
      'Overall Score',
      'Level',
      'Q1 - Frequency',
      'Q2 - Tools Used',
      'Q3 - Task Complexity',
      'Q4 - Understanding',
      'Q5 - Comfort Level',
      'Q6 - Verification',
      'Q7 - Concerns',
      'Q8 - Priorities',
      'Q9 - Role',
      'Q10 - Org AI Usage'
    ];

    console.log('📊 Setting up Google Sheets headers...');
    console.log(`📋 Sheet ID: ${spreadsheetId}`);

    // Update the first row with headers
    const response = await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: 'Responses!A1:Q1', // First row, columns A through Q
      valueInputOption: 'RAW',
      requestBody: {
        values: [headers], // Single row of headers
      },
    });

    console.log('✅ Headers successfully added!');
    console.log(`📍 Updated ${response.data.updatedCells} cells`);

    // Optional: Format the header row (bold, background color)
    const formatResponse = await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            // Make headers bold
            repeatCell: {
              range: {
                sheetId: 0, // First sheet
                startRowIndex: 0,
                endRowIndex: 1,
                startColumnIndex: 0,
                endColumnIndex: 17, // A through Q
              },
              cell: {
                userEnteredFormat: {
                  textFormat: {
                    bold: true,
                  },
                  backgroundColor: {
                    red: 0.95,
                    green: 0.95,
                    blue: 0.95,
                  },
                },
              },
              fields: 'userEnteredFormat(textFormat,backgroundColor)',
            },
          },
          {
            // Freeze the header row
            updateSheetProperties: {
              properties: {
                sheetId: 0,
                gridProperties: {
                  frozenRowCount: 1,
                },
              },
              fields: 'gridProperties.frozenRowCount',
            },
          },
        ],
      },
    });

    console.log('🎨 Headers formatted (bold, gray background, frozen row)');
    console.log('\n✨ Google Sheets setup complete!');
    console.log('📝 Your sheet is ready to receive assessment submissions');

  } catch (error) {
    console.error('❌ Error setting up headers:', error.message);
    if (error.code === 404) {
      console.error('   Make sure the sheet "Responses" exists in your spreadsheet');
    }
  }
}

// Run the setup
setupHeaders();