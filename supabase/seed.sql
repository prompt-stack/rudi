-- Supabase Seed File
-- This file is automatically run when you execute: npx supabase db seed

-- Sample data will be added later with proper UUID handling
-- For now, we'll just create a minimal test course

INSERT INTO courses (title, slug, description, is_published) 
VALUES (
  'AI Foundations Test',
  'ai-foundations-test',
  'Test course for development',
  true
) ON CONFLICT (slug) DO NOTHING;

-- Log completion
DO $$
BEGIN
  RAISE NOTICE 'Database seeding completed successfully';
END $$;