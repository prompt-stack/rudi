-- Import script for Module 01: AI Foundations
-- This script shows how to format and import curriculum data into the database

-- 1. Create the course (module)
INSERT INTO courses (
    title,
    slug,
    description,
    thumbnail_url,
    duration_minutes,
    access_scope,
    price_cents,
    is_published,
    is_featured,
    order_index
) VALUES (
    'Module 01: AI Foundations',
    'module-01-ai-foundations',
    'Master the fundamental concepts of artificial intelligence, from basic principles to modern LLMs.',
    'https://your-cdn.com/thumbnails/ai-foundations.jpg', -- You'll need to upload this
    180, -- Total duration in minutes (calculated from all videos)
    'course:ai-foundations', -- or 'library:all' for full library access
    9700, -- $97.00 in cents
    true,
    true,
    1
) RETURNING id AS course_id;

-- 2. Insert videos (lessons) for each topic
-- You'll need to get the course_id from above, or use a subquery

-- Example for 01_Introduction_to_AI/
WITH course AS (
    SELECT id FROM courses WHERE slug = 'module-01-ai-foundations'
)
INSERT INTO videos (
    course_id,
    title,
    description,
    video_provider,
    provider_asset_id,
    duration_seconds,
    is_preview,
    is_required,
    order_index,
    transcript_storage_path,
    captions_vtt_path
) 
SELECT 
    course.id,
    title,
    description,
    video_provider,
    provider_asset_id,
    duration_seconds,
    is_preview,
    is_required,
    order_index,
    transcript_storage_path,
    captions_vtt_path
FROM course, (VALUES
    -- 01_Introduction_to_AI lessons
    ('Evolution of Intelligence', 
     'Explore the journey from basic computation to modern AI systems',
     'cloudflare', -- or 'mux', 'youtube', 'vimeo'
     'cloudflare-stream-id-here', -- You'll get this after uploading to Cloudflare Stream
     343, -- duration from lesson_info.md
     true, -- is_preview (first lesson could be free preview)
     true, -- is_required
     1, -- order_index
     'transcripts/module-01/01-evolution-intelligence.txt',
     'captions/module-01/01-evolution-intelligence.vtt'
    ),
    
    -- 02_Foundations_of_AI lessons
    ('What is Intelligence?',
     'Understanding the core concepts of intelligence in artificial systems',
     'cloudflare',
     'cloudflare-stream-id-2',
     420, -- Replace with actual duration
     false,
     true,
     2,
     'transcripts/module-01/02-what-is-intelligence.txt',
     'captions/module-01/02-what-is-intelligence.vtt'
    ),
    
    -- Continue for all lessons...
    
) AS v(title, description, video_provider, provider_asset_id, duration_seconds, is_preview, is_required, order_index, transcript_storage_path, captions_vtt_path);

-- 3. Add content assets (transcripts, slides, labs)
WITH video_data AS (
    SELECT v.id as video_id, v.order_index
    FROM videos v
    JOIN courses c ON v.course_id = c.id
    WHERE c.slug = 'module-01-ai-foundations'
)
INSERT INTO content_assets (
    video_id,
    asset_type,
    title,
    description,
    file_path,
    storage_bucket,
    is_downloadable,
    access_level,
    position,
    metadata
)
SELECT 
    video_id,
    asset_type,
    title,
    description,
    file_path,
    storage_bucket,
    is_downloadable,
    access_level,
    position,
    metadata
FROM (
    -- Transcript for lesson 1
    SELECT 
        (SELECT video_id FROM video_data WHERE order_index = 1),
        'transcript'::text,
        'Lesson Transcript'::text,
        'Full transcript of the Evolution of Intelligence lesson'::text,
        'module-01/01-introduction/transcript.txt'::text,
        'transcripts'::text,
        true::boolean,
        'enrolled'::text,
        0::integer,
        '{"format": "text", "language": "en"}'::jsonb
    
    UNION ALL
    
    -- Slides for lesson 1
    SELECT 
        (SELECT video_id FROM video_data WHERE order_index = 1),
        'slides',
        'Presentation Slides',
        'PDF slides for Evolution of Intelligence',
        'module-01/01-introduction/slides.pdf',
        'slides',
        true,
        'enrolled',
        1,
        '{"slides_count": 19, "format": "pdf"}'::jsonb
    
    UNION ALL
    
    -- Lab instructions for lesson 1 (if exists)
    SELECT 
        (SELECT video_id FROM video_data WHERE order_index = 1),
        'lab_instructions',
        'Lab: Exploring AI History',
        'Hands-on exploration of AI evolution',
        'module-01/01-introduction/lab/instructions.pdf',
        'course-materials',
        true,
        'enrolled',
        2,
        '{"estimated_time": "30 minutes", "difficulty": "beginner"}'::jsonb
    
    -- Continue for all assets...
) AS assets;