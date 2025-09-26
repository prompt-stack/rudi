#!/bin/bash

# Script to update all blue-600 to blue-800 (navy blue) across the site
# Also updates blue-700 (hover) to blue-900 (darker navy)

echo "Updating to navy blue color scheme..."

# Find all TSX files
FILES=$(find src -name "*.tsx" -type f)

for file in $FILES; do
  echo "Processing $file..."

  # Backup original
  cp "$file" "$file.bak"

  # Replace blue-600 with blue-800 (primary navy)
  sed -i '' 's/text-blue-600/text-blue-800/g' "$file"
  sed -i '' 's/bg-blue-600/bg-blue-800/g' "$file"
  sed -i '' 's/border-blue-600/border-blue-800/g' "$file"
  sed -i '' 's/from-blue-600/from-blue-800/g' "$file"
  sed -i '' 's/to-blue-600/to-blue-800/g' "$file"
  sed -i '' 's/ring-blue-600/ring-blue-800/g' "$file"

  # Replace blue-700 with blue-900 (hover state)
  sed -i '' 's/text-blue-700/text-blue-900/g' "$file"
  sed -i '' 's/bg-blue-700/bg-blue-900/g' "$file"
  sed -i '' 's/hover:bg-blue-700/hover:bg-blue-900/g' "$file"
  sed -i '' 's/hover:text-blue-700/hover:text-blue-900/g' "$file"
  sed -i '' 's/to-blue-700/to-blue-900/g' "$file"
  sed -i '' 's/from-blue-700/from-blue-900/g' "$file"

  # Update focus rings to match
  sed -i '' 's/focus:ring-blue-500/focus:ring-blue-700/g' "$file"
  sed -i '' 's/ring-blue-500/ring-blue-700/g' "$file"

  # Update the gradient references
  sed -i '' 's/from-blue-600 to-blue-500/from-blue-800 to-blue-700/g' "$file"
  sed -i '' 's/from-blue-600 to-blue-700/from-blue-800 to-blue-900/g' "$file"
  sed -i '' 's/from-blue-600 via-blue-500/from-blue-800 via-blue-700/g' "$file"

  # Remove backup if successful
  if [ $? -eq 0 ]; then
    rm "$file.bak"
  else
    echo "Error processing $file, keeping backup"
  fi
done

# Also update CSS files
echo "Updating CSS files..."
CSS_FILES=$(find src -name "*.css" -type f)

for file in $CSS_FILES; do
  echo "Processing $file..."
  cp "$file" "$file.bak"

  # Update CSS variables
  sed -i '' 's/#2563eb/#1e40af/g' "$file"  # blue-600 to blue-800
  sed -i '' 's/#1d4ed8/#1e3a8a/g' "$file"  # blue-700 to blue-900
  sed -i '' 's/#3b82f6/#1d4ed8/g' "$file"  # blue-500 to blue-700

  if [ $? -eq 0 ]; then
    rm "$file.bak"
  fi
done

echo "Navy blue update complete!"
echo ""
echo "New color scheme:"
echo "- Primary: blue-800 (#1e40af) - Navy blue"
echo "- Hover: blue-900 (#1e3a8a) - Darker navy"
echo "- Active: blue-700 (#1d4ed8) - Royal blue"
echo "- Light backgrounds: blue-50, blue-100"