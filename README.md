# RUDI AI - Website

Professional AI certification and training platform. Static HTML website for RUDI AI - Responsible Use of Digital Intelligence.

## Overview

RUDI AI provides TechCred-eligible AI certifications across three levels:
- **Level 1: AI Literacy** - Foundation concepts and applications
- **Level 2: Applied AI** - Hands-on practice with real tools
- **Level 3: AI Assistants, Agents & Workflows** - Advanced implementation

## Project Structure

```
rudi-web/
├── index.html              # Landing page
├── certificates.html       # Certificate overview
├── certificates-business.html
├── certificates-education.html
├── contact.html
├── courses.html
├── framework.html
├── get-certificate.html
├── ohio.html              # Ohio TechCred information
├── research.html
├── resources.html
├── survey.html            # AI literacy survey (public)
├── survey-admin.html      # Survey link generator (admin only)
├── credentials.json       # Google service account (gitignored)
├── scripts/               # Setup and utility scripts
│   └── setup-sheet.js    # Google Sheets setup script
├── css/                   # Stylesheets
├── js/                    # JavaScript modules
│   └── config.js         # Survey configuration
├── images/                # Site images
├── assets/                # Certificates and other assets
├── tools/                 # Development tools
│   ├── certificate-tools/
│   └── qr-tools/
└── docs/                  # Documentation
    ├── assessment/        # Assessment and testing docs
    ├── business-strategy/ # Business plans and strategies
    ├── codecamp/          # Course content
    ├── design/            # Design assets and specs
    ├── planning/          # Project planning docs
    ├── project-docs/      # Technical documentation
    ├── survey-outline.txt # Survey questions
    └── setup/             # Setup guides
```

## Quick Start

This is a static HTML website. No build process required.

### Local Development

Simply open `index.html` in a web browser, or use a local server:

```bash
# Using Python 3
python3 -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js http-server
npx http-server -p 8000
```

Then visit `http://localhost:8000`

## Deployment

Deployed on Vercel. The site is static HTML/CSS/JS with no build step.

### Deploy to Vercel

```bash
vercel
```

Or push to the connected GitHub repository for automatic deployment.

## Features

- Professional AI certification programs
- Ohio TechCred partnership information
- Two certification paths: Business and Education
- Certificate verification system
- **AI Literacy Survey System** - Anonymous surveys with Google Sheets integration
- Contact forms and inquiry handling
- Responsive design

## Survey System

The RUDI Survey System allows you to create custom anonymous AI literacy surveys for organizations.

### Quick Start

1. **Create survey links**: Open `survey-admin.html` to generate custom survey links
2. **View responses**: Check the [Google Sheet](https://docs.google.com/spreadsheets/d/1LC-kPwyQZG3w8TnA46wE6bXiajC9A0M3eb6dXZrhG-s) for real-time results
3. **Share links**: Send custom survey URLs to organizations

### Setup

```bash
# Install dependencies
npm install

# Configure Google Sheet
node scripts/setup-sheet.js <SHEET_ID>

# Update webhook URL in js/config.js
```

For detailed setup instructions, see [SURVEY-README.md](SURVEY-README.md) and [GOOGLE-SHEETS-SETUP.md](GOOGLE-SHEETS-SETUP.md).

## Documentation

See `/docs` directory for:
- Assessment strategy and question banks
- Business strategy and launch plans
- Course content and syllabi
- Design specifications
- Project documentation
- Setup instructions

## Environment

No environment variables required for the static site.

Sensitive credentials (if any) are stored in `.secure/` (gitignored).

## License

MIT

## Contact

RUDI AI - Responsible Use of Digital Intelligence
- Website: https://rudi.ai
- Ohio Partnership: https://upskill-ohio.vercel.app
