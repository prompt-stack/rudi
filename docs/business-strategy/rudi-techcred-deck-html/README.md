# RUDI TechCred Materials

**Purpose:** Complete collection of TechCred materials including presentation deck and one-pagers
**Version:** 3.0 (Organized folder structure)
**Last Updated:** 2025-10-14

---

## 📂 **FOLDER STRUCTURE**

```
rudi-techcred-deck-html/
├── README.md                          ← You are here
├── CLEANUP-SUMMARY.md                 ← Organization change log
│
├── deck-slides/                       ← Presentation Deck (17 slides)
│   ├── index-new.html                 ← MAIN DECK (open in browser)
│   └── slide-XX-name.html             ← 17 individual slide files
│
├── one-pagers/                        ← TechCred One-Page Overviews
│   ├── landscape/                     ← 11x8.5 (for presentations)
│   │   ├── TECHCRED-ONE-PAGER-LANDSCAPE-RUDI.html
│   │   └── TECHCRED-ONE-PAGER-LANDSCAPE-DIDYOUKNOW.html
│   ├── portrait/                      ← 8.5x11 (for handouts)
│   │   ├── TECHCRED-ONE-PAGER-RUDI.html
│   │   └── TECHCRED-ONE-PAGER-DIDYOUKNOW.html
│   └── docs/                          ← Documentation
│       ├── TECHCRED-OPPORTUNITY-BRIEF.md
│       └── TECHCRED-DOCS-UPDATED.md
│
├── pdf/                               ← Generated PDFs
│   ├── deck-slides/
│   │   └── rudi-techcred-deck-combined-all-pages.pdf
│   └── one-pagers/
│       ├── landscape/                 ← 4 PDF versions
│       └── portrait/                  ← (RUDI + DidYouKnow)
│
├── png/                               ← Generated PNGs (if any)
├── archive/                           ← Deprecated files
└── docs/                              ← Deck documentation
```

---

## 🚀 **QUICK START**

### **For Presentations (Slide Deck):**
1. Open `deck-slides/index-new.html` in browser
2. Navigate through 17 slides using sidebar
3. Use for live presentations with organizations

### **For One-Page Handouts:**

**Choose the right version:**

| File | Format | Contact | Use Case |
|------|--------|---------|----------|
| `TECHCRED-ONE-PAGER-LANDSCAPE-RUDI.html` | 11x8.5 | learnrudi@gmail.com | Presentation slide |
| `TECHCRED-ONE-PAGER-LANDSCAPE-DIDYOUKNOW.html` | 11x8.5 | wshoecraft + phone | Presentation slide |
| `TECHCRED-ONE-PAGER-RUDI.html` | 8.5x11 | learnrudi@gmail.com | Print handout |
| `TECHCRED-ONE-PAGER-DIDYOUKNOW.html` | 8.5x11 | wshoecraft + phone | Print handout |

**All PDFs are ready in `/pdf/one-pagers/`**

---

## 📋 **ONE-PAGER VERSIONS**

### **Contact Information:**

**RUDI Version:**
- Email: learnrudi@gmail.com
- No phone number
- General RUDI inquiries

**DidYouKnow Version:**
- Email: wshoecraft@didyouknowpublishing.com
- Phone: 513.834.5349
- Direct contact to William Shoecraft

### **Format Options:**

**Landscape (11x8.5):**
- Best for: Presentations, screen sharing, email attachments
- Optimized for: Horizontal display, projectors
- Two-column layout for efficient use of space

**Portrait (8.5x11):**
- Best for: Print handouts, physical documents
- Optimized for: Standard letter-size printing
- Traditional document format

### **Content (All Versions):**
- The Opportunity ($2K/employee, $30K/window, $180K/year)
- Next Application Window (Nov 3 - Dec 1, 2025)
- How It Works (4 steps)
- TechCred-Eligible AI Credentials (7 types, 52 total)
- Credentialing Partner (RUDI)
- Real-world example
- Call to action

---

## 🎬 **PRESENTATION DECK**

**Location:** `deck-slides/index-new.html`
**Slides:** 17 total across 5 sections

### **Section 1: WHO WE ARE (Slides 1-3)**
- Cover slide with RUDI identity
- What is RUDI? (capabilities & curriculum)
- Why RUDI is Different (6 differentiators)

### **Section 2: THE OPPORTUNITY (Slides 4-7)**
- State-Funded AI Training (TechCred intro)
- TechCred Eligible (52 credentials covered)
- Flexible Pricing & Reimbursement (up to $180K/year)
- TechCred Support (assistance provided)

### **Section 3: WHAT WE OFFER (Slides 8-11)**
- Three Certification Pathways (visual roadmap)
- AI Literacy Certificate (Level 1)
- Applied GenAI Certificate (Level 2)
- AI Leadership Certificate (Level 3)

### **Section 4: HOW IT WORKS (Slides 12-14)**
- RUDI Framework (3-domain approach)
- Training Delivery Formats (session types)
- Customization Process (4-step tailoring)

### **Section 5: NEXT STEPS (Slides 15-17)**
- Flexible Pricing (reminder)
- Timeline & Deadlines (application windows)
- Contact Information (get started)

**Target Audience:** Non-technical leaders, HR directors, training coordinators
**Presentation Time:** 20-30 minutes (full walkthrough)

---

## 🛠️ **GENERATING PDFS**

### **For Landscape One-Pagers (11x8.5):**
```bash
cd "/Users/hoff/Desktop/My Drive/tools/web-export/html-artboard-export-11x8.5/src/scripts"
python3 "Artboard Export Tool.py" "/path/to/one-pagers/landscape/FILE.html" --pdf-only
```

### **For Portrait One-Pagers (8.5x11):**
```bash
cd "/Users/hoff/Desktop/My Drive/tools/web-export/html-artboard-export-8.5x11/src/scripts"
python3 "Artboard Export Tool.py" "/path/to/one-pagers/portrait/FILE.html" --pdf-only
```

### **For Deck Slides (16:9):**
```bash
cd "/Users/hoff/Desktop/My Drive/tools/web-export/html-artboard-export-16x9/src/scripts"
python3 "Artboard Export Tool.py" "/path/to/deck-slides/index-new.html" --pdf-only
```

---

## 📖 **DOCUMENTATION**

### **Deck Documentation** (`/docs/`)
- **DECK-AUDIT.md** - Complete file inventory and content analysis
- **DECK-REORGANIZATION.md** - Restructuring rationale
- **DECK-REVIEW.md** - Original content review
- **DECK-UPDATES.md** - Detailed change log

### **One-Pager Documentation** (`/one-pagers/docs/`)
- **TECHCRED-OPPORTUNITY-BRIEF.md** - Detailed 2-page guide
- **TECHCRED-DOCS-UPDATED.md** - Process corrections and updates

---

## ✅ **QUALITY CHECKS**

### **All Materials:**
- ✅ "State-Funded" (not "Free") AI Training
- ✅ Clear approval language (no jargon)
- ✅ AI for Education credential included (7 types total)
- ✅ Clean, non-overwhelming color scheme
- ✅ Correct contact information for each version
- ✅ November 3 - December 1, 2025 application window
- ✅ Consistent RUDI branding

---

## 🔧 **CUSTOMIZATION**

### **To Modify One-Pagers:**
1. Edit HTML files in `one-pagers/landscape/` or `one-pagers/portrait/`
2. Regenerate PDFs using export tools above
3. All versions use consistent styling (Inter font, navy blue #1e3a8a)

### **To Modify Deck Slides:**
1. Edit individual HTML files in `deck-slides/`
2. Changes appear immediately when refreshing browser
3. Update `index-new.html` if adding/removing slides

---

## 📧 **CONTACT**

**RUDI General:**
- Email: learnrudi@gmail.com
- Website: https://rudi-web.vercel.app/

**William Shoecraft (DidYouKnow Publishing):**
- Email: wshoecraft@didyouknowpublishing.com
- Phone: 513.834.5349

**Organization:** Institute for the Responsible Use of Digital Intelligence (RUDI)

---

## 📝 **VERSION HISTORY**

### **Version 3.0** (2025-10-14)
- Organized folder structure (deck-slides, one-pagers)
- Created 4 one-pager versions (RUDI + DidYouKnow, landscape + portrait)
- All PDFs generated and organized
- Updated README with complete documentation

### **Version 2.0** (2025-10-14)
- Complete reorganization for non-technical audiences
- 5 new slides created
- Pricing changed to flexible model
- All conflicts resolved

### **Version 1.5** (2025-10-13)
- Added TechCred Support slide
- Added Timeline & Deadlines slide
- Added Pricing & Packaging slide

### **Version 1.0** (Original)
- Initial deck creation
- 13 slides, single navigation

---

## 🎯 **RECOMMENDATIONS**

**For first meetings with organizations:**
- Present using `deck-slides/index-new.html`
- Leave behind landscape one-pager PDF (email or print)
- Use RUDI version for general inquiries
- Use DidYouKnow version for direct William contact

**For follow-up materials:**
- Email portrait PDF (easier to read as attachment)
- Include link to rudi-web.vercel.app
- Reference TECHCRED-OPPORTUNITY-BRIEF.md for detailed info

**For presentations:**
- Use deck for comprehensive walkthrough (20-30 min)
- Use landscape one-pager for quick overview (5 min)
- Both formats work well with projectors

---

**All materials are ready to use!**
