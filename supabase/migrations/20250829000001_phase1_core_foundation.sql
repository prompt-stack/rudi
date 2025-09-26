-- PHASE 1: Core Foundation - Users and Course Catalog
-- This migration creates the minimal structure needed to:
-- 1. Support user signups
-- 2. Display course catalog
-- 3. Show video metadata (no playback yet)

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
CREATE INDEX idx_courses_slug ON courses(slug);
CREATE INDEX idx_courses_published ON courses(is_published) WHERE is_published = true;

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
CREATE UNIQUE INDEX idx_videos_course_order ON videos(course_id, order_index);
CREATE INDEX idx_videos_course_required ON videos(course_id, is_required, id);

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
CREATE TRIGGER set_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER set_courses_updated_at BEFORE UPDATE ON courses
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER set_videos_updated_at BEFORE UPDATE ON videos
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- =========================================
-- ROW LEVEL SECURITY (RLS)
-- =========================================

-- PROFILES: Users can see and edit their own profile
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- COURSES: Anyone can view published courses
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published courses" ON courses
    FOR SELECT USING (is_published = true);

-- Superadmin can manage courses (using service role for now)
CREATE POLICY "Service role can manage courses" ON courses
    FOR ALL USING (auth.role() = 'service_role');

-- VIDEOS: Anyone can view videos of published courses (metadata only)
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view videos of published courses" ON videos
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM courses 
            WHERE courses.id = videos.course_id 
            AND courses.is_published = true
        )
    );

-- Superadmin can manage videos (using service role for now)
CREATE POLICY "Service role can manage videos" ON videos
    FOR ALL USING (auth.role() = 'service_role');

-- =========================================
-- INDEXES FOR PERFORMANCE
-- =========================================
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role) WHERE role != 'user';
CREATE INDEX IF NOT EXISTS idx_courses_featured ON courses(is_featured, order_index) WHERE is_published = true;
CREATE INDEX IF NOT EXISTS idx_videos_preview ON videos(is_preview, course_id) WHERE is_preview = true;

-- =========================================
-- COMMENTS FOR DOCUMENTATION
-- =========================================
COMMENT ON TABLE profiles IS 'User profiles extending Supabase auth.users';
COMMENT ON TABLE courses IS 'Course catalog - all courses in the platform';
COMMENT ON TABLE videos IS 'Individual video lessons within courses';
COMMENT ON COLUMN videos.provider_asset_id IS 'Cloudflare Stream ID, Mux Asset ID, YouTube video ID, etc.';
COMMENT ON COLUMN videos.is_preview IS 'If true, video is viewable without purchase (for marketing)';
COMMENT ON COLUMN courses.access_scope IS 'Defines who can access: library:all, course:course-slug, bundle:bundle-name';