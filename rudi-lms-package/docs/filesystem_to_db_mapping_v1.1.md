# Filesystem to Database Mapping Guide v1.1
## PostgreSQL Implementation with All Fixes Applied

## Overview
This guide defines the complete, production-ready mapping from curriculum filesystem to PostgreSQL database, addressing all identified gaps and edge cases.

## Critical Rules

### Hierarchy
```
Program → Course → Lesson → Component → Asset
```

### Deterministic IDs (Use These Verbatim)
- **program_id**: Slug from root folder (e.g., `rudi_applied_genai_program`)
- **course_id**: `course_{NN}` from folder prefix (e.g., `Course_01_*` → `course_01`)
- **lesson_id**: `{course_id}_lesson_{XX[_Y]}` where XX.Y from folder/metadata (e.g., `03.1` → `course_01_lesson_03_1`)
- **component_id**: First 16 hex of SHA1(`{lesson_id}/{component_type}/{group_key}`)
- **asset_id**: First 16 hex of SHA1(`{component_id}/{relative_path}`)

### Canonical Asset Fields
- `lesson_id` (required)
- `component_id` (nullable)
- `relative_path` (required) - Full path relative to lesson folder
- `mime_type`
- `size_bytes` (required)
- `checksum_sha1` CHAR(40) (required) - Full SHA1, not truncated
- `order_index`
- `asset_role` (nullable) - ENUM: instruction, starter, solution, data, rubric, config, other
- **Uniqueness**: UNIQUE(lesson_id, relative_path) prevents collisions

## Directory Structure Pattern
```
RUDI_Applied_GenAI_Program/              # program_id: rudi_applied_genai_program
├── Course_01_AI_Foundations/            # course_id: course_01
│   ├── course_metadata.json             # Metadata ALWAYS overrides folder names
│   └── Lesson_03_1_Large_Language_Models/  # lesson_id: course_01_lesson_03_1
│       ├── lesson_metadata.json         # Authority for lesson_number, title, etc.
│       ├── learning/
│       │   ├── slides/                  # ONE slides component
│       │   │   ├── slide_001.png        # Individual assets, ordered
│       │   │   ├── slide_002.png
│       │   │   └── slide_075.png
│       │   ├── video.mp4                # ONE video component per file
│       │   ├── video_extra.mp4          # ANOTHER video component (if exists)
│       │   └── transcript.txt           # Asset of the video component
│       ├── lab/
│       │   ├── video.mp4                # Required
│       │   ├── transcript.txt           # Required
│       │   ├── instructions.md          # asset_role: instruction
│       │   ├── starter_code.py          # asset_role: starter
│       │   ├── solution.py              # asset_role: solution
│       │   ├── data.json                # asset_role: data
│       │   └── config.yaml              # asset_role: config
│       ├── assessments/
│       │   ├── quiz.md                  # quiz component
│       │   └── rubric.md                # Asset of quiz (asset_role: rubric)
│       └── resources/
│           └── [various files]          # One resource component
```

## Component Creation Rules

### Learning Section
- **Component Type**: `learning`
- **Group Key**: `learning/`
- **Required Assets**:
  - `learning/video*.mp4` (can be multiple)
  - `learning/transcript*.txt`
  - `learning/slides/*.png` (10-75 files)

**Multiple Videos Handling**: Create one `video` component per `.mp4` file found
```sql
-- If lesson has video.mp4 and video_extra.mp4:
component_1: type='video', group_key='learning/video.mp4'
component_2: type='video', group_key='learning/video_extra.mp4'
```

### Lab Section  
- **Component Type**: `lab`
- **Group Key**: `lab/`
- **Required Assets**:
  - `lab/video*.mp4`
  - `lab/transcript*.txt`
- **Optional Assets with Roles**:
  - instructions.md (role: instruction)
  - *.py files (role: starter/solution based on name)
  - *.json/*.yaml (role: data/config)

### Slides
- **Component Type**: `slides`
- **Group Key**: `learning/slides`
- **Assets**: Each PNG is an asset with `order_index` from filename sort

### Assessments
- **Quiz Component**: `assessments/quiz.md`
- **Rubric**: Treated as asset of quiz component with `asset_role='rubric'`

## Metadata Override Policy

**Golden Rule**: Metadata JSON files ALWAYS override folder-derived values

```python
# Pseudocode for lesson processing
if lesson_metadata.exists():
    lesson_number = lesson_metadata['lesson_number']  # Authority
    lesson_title = lesson_metadata['lesson_title']
else:
    lesson_number = parse_from_folder_name()  # Fallback
    lesson_title = parse_from_folder_name()

# Sort keys always computed from final lesson_number
lesson_seq, sub_seq = compute_sort_keys(lesson_number)
```

## Import Pipeline

### Phase 1: Scan & Stage
1. Create new `import_run` with UUID
2. Walk filesystem, ignoring noise files
3. Populate `components_import` and `assets_import` staging tables
4. Compute all checksums and sizes

### Phase 2: Diff & Detect Changes
```sql
-- Find changed assets by comparing checksums
SELECT ai.* FROM assets_import ai
JOIN assets a ON ai.lesson_id = a.lesson_id 
    AND ai.relative_path = a.relative_path
WHERE ai.checksum_sha1 != a.checksum_sha1
    AND ai.import_run_id = :run_id;
```

### Phase 3: Upsert
```sql
-- Idempotent insert with conflict handling
INSERT INTO assets (
    asset_id, component_id, lesson_id, relative_path,
    size_bytes, checksum_sha1, order_index, asset_role
)
SELECT ... FROM assets_import WHERE import_run_id = :run_id
ON CONFLICT (lesson_id, relative_path) DO UPDATE
SET 
    size_bytes = EXCLUDED.size_bytes,
    checksum_sha1 = EXCLUDED.checksum_sha1,
    updated_at = CURRENT_TIMESTAMP
WHERE assets.checksum_sha1 != EXCLUDED.checksum_sha1;
```

### Phase 4: Cleanup
```sql
-- Remove staging data
DELETE FROM assets_import WHERE import_run_id = :run_id;
DELETE FROM components_import WHERE import_run_id = :run_id;
UPDATE import_runs SET status = 'completed' WHERE import_run_id = :run_id;
```

## Files to Ignore

Always skip files matching these patterns:
- Hidden files: `/^\..*/ ` (starts with dot)
- System files: `.DS_Store`, `Thumbs.db`
- Temp files: `*.swp`, `*~`, `*.tmp`
- Directories: `__MACOSX`, `tmp`, `.git`

PostgreSQL function provided:
```sql
CREATE FUNCTION should_ignore_file(filename VARCHAR) 
RETURNS BOOLEAN AS $$
BEGIN
    RETURN filename ~ '^\.' 
        OR filename IN ('__MACOSX', 'tmp', '.DS_Store')
        OR filename ~ '\.(swp|tmp)$';
END;
$$ LANGUAGE plpgsql;
```

## Collision Prevention

### Hash Collision Guard
Despite using 16-char truncated SHA1 for IDs (collision probability ~10^-19 for 1M items):
- **Primary Guard**: UNIQUE(lesson_id, relative_path) on assets table
- **Secondary Guard**: UNIQUE(lesson_id, component_type, group_key) on components

### Path Collision Prevention  
- Normalize all paths to forward slashes
- Strip leading/trailing slashes
- Lowercase all extensions

## Edge Cases Handled

### Multiple Videos per Lesson
- Create separate video component for each .mp4 file
- Order by filename if no explicit ordering in metadata

### Missing Required Files
- Import proceeds but validation view flags incomplete components
- Query `component_validation` view to find issues

### Metadata Conflicts
- `lesson_metadata.json` beats folder name
- `course_metadata.json` beats folder name
- If both missing, derive from folder with warning

### Large Slide Decks (75+ slides)
- All slides go into single component
- Assets ordered by natural filename sort
- No hard limit on slide count

## Validation Queries

### Check Required Files
```sql
SELECT * FROM component_validation 
WHERE validation_status = 'Missing Required Files';
```

### Find Changed Files Since Last Import
```sql
SELECT 
    a.relative_path,
    a.checksum_sha1 as current,
    ai.checksum_sha1 as new
FROM assets a
JOIN assets_import ai ON a.lesson_id = ai.lesson_id 
    AND a.relative_path = ai.relative_path
WHERE a.checksum_sha1 != ai.checksum_sha1;
```

### Verify No Orphaned Assets
```sql
SELECT a.* FROM assets a
LEFT JOIN components c ON a.component_id = c.component_id
WHERE a.component_id IS NOT NULL 
    AND c.component_id IS NULL;
```

## PostgreSQL-Specific Features Used

1. **Native ENUMs** instead of lookup tables
2. **JSONB** for metadata storage (better than JSON)
3. **UUID** for import runs via uuid-ossp extension
4. **Generated Columns** for computed fields
5. **FILTER** clause for conditional aggregates
6. **ON CONFLICT** for upserts
7. **Stored procedures** in PL/pgSQL

## Import Script Interface

Your Python ETL should implement this interface:

```python
class CurriculumImporter:
    def __init__(self, db_conn, root_path):
        self.db = db_conn
        self.root_path = root_path
        self.import_run_id = self.create_import_run()
    
    def scan_filesystem(self) -> None:
        """Populate staging tables"""
        
    def compute_checksums(self) -> None:
        """SHA1 all files, store in staging"""
        
    def detect_changes(self) -> Dict:
        """Compare staging vs production"""
        
    def apply_changes(self) -> None:
        """Upsert from staging to production"""
        
    def cleanup(self) -> None:
        """Remove staging data"""
```

## Success Metrics

After import, these should be true:
1. Every lesson has required video + transcript files
2. No duplicate assets (same lesson_id + relative_path)
3. All checksums are 40 characters
4. No orphaned assets without components
5. lesson_seq/sub_seq properly computed for sorting

---

*This is the authoritative version 1.1 incorporating all fixes for production use with PostgreSQL.*