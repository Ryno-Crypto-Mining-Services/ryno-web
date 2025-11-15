# Multi-Agent Development Workflow Guide

## Overview

This document outlines best practices for developing this project with multiple AI coding agents (Manus, Cursor, Windsurf, etc.) to ensure code consistency and prevent conflicts.

---

## Critical Rule: Always Pull Before Development

**Every AI agent MUST pull the latest code from GitHub before starting any development work.**

### For Manus AI

Manus automatically pulls from GitHub when restoring checkpoints, but you should instruct it:

```
Before starting any development, pull the latest code from GitHub:
git pull origin main
```

### For Other AI Agents (Cursor, Windsurf, etc.)

Add this to your agent instructions:

```
CRITICAL: Before making any code changes, always run:
git pull origin main

Check for conflicts and resolve them before proceeding.
```

---

## Git Workflow

### Branch Strategy

**Use feature branches for all development:**

```bash
# Create a feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "feat: description of changes"

# Push to GitHub
git push origin feature/your-feature-name

# Create pull request on GitHub
# Merge to main after review
```

### Commit Message Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

**Examples:**
```
feat: add blog post search functionality
fix: resolve CSP blocking Sanity API calls
docs: update README with deployment instructions
refactor: extract blog card component
```

---

## Deployment Workflow

### Current Process (Manual)

1. **Develop locally** with any AI agent
2. **Commit changes** to GitHub
3. **Test locally** to ensure everything works
4. **Create Manus checkpoint** (if using Manus)
5. **Manually publish** via Manus Dashboard → Publish button

### Manus Checkpoint Creation

When using Manus AI, create checkpoints at logical milestones:

```
Please create a checkpoint with description:
"feat: [brief description of what was added/changed]"
```

### Publishing to Production

1. Open Manus Dashboard: https://manus.space
2. Navigate to your project
3. Click the **Publish** button in the header
4. Wait for deployment to complete
5. Verify at: https://rynocripto-rwmgyyvp.manus.space

---

## Multi-Agent Coordination

### Avoiding Conflicts

**Rule 1: One Agent, One Feature**
- Assign each feature to a single AI agent
- Don't have multiple agents working on the same files simultaneously

**Rule 2: Communicate Changes**
- Document what each agent is working on in `todo.md`
- Mark tasks as in-progress: `- [WIP] Feature name`
- Mark completed: `- [x] Feature name`

**Rule 3: Frequent Pulls**
- Pull from GitHub at the start of every session
- Pull before making significant changes
- Pull after long breaks

### Example Workflow

**Agent 1 (Manus) - Working on Blog Features:**
```markdown
## Current Work (Agent: Manus)
- [WIP] Add blog post pagination
- [ ] Implement blog post tags
```

**Agent 2 (Cursor) - Working on Homepage:**
```markdown
## Current Work (Agent: Cursor)
- [WIP] Update homepage hero section
- [ ] Add testimonials section
```

---

## File Ownership Guidelines

To minimize conflicts, assign file ownership:

### Manus AI - Primary Owner
- `client/src/pages/Blog.tsx`
- `client/src/pages/BlogPost.tsx`
- `server/routers/blog.ts`
- `server/lib/sanity.ts`
- Sanity Studio configuration

### Other Agents - Primary Owner
- `client/src/pages/Home.tsx`
- `client/src/pages/About.tsx`
- `client/src/pages/Contact.tsx`
- `client/src/components/` (shared components)

### Shared Files (Coordinate Before Editing)
- `client/src/App.tsx`
- `client/src/index.css`
- `server/routers.ts`
- `package.json`

---

## Testing Before Deployment

### Local Testing Checklist

Before committing code, verify:

- [ ] `pnpm check` passes (TypeScript compilation)
- [ ] Dev server starts without errors: `pnpm dev`
- [ ] All pages load correctly
- [ ] No console errors in browser
- [ ] Mobile responsive design works
- [ ] All links and navigation work

### Commands

```bash
# TypeScript check
pnpm check

# Start dev server
pnpm dev

# Build for production (test)
pnpm build
```

---

## GitHub Actions CI (Optional)

While Manus doesn't support automatic deployment, you can set up GitHub Actions to run tests on every push:

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
      - run: npm install -g pnpm
      - run: pnpm install
      - run: pnpm check
      - run: pnpm build
```

This ensures code quality before manual deployment.

---

## Sanity Studio Coordination

### Content Changes

**Sanity Studio is the single source of truth for content.**

- Blog posts, authors, categories are managed in Sanity Studio
- Don't hardcode content in the codebase
- AI agents should only modify Sanity schema/configuration, not content

### Schema Changes

When modifying Sanity schemas:

1. Update schema files in `studio/schemas/`
2. Test in Sanity Studio locally
3. Commit schema changes to GitHub
4. Deploy Sanity Studio: `cd studio && pnpm sanity deploy`

---

## Environment Variables

### Required Secrets

All secrets are managed through Manus Dashboard → Settings → Secrets.

**Never commit secrets to GitHub.**

Required environment variables:
- `SANITY_PROJECT_ID`
- `SANITY_DATASET`
- `SANITY_API_TOKEN`
- (See `.env.example` for full list)

---

## Troubleshooting

### Merge Conflicts

If you encounter merge conflicts:

```bash
# Pull latest changes
git pull origin main

# Resolve conflicts in your editor
# Look for <<<<<<< HEAD markers

# After resolving
git add .
git commit -m "fix: resolve merge conflicts"
git push origin main
```

### Out of Sync with GitHub

If local code is out of sync:

```bash
# Stash your changes
git stash

# Pull latest
git pull origin main

# Reapply your changes
git stash pop

# Resolve any conflicts
```

### Manus Checkpoint Issues

If Manus checkpoint fails to restore:

1. Check GitHub for latest code
2. Manually pull: `git pull origin main`
3. Restart dev server: `pnpm dev`
4. If still broken, use `webdev_rollback_checkpoint` to previous version

---

## Best Practices Summary

✅ **DO:**
- Always pull before starting work
- Use feature branches for new features
- Write descriptive commit messages
- Test locally before committing
- Document your work in `todo.md`
- Coordinate with other agents on shared files

❌ **DON'T:**
- Commit directly to main without testing
- Work on the same files as another agent simultaneously
- Commit secrets or environment variables
- Skip TypeScript checks
- Deploy without testing locally first

---

## Quick Reference Commands

```bash
# Start development
git pull origin main
pnpm dev

# Check for errors
pnpm check

# Commit changes
git add .
git commit -m "feat: your change description"
git push origin main

# Create checkpoint (Manus only)
# Use webdev_save_checkpoint tool

# Deploy to production
# Manually publish via Manus Dashboard
```

---

## Questions?

For issues specific to:
- **Manus Platform**: https://help.manus.im
- **Sanity CMS**: https://www.sanity.io/help
- **GitHub**: Check repository issues tab

---

**Last Updated:** November 14, 2024
