const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.production' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function createBuckets() {
  console.log('Creating storage buckets...\n');
  
  const buckets = [
    {
      id: 'transcripts',
      name: 'transcripts',
      public: true,
      file_size_limit: 10485760, // 10MB
      allowed_mime_types: ['text/plain', 'text/markdown', 'application/pdf']
    },
    {
      id: 'slides',
      name: 'slides', 
      public: true,
      file_size_limit: 52428800, // 50MB
      allowed_mime_types: ['image/png', 'image/jpeg', 'image/webp', 'application/pdf']
    },
    {
      id: 'course-materials',
      name: 'course-materials',
      public: true,
      file_size_limit: 52428800, // 50MB
      allowed_mime_types: ['application/pdf', 'text/plain', 'text/markdown']
    }
  ];
  
  for (const bucket of buckets) {
    try {
      const { data, error } = await supabase.storage.createBucket(bucket.id, {
        public: bucket.public,
        fileSizeLimit: bucket.file_size_limit,
        allowedMimeTypes: bucket.allowed_mime_types
      });
      
      if (error) {
        if (error.message.includes('already exists')) {
          console.log(`✓ Bucket '${bucket.id}' already exists`);
        } else {
          console.error(`✗ Failed to create '${bucket.id}': ${error.message}`);
        }
      } else {
        console.log(`✅ Created bucket: ${bucket.id}`);
      }
    } catch (err) {
      console.error(`Error with bucket ${bucket.id}:`, err.message);
    }
  }
  
  console.log('\nDone!');
}

createBuckets();