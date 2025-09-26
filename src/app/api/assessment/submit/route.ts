/**
 * Assessment Submission API Route
 *
 * Handles POST requests to save completed assessment data to Google Sheets.
 * Implements rate limiting, validation, and human-readable response formatting.
 *
 * @module api/assessment/submit
 *
 * Features:
 * - Rate limiting (10 submissions per 15 minutes per IP)
 * - Zod schema validation
 * - Google Sheets integration
 * - Response mapping to human-readable format
 * - Secure error handling (no internal error exposure)
 *
 * @example
 * POST /api/assessment/submit
 * Body: { organization, responses, scores, level, timestamp }
 *
 * @returns {NextResponse} JSON response with success status
 */

import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import { assessmentSubmissionSchema } from '@/lib/validation/assessment-schema';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

export async function POST(request: Request) {
  try {
    // Rate limiting check
    const clientIp = getClientIp(request);
    const rateLimitResult = rateLimit(clientIp, {
      interval: 15 * 60 * 1000, // 15 minutes
      uniqueTokenPerInterval: 10 // 10 assessments per 15 min
    });

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Too many assessment submissions. Please try again later.',
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimitResult.reset).toISOString(),
          },
        }
      );
    }

    const body = await request.json();

    // Validate input with Zod
    const validationResult = assessmentSubmissionSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid assessment data',
          errors: validationResult.error.format()
        },
        { status: 400 }
      );
    }

    const {
      organization,
      responses,
      scores,
      level,
      timestamp
    } = validationResult.data;

    // Map numeric values to actual answer text for the new questions
    const frequencyMap: Record<number, string> = {
      0: 'Never',
      1: 'Rarely (a few times ever)',
      2: 'Monthly (1-3 times per month)',
      3: 'Weekly (1-3 times per week)',
      4: 'Daily or almost daily'
    };

    const taskComplexityMap: Record<number, string> = {
      0: "I haven't used AI tools",
      1: 'Asked simple questions or got quick answers',
      2: 'Created basic content (emails, summaries, lists)',
      3: 'Completed multi-step projects with heavy editing',
      4: 'Built AI workflows or trained others to use AI'
    };

    const understandingMap: Record<number, string> = {
      0: "I don't understand how AI works",
      1: "It's like a very smart computer or search engine",
      2: 'It recognizes patterns from large amounts of data',
      3: 'It generates responses based on training data, with inherent limitations and biases',
      4: 'I understand the technical architecture, training processes, and can explain trade-offs'
    };

    const comfortMap: Record<number, string> = {
      0: 'Very uncomfortable - I avoid new technology',
      1: 'Uncomfortable - I need lots of help and time',
      2: 'Neutral - I can learn with some guidance',
      3: 'Comfortable - I figure things out independently',
      4: 'Very comfortable - I enjoy exploring and teaching others'
    };

    const verificationMap: Record<number, string> = {
      0: "I don't use AI-generated content",
      1: 'Use it directly as-is if it looks good',
      2: 'Quick review and basic edits',
      3: "Thorough fact-checking and note it's AI-assisted",
      4: 'Complete verification with documentation and audit trail'
    };

    // Priority is now checkbox - no need for mapping

    const orgUsageMap: Record<number, string> = {
      0: 'No use yet',
      1: 'Individual staff experimenting informally',
      2: 'Small pilot(s) in one area',
      3: 'Several pilots across units',
      4: 'Operationalized in standard workflows (with safeguards)'
    };

    // Format data for spreadsheet - with human-readable answers matching the actual questions
    const row = [
      timestamp || new Date().toISOString(),
      organization || 'Individual',
      scores.operational,
      scores.conceptual,
      scores.governance,
      scores.overall,
      level,
      // Question responses in order - converted to human-readable text
      responses.frequency !== undefined ? frequencyMap[responses.frequency] || responses.frequency : '',  // Q1: Frequency (reordered!)
      responses.tool_familiarity ? responses.tool_familiarity.join(', ') : '',  // Q2: Tools used
      responses.task_complexity !== undefined ? taskComplexityMap[responses.task_complexity] || responses.task_complexity : '',  // Q3: Task complexity
      responses.understanding !== undefined ? understandingMap[responses.understanding] || responses.understanding : '',  // Q4: Understanding
      responses.comfort_level !== undefined ? comfortMap[responses.comfort_level] || responses.comfort_level : '',  // Q5: Comfort level
      responses.verification !== undefined ? verificationMap[responses.verification] || responses.verification : '',  // Q6: Verification
      responses.concerns ? responses.concerns.join(', ') : '',  // Q7: Concerns
      responses.priority ? responses.priority.join(', ') : '',  // Q8: Priority (now checkbox)
      responses.role || '',  // Q9: Role
      responses.org_ai_usage !== undefined ? orgUsageMap[responses.org_ai_usage] || responses.org_ai_usage : ''  // Q10: Org AI usage
    ];

    // Append to Google Sheet
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    if (!spreadsheetId) {
      throw new Error('Google Sheet ID not configured');
    }

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Responses!A:Q', // Columns A through Q (17 columns total)
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [row],
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Assessment saved successfully'
      },
      {
        headers: {
          'X-RateLimit-Limit': rateLimitResult.limit.toString(),
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': new Date(rateLimitResult.reset).toISOString(),
        },
      }
    );

  } catch (error) {
    // Log error for server-side monitoring (will only show in server logs, not exposed to client)
    if (process.env.NODE_ENV !== 'production') {
      console.error('Error saving to Google Sheets:', error);
    }

    // Don't expose internal errors to client
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to save assessment'
      },
      { status: 500 }
    );
  }
}