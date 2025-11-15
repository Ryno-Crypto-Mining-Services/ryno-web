#!/bin/bash

# Setup Git Hooks for Multi-Agent Development
# This script installs git hooks to ensure code quality and coordination

echo "🔧 Setting up git hooks for multi-agent development..."

# Create hooks directory if it doesn't exist
mkdir -p .git/hooks

# Pre-commit hook: Run TypeScript check before committing
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash

echo "🔍 Running pre-commit checks..."

# Check if pnpm is available
if ! command -v pnpm &> /dev/null; then
    echo "⚠️  pnpm not found. Skipping TypeScript check."
    exit 0
fi

# Run TypeScript check
echo "📝 Checking TypeScript..."
pnpm check

if [ $? -ne 0 ]; then
    echo "❌ TypeScript check failed. Please fix errors before committing."
    exit 1
fi

echo "✅ Pre-commit checks passed!"
exit 0
EOF

# Make pre-commit hook executable
chmod +x .git/hooks/pre-commit

# Post-merge hook: Remind to install dependencies if package.json changed
cat > .git/hooks/post-merge << 'EOF'
#!/bin/bash

echo "📦 Checking for dependency changes..."

# Check if package.json or pnpm-lock.yaml changed
if git diff-tree -r --name-only --no-commit-id ORIG_HEAD HEAD | grep -E "package.json|pnpm-lock.yaml"; then
    echo "⚠️  Dependencies may have changed. Run: pnpm install"
fi

echo "✅ Post-merge checks complete!"
EOF

# Make post-merge hook executable
chmod +x .git/hooks/post-merge

# Pre-push hook: Remind to pull latest changes
cat > .git/hooks/pre-push << 'EOF'
#!/bin/bash

echo "🔄 Checking if local branch is up to date..."

# Fetch latest from remote
git fetch origin main --quiet

# Check if local is behind remote
LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse @{u} 2>/dev/null)
BASE=$(git merge-base @ @{u} 2>/dev/null)

if [ "$LOCAL" != "$REMOTE" ] && [ "$LOCAL" = "$BASE" ]; then
    echo "⚠️  Your branch is behind origin/main. Consider pulling first:"
    echo "   git pull origin main"
    read -p "Continue pushing anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo "✅ Pre-push checks complete!"
exit 0
EOF

# Make pre-push hook executable
chmod +x .git/hooks/pre-push

echo "✅ Git hooks installed successfully!"
echo ""
echo "Installed hooks:"
echo "  • pre-commit: Runs TypeScript check"
echo "  • post-merge: Checks for dependency changes"
echo "  • pre-push: Warns if branch is behind remote"
echo ""
echo "To run this setup on other machines, execute:"
echo "  bash scripts/setup-git-hooks.sh"
