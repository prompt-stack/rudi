#!/bin/bash

# Script to standardize colors across the RUDI website
# Color mapping:
# - Blues: blue-500, blue-600, blue-700 (primary)
# - Amber: amber-500, amber-600 (accent)
# - Green: green-500, green-600 (success)
# - Red: red-500 (errors only)
# - Gray: Various shades for text

echo "Standardizing colors across the site..."

# Find all TSX files
FILES=$(find src -name "*.tsx" -type f)

for file in $FILES; do
  echo "Processing $file..."

  # Backup original
  cp "$file" "$file.bak"

  # Replace purple with blue
  sed -i '' 's/text-purple-600/text-blue-600/g' "$file"
  sed -i '' 's/text-purple-500/text-blue-500/g' "$file"
  sed -i '' 's/text-purple-700/text-blue-700/g' "$file"
  sed -i '' 's/bg-purple-100/bg-blue-100/g' "$file"
  sed -i '' 's/bg-purple-50/bg-blue-50/g' "$file"
  sed -i '' 's/border-purple-/border-blue-/g' "$file"
  sed -i '' 's/from-purple-/from-blue-/g' "$file"
  sed -i '' 's/to-purple-/to-blue-/g' "$file"

  # Replace yellow with amber
  sed -i '' 's/text-yellow-/text-amber-/g' "$file"
  sed -i '' 's/bg-yellow-/bg-amber-/g' "$file"
  sed -i '' 's/border-yellow-/border-amber-/g' "$file"

  # Replace orange with amber (keep only for special leader tier)
  sed -i '' 's/text-orange-500/text-amber-500/g' "$file"
  sed -i '' 's/text-orange-600/text-amber-600/g' "$file"
  sed -i '' 's/bg-orange-100/bg-amber-100/g' "$file"
  sed -i '' 's/border-orange-/border-amber-/g' "$file"

  # Standardize blue shades to consistent ones
  sed -i '' 's/text-blue-400/text-blue-500/g' "$file"
  sed -i '' 's/text-blue-800/text-blue-700/g' "$file"
  sed -i '' 's/bg-blue-200/bg-blue-100/g' "$file"

  # Standardize green shades
  sed -i '' 's/text-green-700/text-green-600/g' "$file"
  sed -i '' 's/text-green-800/text-green-600/g' "$file"
  sed -i '' 's/bg-green-200/bg-green-100/g' "$file"

  # Standardize amber shades
  sed -i '' 's/text-amber-700/text-amber-600/g' "$file"
  sed -i '' 's/text-amber-800/text-amber-600/g' "$file"

  # Remove backup if successful
  if [ $? -eq 0 ]; then
    rm "$file.bak"
  else
    echo "Error processing $file, keeping backup"
  fi
done

echo "Color standardization complete!"
echo ""
echo "New color palette:"
echo "- Primary: blue-500, blue-600, blue-700"
echo "- Accent: amber-500, amber-600"
echo "- Success: green-500, green-600"
echo "- Error: red-500"
echo "- Neutral: gray shades"