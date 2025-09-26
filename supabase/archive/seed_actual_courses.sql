-- ACTUAL COURSE CATALOG SEED DATA
-- Based on your LLM-Ops curriculum structure
-- Upload videos to Cloudflare Stream and replace the IDs below

-- =========================================
-- MAIN COURSE: LLM-OPS COMPLETE
-- =========================================
INSERT INTO courses (
    slug,
    title,
    description,
    duration_minutes,
    access_scope,
    price_cents,
    is_published,
    is_featured,
    order_index,
    thumbnail_url
) VALUES (
    'llm-ops-complete',
    'LLM-Ops: Complete AI Engineering Course',
    'Master AI engineering from foundations to professional deployment. Includes AI fundamentals, prompting mastery, CS basics, development environment setup, and hands-on business applications.',
    180, -- 3 hours of video
    'course:llm-ops-complete',
    39700, -- $397 in cents
    true,
    true,
    1,
    '/images/courses/llm-ops-complete.jpg'
) ON CONFLICT (slug) DO NOTHING;

-- =========================================
-- MODULE 1: AI FOUNDATIONS
-- =========================================
INSERT INTO courses (
    slug,
    title,
    description,
    duration_minutes,
    access_scope,
    price_cents,
    is_published,
    is_featured,
    order_index
) VALUES (
    'ai-foundations',
    'Module 1: AI Foundations',
    'Understand AI fundamentals, large language models, limitations, and responsible AI practices.',
    60,
    'course:ai-foundations',
    9700, -- $97 standalone
    true,
    false,
    2
) ON CONFLICT (slug) DO NOTHING;

-- =========================================
-- MODULE 2: PROMPTING MASTERY
-- =========================================
INSERT INTO courses (
    slug,
    title,
    description,
    duration_minutes,
    access_scope,
    price_cents,
    is_published,
    is_featured,
    order_index
) VALUES (
    'prompting-mastery',
    'Module 2: Prompting Mastery',
    'Master the art of prompt engineering with advanced techniques and practical exercises.',
    30,
    'course:prompting-mastery',
    4700, -- $47 standalone
    true,
    false,
    3
) ON CONFLICT (slug) DO NOTHING;

-- =========================================
-- BUSINESS TRACK BUNDLE
-- =========================================
INSERT INTO courses (
    slug,
    title,
    description,
    duration_minutes,
    access_scope,
    price_cents,
    is_published,
    is_featured,
    order_index
) VALUES (
    'business-track',
    'AI Business Track: Practical Applications',
    'Real-world AI applications for research, marketing, finance, sales, and rapid prototyping.',
    35,
    'bundle:business-track',
    14700, -- $147 for bundle
    true,
    true,
    4
) ON CONFLICT (slug) DO NOTHING;

-- =========================================
-- POPULATE VIDEOS FOR EACH COURSE
-- =========================================

DO $$
DECLARE
    llm_ops_id UUID;
    ai_foundations_id UUID;
    prompting_id UUID;
    business_id UUID;
BEGIN
    -- Get course IDs
    SELECT id INTO llm_ops_id FROM courses WHERE slug = 'llm-ops-complete';
    SELECT id INTO ai_foundations_id FROM courses WHERE slug = 'ai-foundations';
    SELECT id INTO prompting_id FROM courses WHERE slug = 'prompting-mastery';
    SELECT id INTO business_id FROM courses WHERE slug = 'business-track';
    
    -- =========================================
    -- AI FOUNDATIONS VIDEOS
    -- =========================================
    INSERT INTO videos (course_id, title, description, video_provider, provider_asset_id, duration_seconds, is_preview, is_required, order_index)
    VALUES 
    -- Module 1 Videos
    (ai_foundations_id, 'Introduction to AI', 'What is artificial intelligence and how does it work?', 'cloudflare', 'REPLACE_AI_INTRO_ID', 360, true, true, 1),
    (ai_foundations_id, 'Foundations of AI', 'Core concepts and different types of AI systems', 'cloudflare', 'REPLACE_AI_FOUNDATIONS_ID', 420, false, true, 2),
    (ai_foundations_id, 'Large Language Models', 'Understanding LLMs like GPT and Claude', 'cloudflare', 'REPLACE_LLM_ID', 480, false, true, 3),
    (ai_foundations_id, 'LLM Limitations', 'Critical limitations you must understand', 'cloudflare', 'REPLACE_LIMITATIONS_ID', 360, false, true, 4),
    (ai_foundations_id, 'Responsible AI', 'Ethics, bias, and responsible deployment', 'cloudflare', 'REPLACE_RESPONSIBLE_ID', 300, false, true, 5)
    ON CONFLICT DO NOTHING;

    -- Also add to complete course
    INSERT INTO videos (course_id, title, description, video_provider, provider_asset_id, duration_seconds, is_preview, is_required, order_index)
    VALUES 
    (llm_ops_id, 'Course Introduction', 'Welcome to LLM-Ops', 'cloudflare', 'REPLACE_COURSE_INTRO_ID', 300, true, false, 1),
    (llm_ops_id, 'Introduction to AI', 'What is artificial intelligence?', 'cloudflare', 'REPLACE_AI_INTRO_ID', 360, false, true, 2),
    (llm_ops_id, 'Foundations of AI', 'Core concepts', 'cloudflare', 'REPLACE_AI_FOUNDATIONS_ID', 420, false, true, 3),
    (llm_ops_id, 'Large Language Models', 'Understanding LLMs', 'cloudflare', 'REPLACE_LLM_ID', 480, false, true, 4),
    (llm_ops_id, 'LLM Limitations', 'Critical limitations', 'cloudflare', 'REPLACE_LIMITATIONS_ID', 360, false, true, 5)
    ON CONFLICT DO NOTHING;

    -- =========================================
    -- PROMPTING MASTERY VIDEOS
    -- =========================================
    INSERT INTO videos (course_id, title, description, video_provider, provider_asset_id, duration_seconds, is_preview, is_required, order_index)
    VALUES 
    (prompting_id, 'Introduction to Prompting', 'The fundamentals of effective prompting', 'cloudflare', 'REPLACE_PROMPT_INTRO_ID', 360, true, true, 1),
    (prompting_id, 'Prompt Engineering', 'Advanced prompt engineering techniques', 'cloudflare', 'REPLACE_PROMPT_ENG_ID', 600, false, true, 2),
    (prompting_id, 'Advanced Techniques', 'Chain-of-thought, few-shot, and more', 'cloudflare', 'REPLACE_ADVANCED_ID', 540, false, true, 3)
    ON CONFLICT DO NOTHING;

    -- Also add to complete course
    INSERT INTO videos (course_id, title, description, video_provider, provider_asset_id, duration_seconds, is_preview, is_required, order_index)
    VALUES 
    (llm_ops_id, 'Introduction to Prompting', 'Prompting fundamentals', 'cloudflare', 'REPLACE_PROMPT_INTRO_ID', 360, false, true, 6),
    (llm_ops_id, 'Prompt Engineering', 'Advanced techniques', 'cloudflare', 'REPLACE_PROMPT_ENG_ID', 600, false, true, 7),
    (llm_ops_id, 'Advanced Prompting', 'Master-level prompting', 'cloudflare', 'REPLACE_ADVANCED_ID', 540, false, true, 8)
    ON CONFLICT DO NOTHING;

    -- =========================================
    -- BUSINESS TRACK VIDEOS
    -- =========================================
    INSERT INTO videos (course_id, title, description, video_provider, provider_asset_id, duration_seconds, is_preview, is_required, order_index)
    VALUES 
    (business_id, 'AI-Powered Research', 'Transform your research workflow with AI', 'cloudflare', 'REPLACE_RESEARCH_ID', 420, true, true, 1),
    (business_id, 'AI Marketing Automation', 'Create compelling marketing content at scale', 'cloudflare', 'REPLACE_MARKETING_ID', 480, false, true, 2),
    (business_id, 'AI Financial Analysis', 'Analyze financial data and generate insights', 'cloudflare', 'REPLACE_FINANCE_ID', 360, false, true, 3),
    (business_id, 'AI-Powered Sales Workflow', 'Supercharge your sales process', 'cloudflare', 'REPLACE_SALES_ID', 420, false, true, 4),
    (business_id, 'Rapid Prototyping Revolution', 'Build MVPs in hours, not months', 'cloudflare', 'REPLACE_PROTOTYPE_ID', 420, false, true, 5)
    ON CONFLICT DO NOTHING;

    -- Also add business track to complete course
    INSERT INTO videos (course_id, title, description, video_provider, provider_asset_id, duration_seconds, is_preview, is_required, order_index)
    VALUES 
    (llm_ops_id, 'AI-Powered Research', 'Business application', 'cloudflare', 'REPLACE_RESEARCH_ID', 420, false, false, 20),
    (llm_ops_id, 'AI Marketing Automation', 'Business application', 'cloudflare', 'REPLACE_MARKETING_ID', 480, false, false, 21),
    (llm_ops_id, 'AI Financial Analysis', 'Business application', 'cloudflare', 'REPLACE_FINANCE_ID', 360, false, false, 22),
    (llm_ops_id, 'AI Sales Workflow', 'Business application', 'cloudflare', 'REPLACE_SALES_ID', 420, false, false, 23),
    (llm_ops_id, 'Rapid Prototyping', 'Business application', 'cloudflare', 'REPLACE_PROTOTYPE_ID', 420, false, false, 24)
    ON CONFLICT DO NOTHING;

    -- =========================================
    -- CS FUNDAMENTALS VIDEOS (from Module 3)
    -- =========================================
    INSERT INTO videos (course_id, title, description, video_provider, provider_asset_id, duration_seconds, is_preview, is_required, order_index)
    VALUES 
    (llm_ops_id, 'Abstraction Concepts', 'Understanding abstraction in programming', 'cloudflare', 'REPLACE_ABSTRACTION_ID', 420, false, true, 9),
    (llm_ops_id, 'Data Structures', 'Essential data structures for AI', 'cloudflare', 'REPLACE_DATA_STRUCT_ID', 480, false, true, 10),
    (llm_ops_id, 'Algorithms Basics', 'Core algorithms you need to know', 'cloudflare', 'REPLACE_ALGORITHMS_ID', 420, false, true, 11),
    (llm_ops_id, 'APIs Explained', 'How APIs power AI applications', 'cloudflare', 'REPLACE_APIS_ID', 360, false, true, 12),
    (llm_ops_id, 'Client-Server Architecture', 'Understanding modern app architecture', 'cloudflare', 'REPLACE_CLIENT_SERVER_ID', 360, false, true, 13)
    ON CONFLICT DO NOTHING;

    -- =========================================
    -- DEVELOPMENT ENVIRONMENT VIDEOS (from Module 4)
    -- =========================================
    INSERT INTO videos (course_id, title, description, video_provider, provider_asset_id, duration_seconds, is_preview, is_required, order_index)
    VALUES 
    (llm_ops_id, 'Terminal Basics', 'Master the command line', 'cloudflare', 'REPLACE_TERMINAL_ID', 420, false, true, 14),
    (llm_ops_id, 'Git and GitHub', 'Version control for AI projects', 'cloudflare', 'REPLACE_GIT_ID', 480, false, true, 15),
    (llm_ops_id, 'Package Management', 'Building your AI toolbox', 'cloudflare', 'REPLACE_PACKAGE_ID', 360, false, true, 16),
    (llm_ops_id, 'AI Dev Environments', 'Setting up your AI coding environment', 'cloudflare', 'REPLACE_AI_DEV_ID', 420, false, true, 17),
    (llm_ops_id, 'Web Basics', 'The web''s simple secret', 'cloudflare', 'REPLACE_WEB_ID', 300, false, true, 18)
    ON CONFLICT DO NOTHING;

END $$;

-- =========================================
-- NOTES FOR IMPLEMENTATION
-- =========================================
-- 1. Upload all .mp4 files from curriculum folders to Cloudflare Stream
-- 2. Replace all REPLACE_*_ID placeholders with actual Cloudflare Stream IDs
-- 3. The video paths in your filesystem are:
--    - Module_01_AI_Foundations/*/video.mp4
--    - Module_02_Prompting_Mastery/*/video.mp4 (or *.mp4 files)
--    - Business_Track/*/video.mp4
--    - Module_03_CS_Fundamentals/*/video.mp4
--    - Module_04_Development_Environment/*/video.mp4
-- 4. Consider creating thumbnails from slides/ folders
-- 5. Transcripts are available in transcript.txt files for captions