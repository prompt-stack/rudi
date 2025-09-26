-- Migration: Content Assets System
-- Handles transcripts, slides, PDFs, and other course materials

-- Create storage buckets for different asset types
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('transcripts', 'transcripts', true, 10485760, ARRAY['text/plain', 'text/markdown', 'application/pdf']),
  ('slides', 'slides', true, 52428800, ARRAY['image/png', 'image/jpeg', 'image/webp', 'application/pdf']),
  ('course-materials', 'course-materials', true, 52428800, ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'text/markdown'])
ON CONFLICT (id) DO NOTHING;

-- Create content_assets table to track all course assets
CREATE TABLE IF NOT EXISTS content_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id UUID REFERENCES videos(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  asset_type TEXT NOT NULL CHECK (asset_type IN ('transcript', 'slides', 'lab_instructions', 'quiz', 'exercise', 'reading', 'cheatsheet', 'template')),
  title TEXT NOT NULL,
  description TEXT,
  file_path TEXT NOT NULL, -- Path in storage bucket
  storage_bucket TEXT NOT NULL,
  file_size_bytes INTEGER,
  mime_type TEXT,
  is_downloadable BOOLEAN DEFAULT true,
  access_level TEXT DEFAULT 'enrolled' CHECK (access_level IN ('public', 'preview', 'enrolled', 'premium')),
  position INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  
  -- Ensure either video_id or course_id is set
  CONSTRAINT content_asset_parent CHECK (
    (video_id IS NOT NULL AND course_id IS NULL) OR 
    (video_id IS NULL AND course_id IS NOT NULL)
  )
);

-- Create indexes
CREATE INDEX idx_content_assets_video ON content_assets(video_id) WHERE video_id IS NOT NULL;
CREATE INDEX idx_content_assets_course ON content_assets(course_id) WHERE course_id IS NOT NULL;
CREATE INDEX idx_content_assets_type ON content_assets(asset_type);
CREATE INDEX idx_content_assets_access ON content_assets(access_level);

-- Add RLS policies for content_assets
ALTER TABLE content_assets ENABLE ROW LEVEL SECURITY;

-- Public can view public and preview assets
CREATE POLICY "Public can view public assets" ON content_assets
  FOR SELECT
  USING (access_level IN ('public', 'preview'));

-- For now, enrolled content is only visible to authenticated users
-- Will be updated when user_entitlements table is created
CREATE POLICY "Authenticated users can view enrolled content" ON content_assets
  FOR SELECT
  USING (
    access_level = 'enrolled' AND auth.uid() IS NOT NULL
  );

-- Create view for easy asset retrieval
CREATE OR REPLACE VIEW video_assets AS
SELECT 
  v.id as video_id,
  v.title as video_title,
  ca.id as asset_id,
  ca.asset_type,
  ca.title as asset_title,
  ca.description,
  ca.file_path,
  ca.storage_bucket,
  ca.is_downloadable,
  ca.access_level,
  ca.metadata
FROM videos v
LEFT JOIN content_assets ca ON ca.video_id = v.id
ORDER BY v.order_index, ca.position;

-- Create function to get asset URL
CREATE OR REPLACE FUNCTION get_asset_url(
  p_bucket TEXT,
  p_path TEXT
) RETURNS TEXT AS $$
BEGIN
  RETURN format(
    '%s/storage/v1/object/public/%s/%s',
    current_setting('app.supabase_url', true),
    p_bucket,
    p_path
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to upload transcript
CREATE OR REPLACE FUNCTION upload_transcript(
  p_video_id UUID,
  p_content TEXT,
  p_title TEXT DEFAULT 'Video Transcript'
) RETURNS UUID AS $$
DECLARE
  v_asset_id UUID;
  v_file_path TEXT;
BEGIN
  -- Generate file path
  v_file_path := format('videos/%s/transcript.txt', p_video_id);
  
  -- Create asset record
  INSERT INTO content_assets (
    video_id,
    asset_type,
    title,
    file_path,
    storage_bucket,
    file_size_bytes,
    mime_type,
    access_level
  ) VALUES (
    p_video_id,
    'transcript',
    p_title,
    v_file_path,
    'transcripts',
    length(p_content),
    'text/plain',
    'enrolled'
  ) RETURNING id INTO v_asset_id;
  
  RETURN v_asset_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Sample data will be added via separate seed file or application

-- Add trigger to update updated_at
CREATE TRIGGER update_content_assets_updated_at
  BEFORE UPDATE ON content_assets
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();