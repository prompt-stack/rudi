// Local configuration with actual keys for development
module.exports = {
  supabase: {
    url: 'http://127.0.0.1:54321',
    serviceRoleKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU'
  },
  
  videoProvider: {
    provider: 'youtube' // Using YouTube for testing
  },
  
  paths: {
    curriculumRoot: '/Users/hoff/My Drive/projects/LLM-Ops/curriculum/LLM-Ops-Curriculum-Organized'
  }
};