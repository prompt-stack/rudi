// Configuration for importing curriculum data into Supabase

module.exports = {
  // Supabase connection
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://127.0.0.1:54321',
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || 'your-service-role-key-here'
  },

  // Video provider settings
  videoProvider: {
    // Choose one: 'cloudflare', 'mux', 'youtube', 'vimeo'
    provider: 'cloudflare',
    
    // Cloudflare Stream config
    cloudflare: {
      accountId: process.env.CLOUDFLARE_ACCOUNT_ID,
      apiToken: process.env.CLOUDFLARE_STREAM_API_TOKEN,
      // Optional: custom subdomain
      streamDomain: 'customer-abc123.cloudflarestream.com'
    },
    
    // Mux config (if using Mux instead)
    mux: {
      tokenId: process.env.MUX_TOKEN_ID,
      tokenSecret: process.env.MUX_TOKEN_SECRET
    }
  },

  // Module to database mapping
  moduleMapping: {
    'Module_01_AI_Foundations': {
      course: {
        title: 'Module 01: AI Foundations',
        slug: 'module-01-ai-foundations',
        description: 'Master the fundamental concepts of artificial intelligence, from basic principles to modern LLMs. This comprehensive module covers the evolution of AI, core technologies, limitations, and responsible development practices.',
        thumbnail_url: null, // Will be generated or uploaded
        access_scope: 'course:ai-foundations',
        price_cents: 9700,
        is_published: true,
        is_featured: true,
        order_index: 1
      },
      
      // Lesson folder to video title mapping
      lessons: {
        '01_Introduction_to_AI': {
          title: 'Evolution of Intelligence',
          description: 'Explore the journey from basic computation to modern AI systems',
          is_preview: true,
          is_required: true
        },
        '02_Foundations_of_AI': {
          title: 'What is Intelligence?',
          description: 'Understanding the core concepts of intelligence in artificial systems',
          is_preview: false,
          is_required: true
        },
        '04_Large_Language_Models': {
          title: 'Introduction to Large Language Models',
          description: 'Deep dive into LLMs, transformers, and modern AI architectures',
          is_preview: false,
          is_required: true
        },
        '05_LLM_Limitations': {
          title: 'Understanding LLM Limitations',
          description: 'Critical analysis of what LLMs can and cannot do',
          is_preview: false,
          is_required: true
        },
        '06_Responsible_AI': {
          title: 'Responsible AI Development',
          description: 'Ethics, safety, and best practices in AI development',
          is_preview: false,
          is_required: true
        }
      }
    },
    
    // Add more modules as needed
    'Module_02_Prompting': {
      course: {
        title: 'Module 02: Prompt Engineering',
        slug: 'module-02-prompt-engineering',
        // ... etc
      },
      lessons: {
        // ... lesson mappings
      }
    }
  },

  // Asset processing rules
  assetRules: {
    transcript: {
      storageBucket: 'transcripts',
      accessLevel: 'enrolled',
      isDownloadable: true,
      fileTypes: ['.txt', '.md']
    },
    slides: {
      storageBucket: 'slides',
      accessLevel: 'enrolled',
      isDownloadable: true,
      fileTypes: ['.pdf'],
      // If slides are images, convert to PDF
      convertImages: true
    },
    lab: {
      storageBucket: 'course-materials',
      accessLevel: 'enrolled',
      isDownloadable: true,
      assetType: 'lab_instructions',
      fileTypes: ['.pdf', '.md']
    }
  },

  // Import behavior
  importOptions: {
    // What to do if course already exists
    overwriteExisting: false,
    
    // Skip videos that already exist
    skipExistingVideos: true,
    
    // Automatically upload assets to storage
    autoUploadAssets: true,
    
    // Generate captions from transcript
    generateCaptions: true,
    
    // Dry run mode (don't actually insert)
    dryRun: false,
    
    // Verbose logging
    verbose: true
  },

  // File paths
  paths: {
    curriculumRoot: '/Users/hoff/My Drive/projects/LLM-Ops/curriculum/LLM-Ops-Curriculum-Organized',
    tempDirectory: '/tmp/curriculum-import',
    logFile: './import.log'
  }
};