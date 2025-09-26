# Content vs System Architecture

## 🏗️ The LMS System (This Package)
The `rudi-lms-package` contains the **LMS platform** - the system that hosts and delivers ANY curriculum:

```
rudi-lms-package/           # THE SYSTEM
├── prisma/                # Database schema (works for ANY program)
├── importer.ts            # Import tool (works for ANY curriculum)
├── metadata_templates/    # Templates for creating new programs
│   ├── program_metadata_template.json
│   ├── course_metadata_template.json  
│   ├── lesson_metadata_template.json
│   └── component_metadata_template.json
└── [system files]
```

## 📚 The Curriculum Content (Separate)
The actual educational content lives separately and can have MULTIPLE programs:

```
Content Repository/         # THE CONTENT
├── RUDI_Applied_GenAI_Program/       # Program 1
│   ├── program_metadata.json
│   ├── Course_01_AI_Foundations/
│   ├── Course_02_Prompting_Mastery/
│   └── ...
│
├── Advanced_ML_Engineering_Program/   # Program 2 (hypothetical)
│   ├── program_metadata.json
│   ├── Course_01_Deep_Learning/
│   └── ...
│
└── Executive_AI_Strategy_Program/     # Program 3 (hypothetical)
    ├── program_metadata.json
    └── Course_01_AI_Business_Strategy/
```

## 🔄 How They Work Together

### 1. System Setup (One Time)
```bash
# Install the LMS system
cd rudi-lms-package
npm install
npx prisma migrate dev
```

### 2. Import Any Program
```bash
# Import RUDI program
npx ts-node importer.ts ../RUDI_Applied_GenAI_Program

# Import another program
npx ts-node importer.ts ../Advanced_ML_Engineering_Program

# Import third program
npx ts-node importer.ts ../Executive_AI_Strategy_Program
```

## 📋 Metadata Templates Hierarchy

### Level 1: Program Metadata
`program_metadata_template.json` defines:
- Program identity (id, name, version)
- Organization details
- Program structure (tracks, total courses)
- Certification requirements
- Pricing tiers
- Support options

### Level 2: Course Metadata  
`course_metadata_template.json` defines:
- Course identity (id, number, title)
- Prerequisites
- Learning objectives
- Total lessons
- Track assignment

### Level 3: Lesson Metadata
`lesson_metadata_template.json` defines:
- Lesson number (supports "03.1" format)
- Title and description
- Duration
- Difficulty level
- Component inventory (has_video, has_lab, etc.)

### Level 4: Component Metadata
`component_metadata_template.json` defines:
- Component type (VIDEO, SLIDES, LAB, QUIZ, RESOURCE)
- Asset details
- Requirements
- Order/sequence

## 🎯 For Your Dev Team

### What to Build
1. **LMS Platform** using the schema
2. **Import Pipeline** using importer.ts
3. **Admin UI** for managing content
4. **Student UI** for consuming content

### What They DON'T Build
- The curriculum content itself
- The folder structure of courses
- The actual videos, slides, labs

### How to Add New Programs
1. Create new program folder following the structure
2. Add `program_metadata.json` using the template
3. Add courses with `course_metadata.json`
4. Add lessons with `lesson_metadata.json`
5. Run importer: `npx ts-node importer.ts /path/to/new/program`

## 📦 Deployment Scenarios

### Scenario 1: Single Program
```
Production Server/
├── lms-system/           # The platform
└── content/
    └── RUDI_Applied_GenAI_Program/
```

### Scenario 2: Multiple Programs
```
Production Server/
├── lms-system/           # One platform
└── content/
    ├── RUDI_Applied_GenAI_Program/
    ├── Advanced_ML_Engineering_Program/
    └── Executive_AI_Strategy_Program/
```

### Scenario 3: Multi-Tenant SaaS
```
Production Server/
├── lms-system/           # One platform
└── organizations/
    ├── org1/
    │   └── Custom_Training_Program/
    ├── org2/
    │   └── Internal_AI_Program/
    └── org3/
        ├── RUDI_Applied_GenAI_Program/
        └── Advanced_Topics_Program/
```

## 🔑 Key Insight

**The LMS system (this package) is program-agnostic!**

- Same schema works for ANY program
- Same importer works for ANY curriculum structure
- Templates ensure consistency across programs
- Multi-tenant ready for hosting multiple organizations

## 📝 Creating a New Program

1. Copy `metadata_templates/` to your new program folder
2. Rename and fill out:
   - `program_metadata_template.json` → `program_metadata.json`
   - Use `course_metadata_template.json` for each course
   - Use `lesson_metadata_template.json` for each lesson
3. Follow the folder naming convention:
   - `Course_XX_Name/`
   - `Lesson_YY_Name/`
4. Import with: `npx ts-node importer.ts /path/to/program`

---

**Summary**: The LMS package is the engine. Programs are the fuel. You can run many different programs on the same engine!