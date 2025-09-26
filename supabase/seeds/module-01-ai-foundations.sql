-- Seed data for Module 01: AI Foundations
-- This script populates the database with course and video data

-- First, ensure we have a course for AI Foundations
INSERT INTO courses (
  id,
  title,
  slug,
  description,
  thumbnail_url,
  price_cents,
  currency,
  is_published,
  is_featured,
  enrollment_count,
  average_rating,
  total_duration_seconds,
  metadata
) VALUES (
  'ai-foundations-101',
  'AI Foundations: From Concepts to Implementation',
  'ai-foundations',
  'Master the fundamental concepts of artificial intelligence, from basic principles to modern LLMs. This comprehensive module covers the evolution of AI, core technologies, limitations, and responsible development practices.',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995',
  9700,
  'USD',
  true,
  true,
  0,
  0,
  3337, -- Total duration of all videos
  jsonb_build_object(
    'level', 'beginner',
    'prerequisites', ARRAY['Basic computer literacy'],
    'skills', ARRAY['AI Fundamentals', 'LLMs', 'Ethical AI', 'Critical Thinking'],
    'module_count', 1,
    'lesson_count', 10,
    'has_labs', true,
    'certification_available', true
  )
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  total_duration_seconds = EXCLUDED.total_duration_seconds,
  metadata = EXCLUDED.metadata;

-- Now insert all the videos for Module 01
-- Note: Replace the cloudflare_ids with actual IDs after running the upload script

-- Lesson 1: Introduction to AI
INSERT INTO videos (
  id,
  course_id,
  title,
  description,
  thumbnail_url,
  duration_seconds,
  position,
  is_preview,
  is_required,
  video_provider,
  provider_asset_id,
  metadata
) VALUES 
(
  'ai-intro-001',
  'ai-foundations-101',
  'Introduction to AI',
  'Learn the fundamentals of artificial intelligence and explore the evolution of intelligence from biological to artificial systems.',
  'https://customer-vrz0iwi6omoe8ysa.cloudflarestream.com/68a81cf087f84826931f12e58b94027d/thumbnails/thumbnail.jpg',
  343,
  1,
  true, -- This is a preview video
  true,
  'cloudflare',
  '68a81cf087f84826931f12e58b94027d', -- Replace with actual Cloudflare ID
  jsonb_build_object(
    'chapter', 'Module 1',
    'lesson_number', '1.1',
    'has_slides', true,
    'has_transcript', true,
    'topics', ARRAY['AI History', 'Intelligence Types', 'AI Applications']
  )
),
(
  'ai-intro-002-lab',
  'ai-foundations-101',
  'Lab: AI Foundations',
  'Hands-on exploration of AI foundations with practical exercises and examples.',
  'https://customer-vrz0iwi6omoe8ysa.cloudflarestream.com/68a81cf087f84826931f12e58b94027d/thumbnails/thumbnail.jpg',
  240,
  2,
  false,
  false,
  'cloudflare',
  '68a81cf087f84826931f12e58b94027d', -- Replace with actual ID
  jsonb_build_object(
    'chapter', 'Module 1',
    'lesson_number', '1.2',
    'is_lab', true,
    'required_tools', ARRAY['Python', 'Jupyter Notebook']
  )
),

-- Lesson 2: Foundations of AI
(
  'ai-foundations-001',
  'ai-foundations-101',
  'Demystifying AI',
  'Understanding how AI really works - from pattern recognition to decision making.',
  'https://customer-vrz0iwi6omoe8ysa.cloudflarestream.com/68a81cf087f84826931f12e58b94027d/thumbnails/thumbnail.jpg',
  304,
  3,
  false,
  true,
  'cloudflare',
  '68a81cf087f84826931f12e58b94027d', -- Replace with actual ID
  jsonb_build_object(
    'chapter', 'Module 1',
    'lesson_number', '2.1',
    'has_slides', true,
    'has_transcript', true
  )
),
(
  'ai-foundations-002-lab',
  'ai-foundations-101',
  'Lab: Traditional AI',
  'Exploring rule-based and expert systems - the foundations of modern AI.',
  'https://customer-vrz0iwi6omoe8ysa.cloudflarestream.com/68a81cf087f84826931f12e58b94027d/thumbnails/thumbnail.jpg',
  180,
  4,
  false,
  false,
  'cloudflare',
  '68a81cf087f84826931f12e58b94027d', -- Replace with actual ID
  jsonb_build_object(
    'chapter', 'Module 1',
    'lesson_number', '2.2',
    'is_lab', true
  )
),

-- Lesson 3: Large Language Models
(
  'llm-001',
  'ai-foundations-101',
  'Large Language Models',
  'Deep dive into LLMs, transformers, and the technology behind ChatGPT.',
  'https://customer-vrz0iwi6omoe8ysa.cloudflarestream.com/68a81cf087f84826931f12e58b94027d/thumbnails/thumbnail.jpg',
  420,
  5,
  false,
  true,
  'cloudflare',
  '68a81cf087f84826931f12e58b94027d', -- Replace with actual ID
  jsonb_build_object(
    'chapter', 'Module 1',
    'lesson_number', '3.1',
    'has_slides', true,
    'has_transcript', true,
    'topics', ARRAY['Transformers', 'Attention Mechanism', 'GPT Architecture']
  )
),
(
  'llm-002-lab',
  'ai-foundations-101',
  'Lab: LLM Recap',
  'Review and practice session for Large Language Model concepts.',
  'https://customer-vrz0iwi6omoe8ysa.cloudflarestream.com/68a81cf087f84826931f12e58b94027d/thumbnails/thumbnail.jpg',
  150,
  6,
  false,
  false,
  'cloudflare',
  '68a81cf087f84826931f12e58b94027d', -- Replace with actual ID
  jsonb_build_object(
    'chapter', 'Module 1',
    'lesson_number', '3.2',
    'is_lab', true
  )
),
(
  'llm-003-lab',
  'ai-foundations-101',
  'Lab: Working with LLMs',
  'Hands-on implementation and interaction with Large Language Models.',
  'https://customer-vrz0iwi6omoe8ysa.cloudflarestream.com/68a81cf087f84826931f12e58b94027d/thumbnails/thumbnail.jpg',
  300,
  7,
  false,
  false,
  'cloudflare',
  '68a81cf087f84826931f12e58b94027d', -- Replace with actual ID
  jsonb_build_object(
    'chapter', 'Module 1',
    'lesson_number', '3.3',
    'is_lab', true,
    'api_required', true
  )
),

-- Lesson 4: LLM Limitations
(
  'llm-limits-001',
  'ai-foundations-101',
  'LLM Limitations',
  'Understanding the constraints, challenges, and current boundaries of LLM technology.',
  'https://customer-vrz0iwi6omoe8ysa.cloudflarestream.com/68a81cf087f84826931f12e58b94027d/thumbnails/thumbnail.jpg',
  360,
  8,
  false,
  true,
  'cloudflare',
  '68a81cf087f84826931f12e58b94027d', -- Replace with actual ID
  jsonb_build_object(
    'chapter', 'Module 1',
    'lesson_number', '4.1',
    'has_slides', true,
    'has_transcript', true,
    'topics', ARRAY['Hallucinations', 'Context Windows', 'Bias', 'Computational Limits']
  )
),
(
  'llm-limits-002-lab',
  'ai-foundations-101',
  'Lab: Testing LLM Limits',
  'Exploring edge cases, failure modes, and limitations through practical experiments.',
  'https://customer-vrz0iwi6omoe8ysa.cloudflarestream.com/68a81cf087f84826931f12e58b94027d/thumbnails/thumbnail.jpg',
  240,
  9,
  false,
  false,
  'cloudflare',
  '68a81cf087f84826931f12e58b94027d', -- Replace with actual ID
  jsonb_build_object(
    'chapter', 'Module 1',
    'lesson_number', '4.2',
    'is_lab', true,
    'experiments', ARRAY['Context overflow', 'Logical reasoning', 'Mathematical operations']
  )
),

-- Lesson 5: Responsible AI
(
  'responsible-ai-001',
  'ai-foundations-101',
  'Responsible AI',
  'Ethics, safety, governance, and best practices for developing and deploying AI systems.',
  'https://customer-vrz0iwi6omoe8ysa.cloudflarestream.com/68a81cf087f84826931f12e58b94027d/thumbnails/thumbnail.jpg',
  480,
  10,
  false,
  true,
  'cloudflare',
  '68a81cf087f84826931f12e58b94027d', -- Replace with actual ID
  jsonb_build_object(
    'chapter', 'Module 1',
    'lesson_number', '5.1',
    'has_slides', true,
    'has_transcript', true,
    'topics', ARRAY['AI Ethics', 'Bias Mitigation', 'Privacy', 'Transparency', 'Accountability'],
    'case_studies', ARRAY['Healthcare AI', 'Autonomous Vehicles', 'Hiring Systems']
  )
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  duration_seconds = EXCLUDED.duration_seconds,
  provider_asset_id = EXCLUDED.provider_asset_id,
  metadata = EXCLUDED.metadata;

-- Create a sample user profile for testing
INSERT INTO profiles (
  id,
  email,
  full_name,
  avatar_url,
  preferences
) VALUES (
  '11111111-1111-1111-1111-111111111111',
  'test@example.com',
  'Test User',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=test',
  jsonb_build_object(
    'theme', 'light',
    'notifications', true,
    'autoplay', false
  )
) ON CONFLICT (id) DO NOTHING;

-- Give the test user access to the first video (preview)
-- In production, this would be handled by purchase/enrollment flow

-- Update course statistics
UPDATE courses 
SET 
  enrollment_count = 1,
  average_rating = 4.8
WHERE id = 'ai-foundations-101';

-- Log the seeding
DO $$
BEGIN
  RAISE NOTICE 'Module 01: AI Foundations seeded successfully';
  RAISE NOTICE 'Total videos inserted: 10';
  RAISE NOTICE 'Course ID: ai-foundations-101';
  RAISE NOTICE 'Remember to update provider_asset_id values with actual Cloudflare IDs';
END $$;