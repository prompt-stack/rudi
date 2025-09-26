#!/usr/bin/env node

/**
 * Runs SQL migrations using Supabase SDK
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runMigration(migrationFile) {
  console.log(`Running migration: ${migrationFile}`);
  
  const sql = fs.readFileSync(migrationFile, 'utf8');
  
  // Split SQL into individual statements (basic split on semicolons)
  const statements = sql
    .split(/;\s*$/m)
    .filter(stmt => stmt.trim().length > 0)
    .map(stmt => stmt.trim() + ';');
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const statement of statements) {
    // Skip comments
    if (statement.startsWith('--') || statement.trim().length === 0) {
      continue;
    }
    
    try {
      // For storage bucket operations, we need to use different approach
      if (statement.includes('storage.buckets')) {
        console.log('⚠️  Storage bucket creation must be done via Supabase Dashboard');
        continue;
      }
      
      const { data, error } = await supabase.rpc('exec_sql', {
        sql: statement
      }).single();
      
      if (error) {
        // Try direct execution for DDL statements
        const { error: sqlError } = await supabase.from('_migrations').select('*').limit(1);
        
        // This is a workaround - we'll create tables via dashboard
        console.log('⚠️  Statement requires admin access:', statement.substring(0, 50) + '...');
        errorCount++;
      } else {
        successCount++;
        console.log('✅ Statement executed successfully');
      }
    } catch (err) {
      console.error('❌ Error:', err.message);
      errorCount++;
    }
  }
  
  console.log(`\nMigration complete: ${successCount} successful, ${errorCount} failed`);
  
  if (errorCount > 0) {
    console.log('\n📝 For failed statements, please run them manually in Supabase SQL Editor:');
    console.log('   1. Go to https://supabase.com/dashboard/project/ahsrercfjhmxnyfrxxqh/sql');
    console.log('   2. Copy and paste the migration SQL');
    console.log('   3. Click "Run"');
  }
}

// Get migration file from command line or use default
const migrationFile = process.argv[2] || path.join(__dirname, '..', 'supabase', 'migrations', '002_content_assets.sql');

runMigration(migrationFile).catch(console.error);