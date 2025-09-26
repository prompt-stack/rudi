#!/bin/bash

# Production Cleanup Script
# Run this before deploying to production

echo "🧹 Starting production cleanup..."
echo ""

# Navigate to project root
cd "$(dirname "$0")/.."

# 1. Remove test artifacts
echo "📸 Removing test screenshots and artifacts..."
rm -f *.png *.jpg *.jpeg *.gif
rm -f tsconfig.tsbuildinfo
rm -f .DS_Store
echo "✅ Test artifacts removed"
echo ""

# 2. Create docs structure
echo "📁 Organizing documentation..."
mkdir -p docs/assessment
mkdir -p docs/setup
mkdir -p docs/planning

# Move assessment docs
mv -f ASSESSMENT_* docs/assessment/ 2>/dev/null
mv -f SCORING-EXPLANATION.md docs/assessment/ 2>/dev/null
mv -f assessment-flow* docs/assessment/ 2>/dev/null

# Move setup docs
mv -f GOOGLE_SHEETS_* docs/setup/ 2>/dev/null
mv -f SHEETS_SETUP_SIMPLE.txt docs/setup/ 2>/dev/null
mv -f MODERN-STACK-SETUP.md docs/setup/ 2>/dev/null

# Move planning docs
mv -f LAUNCH_READINESS.md docs/planning/ 2>/dev/null
mv -f SEO_SITE_STRUCTURE.md docs/planning/ 2>/dev/null
mv -f SITE_STRUCTURE.md docs/planning/ 2>/dev/null
mv -f RUDI_TechCred_Eligibility_Assessment.txt docs/planning/ 2>/dev/null

echo "✅ Documentation organized"
echo ""

# 3. Move shell scripts
echo "🔧 Organizing scripts..."
mv -f *.sh scripts/ 2>/dev/null
echo "✅ Scripts organized"
echo ""

# 4. Handle archives
echo "📦 Handling archived content..."
if [ -d "archived" ]; then
  mv archived .archive
  echo "✅ Archived folder hidden"
else
  echo "ℹ️  No archived folder found"
fi
echo ""

# 5. Check temp folder
echo "🗑️  Checking temp folder..."
if [ -d "temp" ] && [ -z "$(ls -A temp)" ]; then
  rm -rf temp
  echo "✅ Empty temp folder removed"
elif [ -d "temp" ]; then
  echo "⚠️  Temp folder has content - manual review needed"
else
  echo "ℹ️  No temp folder found"
fi
echo ""

# 6. Verify .env is not committed
echo "🔒 Security check..."
if git ls-files | grep -E "\.env\.local$" > /dev/null; then
  echo "❌ WARNING: .env.local is tracked by git!"
  echo "   Run: git rm --cached .env.local"
else
  echo "✅ No sensitive files tracked"
fi
echo ""

# 7. Summary
echo "✨ Cleanup complete!"
echo ""
echo "Next steps:"
echo "1. Review docs/ folder structure"
echo "2. Update README.md if needed"
echo "3. Run: npm run build (test production build)"
echo "4. Deploy to Vercel: vercel --prod"
echo ""
echo "📋 See PRODUCTION_AUDIT.md for full checklist"