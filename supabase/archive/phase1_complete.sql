-- ============================================
-- PHASE 1: COMPLETE MIGRATION + INITIAL DATA
-- Run this in Supabase SQL Editor
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =========================================
-- PROFILES TABLE (extends auth.users)
-- =========================================
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    avatar_url TEXT,
    role TEXT DEFAULT 'user' CHECK (role IN ('user', 'org_admin', 'superadmin')),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create profile automatically on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, avatar_url)
    VALUES (
        new.id, 
        new.raw_user_meta_data->>'full_name', 
        new.raw_user_meta_data->>'avatar_url'
    );
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- =========================================
-- COURSES TABLE (the catalog)
-- =========================================
CREATE TABLE IF NOT EXISTS courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL CHECK (slug ~ '^[a-z0-9-]+$' AND char_length(slug) > 0),
    description TEXT,
    thumbnail_url TEXT,
    duration_minutes INTEGER,
    access_scope TEXT DEFAULT 'library:all' CHECK (access_scope ~ '^(library|course|bundle):[a-z0-9-]+$'),
    price_cents INTEGER CHECK (price_cents IS NULL OR price_cents >= 0),
    is_published BOOLEAN DEFAULT false NOT NULL,
    is_featured BOOLEAN DEFAULT false NOT NULL,
    order_index INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Index for fast slug lookups (URLs)
CREATE INDEX IF NOT EXISTS idx_courses_slug ON courses(slug);
CREATE INDEX IF NOT EXISTS idx_courses_published ON courses(is_published) WHERE is_published = true;

-- =========================================
-- VIDEOS TABLE (the lessons)
-- =========================================
CREATE TABLE IF NOT EXISTS videos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    video_provider TEXT NOT NULL CHECK (video_provider IN ('cloudflare', 'mux', 'youtube', 'vimeo')),
    provider_asset_id TEXT NOT NULL CHECK (char_length(provider_asset_id) > 0),
    duration_seconds INTEGER NOT NULL CHECK (duration_seconds > 0),
    is_preview BOOLEAN DEFAULT false NOT NULL,
    is_required BOOLEAN DEFAULT true NOT NULL,
    order_index INTEGER DEFAULT 0 NOT NULL,
    transcript_storage_path TEXT,
    captions_vtt_path TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Ensure video order is unique within each course
CREATE UNIQUE INDEX IF NOT EXISTS idx_videos_course_order ON videos(course_id, order_index);
CREATE INDEX IF NOT EXISTS idx_videos_course_required ON videos(course_id, is_required, id);

-- =========================================
-- UPDATED_AT TRIGGER
-- =========================================
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
DROP TRIGGER IF EXISTS set_profiles_updated_at ON profiles;
CREATE TRIGGER set_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS set_courses_updated_at ON courses;
CREATE TRIGGER set_courses_updated_at BEFORE UPDATE ON courses
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS set_videos_updated_at ON videos;
CREATE TRIGGER set_videos_updated_at BEFORE UPDATE ON videos
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- =========================================
-- ROW LEVEL SECURITY (RLS)
-- =========================================

-- PROFILES: Users can see and edit their own profile
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- COURSES: Anyone can view published courses
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view published courses" ON courses;
CREATE POLICY "Anyone can view published courses" ON courses
    FOR SELECT USING (is_published = true);

-- Service role can manage courses
DROP POLICY IF EXISTS "Service role can manage courses" ON courses;
CREATE POLICY "Service role can manage courses" ON courses
    FOR ALL USING (auth.role() = 'service_role');

-- VIDEOS: Anyone can view videos of published courses (metadata only)
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view videos of published courses" ON videos;
CREATE POLICY "Anyone can view videos of published courses" ON videos
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM courses 
            WHERE courses.id = videos.course_id 
            AND courses.is_published = true
        )
    );

-- Service role can manage videos
DROP POLICY IF EXISTS "Service role can manage videos" ON videos;
CREATE POLICY "Service role can manage videos" ON videos
    FOR ALL USING (auth.role() = 'service_role');

-- =========================================
-- INITIAL COURSE DATA
-- =========================================

-- Main LLM-Ops Course
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
    'llm-ops-complete',
    'LLM-Ops: Complete AI Engineering Course',
    'Master AI engineering from foundations to professional deployment. Includes AI fundamentals, prompting mastery, CS basics, development environment setup, and hands-on business applications.',
    180,
    'course:llm-ops-complete',
    39700,
    true,
    true,
    1
) ON CONFLICT (slug) DO NOTHING;

-- AI Foundations Module
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
    9700,
    true,
    false,
    2
) ON CONFLICT (slug) DO NOTHING;

-- Business Track Bundle
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
    14700,
    true,
    true,
    3
) ON CONFLICT (slug) DO NOTHING;

-- =========================================
-- SAMPLE VIDEOS (Replace IDs after upload)
-- =========================================

DO $$
DECLARE
    ai_foundations_id UUID;
BEGIN
    SELECT id INTO ai_foundations_id FROM courses WHERE slug = 'ai-foundations';
    
    -- Add sample videos (update provider_asset_id after Cloudflare upload)
    INSERT INTO videos (
        course_id, 
        title, 
        description, 
        video_provider, 
        provider_asset_id, 
        duration_seconds, 
        is_preview, 
        is_required, 
        order_index
    ) VALUES 
    (
        ai_foundations_id, 
        'Introduction to AI', 
        'What is artificial intelligence and how does it work?', 
        'cloudflare', 
        'SAMPLE_ID_1', -- REPLACE with actual Cloudflare Stream ID
        360, 
        true,  -- This is a preview video
        true, 
        1
    ),
    (
        ai_foundations_id, 
        'Foundations of AI', 
        'Core concepts and different types of AI systems', 
        'cloudflare', 
        'SAMPLE_ID_2', -- REPLACE with actual Cloudflare Stream ID
        420, 
        false, 
        true, 
        2
    )
    ON CONFLICT DO NOTHING;
END $$;

-- =========================================
-- SUCCESS MESSAGE
-- =========================================
DO $$
BEGIN
    RAISE NOTICE 'Phase 1 migration complete! Tables created: profiles, courses, videos';
    RAISE NOTICE 'Next steps: 1) Upload videos to Cloudflare, 2) Update video IDs';
END $$;