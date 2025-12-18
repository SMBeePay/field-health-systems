# Build Validation Setup

This repository includes automated validation to prevent common Next.js build errors before they reach Vercel.

## What Gets Validated

### 1. Pre-Push Git Hook
Location: `.git/hooks/pre-push`

Runs automatically before every `git push` and checks for:
- **'use client' + metadata conflicts**: Catches when a file has both `'use client'` directive and `export const metadata`, which is not allowed in Next.js App Router
- File-level validation on all staged TypeScript/TSX files

**To bypass** (not recommended): `git push --no-verify`

### 2. GitHub Actions Workflow
Location: `.github/workflows/validate-build.yml`

Runs on:
- Every push to `claude/**` branches
- Every pull request to `main` or `master`

Validates:
- ✓ No 'use client' + metadata conflicts
- ✓ TypeScript type checking
- ✓ Next.js build succeeds

### 3. NPM Scripts

```bash
# Run TypeScript type checking
npm run type-check

# Run full validation (type check + build)
npm run validate
```

## Common Issues and Fixes

### Issue: "You are attempting to export 'metadata' from a component marked with 'use client'"

**Cause**: A file has both `'use client'` at the top AND `export const metadata`

**Fix**: Choose one:
1. **Remove `'use client'`** - Make it a Server Component (recommended if you need metadata)
2. **Remove metadata export** - Move metadata to parent layout.tsx file
3. **Split the component** - Create a client component for interactive parts and server component for metadata

### Example Fix:

**Before (❌ Broken):**
```tsx
'use client'
import { useState } from 'react'

export const metadata = {
  title: 'My Page'
}

export default function Page() {
  const [count, setCount] = useState(0)
  return <div>...</div>
}
```

**After (✅ Fixed - Option 1: Server Component):**
```tsx
// Remove 'use client', use CSS for animations
export const metadata = {
  title: 'My Page'
}

export default function Page() {
  return <div>...</div>
}
```

**After (✅ Fixed - Option 2: Split Components):**
```tsx
// page.tsx (Server Component)
export const metadata = {
  title: 'My Page'
}

import ClientComponent from './ClientComponent'

export default function Page() {
  return <ClientComponent />
}

// ClientComponent.tsx (Client Component)
'use client'
import { useState } from 'react'

export default function ClientComponent() {
  const [count, setCount] = useState(0)
  return <div>...</div>
}
```

## How to Install Hooks for a New Clone

The pre-push hook is in `.git/hooks/` which is not tracked by Git. To set it up on a new clone:

```bash
# Make the hook executable
chmod +x .git/hooks/pre-push
```

Or copy from this documentation:

```bash
cat > .git/hooks/pre-push << 'EOF'
#!/bin/bash
# Pre-push hook to validate Next.js build before pushing

echo "🔍 Running pre-push validation..."

current_branch=$(git rev-parse --abbrev-ref HEAD)
if [[ $current_branch == claude/* ]]; then
    echo "✓ Pushing to branch: $current_branch"

    echo "🔍 Checking for common Next.js App Router issues..."

    files_with_issue=$(git diff --cached --name-only --diff-filter=ACM | grep '\.tsx\|\.ts' | while read file; do
        if [ -f "$file" ]; then
            if grep -q "^['\"]use client['\"]" "$file" && grep -q "export const metadata" "$file"; then
                echo "$file"
            fi
        fi
    done)

    if [ -n "$files_with_issue" ]; then
        echo "❌ ERROR: Found files with 'use client' AND 'export const metadata':"
        echo "$files_with_issue"
        exit 1
    fi

    echo "✓ No conflicts found"
    echo "✅ All pre-push validations passed!"
fi

exit 0
EOF

chmod +x .git/hooks/pre-push
```

## Disabling Validation

### Temporarily (for one push):
```bash
git push --no-verify
```

### Permanently (not recommended):
```bash
rm .git/hooks/pre-push
```

## Future Enhancements

Consider adding:
- ESLint validation in pre-push hook
- Automated tests in CI
- Bundle size checks
- Lighthouse performance scores
