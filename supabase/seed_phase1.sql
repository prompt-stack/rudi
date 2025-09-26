-- SEED DATA FOR PHASE 1
-- Run this after the migration to populate initial courses and videos
-- Replace the Cloudflare Stream IDs with your actual video IDs

-- =========================================
-- RUDI TRAINING COURSE
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
    'rudi-foundations',
    'RUDI: Responsible Use of Digital Intelligence',
    'Master the responsible and effective use of AI in your organization. This comprehensive training covers AI fundamentals, limitations, prompting techniques, and governance.',
    90, -- 1.5 hours total
    'course:rudi-foundations',
    1500000, -- $15,000 in cents
    true,
    true,
    1,
    '/images/courses/rudi-thumbnail.jpg'
) ON CONFLICT (slug) DO NOTHING;

-- Get the course ID for inserting videos
DO $$
DECLARE
    course_uuid UUID;
BEGIN
    SELECT id INTO course_uuid FROM courses WHERE slug = 'rudi-foundations';
    
    -- Module 1: AI Fundamentals
    INSERT INTO videos (
        course_id,
        title,
        description,
        video_provider,
        provider_asset_id, -- REPLACE WITH YOUR CLOUDFLARE STREAM ID
        duration_seconds,
        is_preview,
        is_required,
        order_index
    ) VALUES 
    (
        course_uuid,
        'Module 1: Understanding AI Fundamentals',
        'Learn what AI is (and isn''t), explore different types of AI systems, and understand key capabilities.',
        'cloudflare',
        'REPLACE_WITH_CLOUDFLARE_STREAM_ID_1', -- <-- CHANGE THIS
        1200, -- 20 minutes
        true,  -- This is a preview video
        true,
        1
    ),
    
    -- Module 2: Limitations & Responsible Use
    (
        course_uuid,
        'Module 2: AI Limitations & Responsible Use',
        'Understand AI limitations, biases, hallucinations, and learn frameworks for responsible deployment.',
        'cloudflare',
        'REPLACE_WITH_CLOUDFLARE_STREAM_ID_2', -- <-- CHANGE THIS
        1200, -- 20 minutes
        false,
        true,
        2
    ),
    
    -- Module 3: Mastering AI Prompting
    (
        course_uuid,
        'Module 3: Mastering AI Prompting',
        'Learn advanced prompting techniques, best practices, and how to get consistent, high-quality outputs.',
        'cloudflare',
        'REPLACE_WITH_CLOUDFLARE_STREAM_ID_3', -- <-- CHANGE THIS
        1200, -- 20 minutes
        false,
        true,
        3
    ),
    
    -- Module 4: Data Privacy & Security
    (
        course_uuid,
        'Module 4: Data Privacy & Security',
        'Critical knowledge about data handling, privacy protection, and security best practices when using AI.',
        'cloudflare',
        'REPLACE_WITH_CLOUDFLARE_STREAM_ID_4', -- <-- CHANGE THIS
        900, -- 15 minutes
        false,
        true,
        4
    ),
    
    -- Module 5: AI Governance & Compliance
    (
        course_uuid,
        'Module 5: AI Governance & Compliance',
        'Establish governance frameworks, understand compliance requirements, and implement organizational policies.',
        'cloudflare',
        'REPLACE_WITH_CLOUDFLARE_STREAM_ID_5', -- <-- CHANGE THIS
        900, -- 15 minutes
        false,
        true,
        5
    )
    ON CONFLICT DO NOTHING;
END $$;

-- =========================================
-- OPTIONAL: Additional Sample Courses
-- =========================================

-- AI for Business Leaders
INSERT INTO courses (
    slug,
    title,
    description,
    duration_minutes,
    access_scope,
    is_published,
    is_featured,
    order_index
) VALUES (
    'ai-business-leaders',
    'AI for Business Leaders',
    'Strategic insights for executives on leveraging AI for competitive advantage.',
    60,
    'course:ai-business-leaders',
    true,
    false,
    2
) ON CONFLICT (slug) DO NOTHING;

-- AI for Educators
INSERT INTO courses (
    slug,
    title,
    description,
    duration_minutes,
    access_scope,
    is_published,
    is_featured,
    order_index
) VALUES (
    'ai-educators',
    'AI for Educators',
    'Transform your teaching with AI tools while maintaining academic integrity.',
    45,
    'course:ai-educators',
    true,
    false,
    3
) ON CONFLICT (slug) DO NOTHING;

-- =========================================
-- Create a test superadmin user (optional)
-- =========================================
-- Uncomment and modify this if you want a superadmin account
-- Make sure to create the user in Supabase Auth first

-- UPDATE profiles 
-- SET role = 'superadmin' 
-- WHERE id = (SELECT id FROM auth.users WHERE email = 'admin@yourdomain.com');