# Multi-Agent Development Setup Guide

## Quick Start for New AI Agents

### Step 1: Clone and Setup

```bash
# Clone the repository
git clone https://github.com/Ryno-Crypto-Mining-Services/ryno-web.git
cd ryno-web

# Install dependencies
pnpm install

# Setup git hooks (recommended)
bash scripts/setup-git-hooks.sh

# Start development server
pnpm dev
```

### Step 2: Read the Rules

**Before making any changes, read:**
1. `.cursorrules` - AI agent instructions
2. `DEVELOPMENT.md` - Full development workflow
3. `todo.md` - Current tasks and work in progress

### Step 3: Always Pull First

**CRITICAL:** Before every development session:
```bash
git pull origin main
```

---

## For Different AI Agents

### Cursor AI

Cursor automatically reads `.cursorrules` file. The rules are already configured.

**Additional setup:**
1. Open project in Cursor
2. Cursor will detect `.cursorrules`
3. Always use Cmd+K or Ctrl+K and mention: "Check .cursorrules before starting"

### Windsurf (Codeium)

Create a `.windsurfrules` file (symlink to `.cursorrules`):
```bash
ln -s .cursorrules .windsurfrules
```

### GitHub Copilot

Copilot doesn't read rule files automatically. Add this to your instructions:

```
Before starting any development on ryno-terrahash-website:
1. Run: git pull origin main
2. Read: .cursorrules file
3. Check: todo.md for current work
4. Follow: Conventional commit format
```

### Manus AI

Manus has built-in GitHub integration. Instruct it:

```
Before starting development:
1. Pull latest code from GitHub: git pull origin main
2. Check todo.md for work in progress
3. Follow the development workflow in DEVELOPMENT.md
```

### Claude (via API/CLI)

Add to your system prompt:

```
You are working on the ryno-terrahash-website project.
CRITICAL RULES:
1. Always run `git pull origin main` before making changes
2. Follow conventional commit format (feat:, fix:, etc.)
3. Check todo.md before starting work
4. Run `pnpm check` before committing
5. See .cursorrules for full guidelines
```

---

## Coordination Between Agents

### Task Assignment in todo.md

Mark your tasks to avoid conflicts:

```markdown
## Current Work

### In Progress
- [WIP] (Agent: Cursor) Add blog pagination
- [WIP] (Agent: Manus) Fix mobile navigation

### Completed
- [x] Setup multi-agent workflow
- [x] Add featured images to blog posts

### Todo
- [ ] Add contact form
- [ ] Implement search functionality
```

### File Locking (Informal)

When editing a file, add a comment at the top:

```typescript
// WIP: Agent Cursor - Adding pagination (2024-11-14)
// Do not edit until marked complete in todo.md
```

Remove when done and mark task as `[x]` in todo.md.

---

## Git Workflow for Multiple Agents

### Option 1: Direct to Main (Current)

**Pros:** Simple, fast
**Cons:** Risk of conflicts

```bash
git pull origin main
# Make changes
git add .
git commit -m "feat: your changes"
git push origin main
```

### Option 2: Feature Branches (Recommended for Complex Work)

**Pros:** Safer, allows review
**Cons:** Requires PR workflow

```bash
git checkout -b feature/agent-name-feature-description
# Make changes
git add .
git commit -m "feat: your changes"
git push origin feature/agent-name-feature-description
# Create PR on GitHub
# Merge after review
```

### Option 3: Agent-Specific Branches

Each agent has their own branch:

```bash
# Agent branches
- agent/cursor
- agent/manus
- agent/windsurf

# Merge to main when stable
git checkout main
git merge agent/cursor
git push origin main
```

---

## Conflict Resolution

### If You Encounter Merge Conflicts

```bash
# Pull latest
git pull origin main

# Git will mark conflicts in files like:
<<<<<<< HEAD
Your changes
=======
Other agent's changes
>>>>>>> origin/main

# Edit the file to resolve
# Keep the correct version or merge both

# After resolving
git add .
git commit -m "fix: resolve merge conflicts"
git push origin main
```

### Prevention is Better

1. **Pull frequently** - Every 30 minutes if actively developing
2. **Communicate** - Update todo.md with your current work
3. **Small commits** - Commit often to reduce conflict size
4. **Coordinate** - Don't edit the same files simultaneously

---

## Automated Checks

### Git Hooks (Installed via setup script)

**Pre-commit:**
- Runs `pnpm check` (TypeScript validation)
- Prevents commits with TypeScript errors

**Post-merge:**
- Checks if dependencies changed
- Reminds to run `pnpm install`

**Pre-push:**
- Checks if local branch is behind remote
- Warns before pushing outdated code

### GitHub Actions CI

Automatically runs on every push:
- TypeScript check
- Production build test
- Reports status in GitHub

---

## Deployment Process

### Current: Manual Deployment

1. **Develop** with any AI agent
2. **Commit** to GitHub
3. **Verify** GitHub Actions CI passes
4. **Publish** manually via Manus Dashboard
5. **Verify** at https://rynocripto-rwmgyyvp.manus.space

### Future: Automated Deployment (If Manus Adds API)

If Manus provides deployment API in the future:

```yaml
# .github/workflows/deploy.yml
- name: Deploy to Manus
  run: |
    curl -X POST https://api.manus.space/deploy \
      -H "Authorization: Bearer ${{ secrets.MANUS_API_KEY }}" \
      -d '{"project": "ryno-terrahash-website"}'
```

---

## Best Practices Summary

### DO ✅
- Pull before every session
- Check todo.md for current work
- Use conventional commit messages
- Run `pnpm check` before committing
- Test locally before pushing
- Coordinate on shared files
- Keep commits small and focused

### DON'T ❌
- Skip pulling latest code
- Edit files marked [WIP] by another agent
- Commit without testing
- Push directly to main without checking CI
- Hardcode secrets or API keys
- Make large, sweeping changes without coordination

---

## Troubleshooting

### "Your branch is behind origin/main"

```bash
git pull origin main
# Resolve any conflicts
git push origin main
```

### "pnpm check fails"

```bash
# See what's wrong
pnpm check

# Fix TypeScript errors
# Then commit
```

### "Dev server won't start"

```bash
# Clean and reinstall
rm -rf node_modules .next
pnpm install
pnpm dev
```

### "Manus checkpoint out of sync"

```bash
# Pull latest from GitHub
git pull origin main

# Restart dev server
pnpm dev
```

---

## Quick Reference

### Essential Commands

```bash
# Start session
git pull origin main && pnpm dev

# Check before commit
pnpm check

# Commit
git add . && git commit -m "feat: description"

# Push
git push origin main

# Deploy
# Manual: Manus Dashboard → Publish
```

### Essential Files

- `.cursorrules` - AI agent instructions
- `DEVELOPMENT.md` - Full workflow guide
- `todo.md` - Task tracking
- `package.json` - Dependencies and scripts

### Essential URLs

- **Dev**: http://localhost:3000
- **Sanity Studio**: http://localhost:3333
- **Production**: https://rynocripto-rwmgyyvp.manus.space
- **GitHub**: https://github.com/Ryno-Crypto-Mining-Services/ryno-web

---

## Questions?

- **Manus Platform**: https://help.manus.im
- **Project Issues**: GitHub Issues tab
- **Development Questions**: Check DEVELOPMENT.md

---

**Remember: Communication and coordination are key to successful multi-agent development!**
