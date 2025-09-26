#!/bin/bash

# Update all blue references to navy throughout the site

echo "🎨 Updating to true navy blue color scheme..."

# Update text colors
find src -name "*.tsx" -o -name "*.jsx" -o -name "*.ts" -o -name "*.js" | xargs sed -i '' \
  -e 's/text-blue-50/text-navy-50/g' \
  -e 's/text-blue-100/text-navy-100/g' \
  -e 's/text-blue-200/text-navy-200/g' \
  -e 's/text-blue-300/text-navy-300/g' \
  -e 's/text-blue-400/text-navy-400/g' \
  -e 's/text-blue-500/text-navy-500/g' \
  -e 's/text-blue-600/text-navy-600/g' \
  -e 's/text-blue-700/text-navy-700/g' \
  -e 's/text-blue-800/text-navy-800/g' \
  -e 's/text-blue-900/text-navy-900/g'

# Update background colors
find src -name "*.tsx" -o -name "*.jsx" -o -name "*.ts" -o -name "*.js" | xargs sed -i '' \
  -e 's/bg-blue-50/bg-navy-50/g' \
  -e 's/bg-blue-100/bg-navy-100/g' \
  -e 's/bg-blue-200/bg-navy-200/g' \
  -e 's/bg-blue-300/bg-navy-300/g' \
  -e 's/bg-blue-400/bg-navy-400/g' \
  -e 's/bg-blue-500/bg-navy-500/g' \
  -e 's/bg-blue-600/bg-navy-600/g' \
  -e 's/bg-blue-700/bg-navy-700/g' \
  -e 's/bg-blue-800/bg-navy-800/g' \
  -e 's/bg-blue-900/bg-navy-900/g'

# Update border colors
find src -name "*.tsx" -o -name "*.jsx" -o -name "*.ts" -o -name "*.js" | xargs sed -i '' \
  -e 's/border-blue-50/border-navy-50/g' \
  -e 's/border-blue-100/border-navy-100/g' \
  -e 's/border-blue-200/border-navy-200/g' \
  -e 's/border-blue-300/border-navy-300/g' \
  -e 's/border-blue-400/border-navy-400/g' \
  -e 's/border-blue-500/border-navy-500/g' \
  -e 's/border-blue-600/border-navy-600/g' \
  -e 's/border-blue-700/border-navy-700/g' \
  -e 's/border-blue-800/border-navy-800/g' \
  -e 's/border-blue-900/border-navy-900/g'

# Update hover states
find src -name "*.tsx" -o -name "*.jsx" -o -name "*.ts" -o -name "*.js" | xargs sed -i '' \
  -e 's/hover:bg-blue-/hover:bg-navy-/g' \
  -e 's/hover:text-blue-/hover:text-navy-/g' \
  -e 's/hover:border-blue-/hover:border-navy-/g'

# Update focus states
find src -name "*.tsx" -o -name "*.jsx" -o -name "*.ts" -o -name "*.js" | xargs sed -i '' \
  -e 's/focus:ring-blue-/focus:ring-navy-/g' \
  -e 's/focus:border-blue-/focus:border-navy-/g'

# Update gradient references
find src -name "*.tsx" -o -name "*.jsx" -o -name "*.ts" -o -name "*.js" | xargs sed -i '' \
  -e 's/from-blue-/from-navy-/g' \
  -e 's/to-blue-/to-navy-/g' \
  -e 's/via-blue-/via-navy-/g'

# Update template literals and dynamic classes
find src -name "*.tsx" -o -name "*.jsx" -o -name "*.ts" -o -name "*.js" | xargs sed -i '' \
  -e "s/\${.*color.*}-blue-/\${\\1}-navy-/g" \
  -e "s/color: 'blue'/color: 'navy'/g"

echo "✅ Updated all blue references to navy"
echo "📝 Note: Check the journey path to make sure all colors are correct"