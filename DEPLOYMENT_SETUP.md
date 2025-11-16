# Deployment Setup Guide

## Overview

This project uses **GitHub Actions for CI/CD** to automatically build and test code on every push to `main`. Deployment to production is done through the **Manus Dashboard** by creating checkpoints.

---

## Deployment Workflow

```
Push to GitHub → GitHub Actions CI → Build & Test → Manual Checkpoint in Manus → Deploy
```

**Why Manual Checkpoints?**
- Manus webdev checkpoint API is not publicly exposed
- Manual checkpoints give you control over when to deploy
- You can review changes in the Manus Dashboard before publishing

---

## Step 1: Automated CI/CD (Already Configured)

### What Happens Automatically

Every push to `main` triggers GitHub Actions to:
1. ✅ Checkout code
2. ✅ Install dependencies (pnpm)
3. ✅ Run TypeScript checks
4. ✅ Build the project
5. ✅ Report success/failure

### View Build Status

Go to: https://github.com/Ryno-Crypto-Mining-Services/ryno-web/actions

---

## Step 2: Deploy to Production (Manual)

### Option A: Manus Dashboard (Recommended)

1. **Go to Manus Dashboard**
   - URL: https://manus.im/projects
   - Select project: `ryno-terrahash-website`

2. **Create Checkpoint**
   - Click **"Save Checkpoint"** button
   - Add description (e.g., "Deploy latest changes from GitHub")
   - Checkpoint is created with current code

3. **Publish to Production**
   - Click **"Publish"** button on the checkpoint
   - Your site updates at: https://rynocripto-rwmgyyvp.manus.space

### Option B: Manus CLI (If Available)

```bash
# Install Manus CLI (if not already installed)
npm install -g @manus/cli

# Login to Manus
manus login

# Deploy project
manus deploy --project ryno-terrahash-website --message "Deploy from GitHub"
```

---

## Step 3: Verify Deployment

1. **Check Production Site**
   - Visit: https://rynocripto-rwmgyyvp.manus.space
   - Verify your changes are live
   - Test functionality

2. **Check Manus Dashboard**
   - View deployment history
   - Monitor site analytics
   - Check for errors

---

## GitHub Secrets (Optional)

While automatic deployment via API isn't available, you can still configure these secrets for future use:

### Navigate to GitHub Settings

1. Go to: https://github.com/Ryno-Crypto-Mining-Services/ryno-web/settings/secrets/actions
2. Click **"New repository secret"**

### Optional Secrets

#### `SANITY_PROJECT_ID`
- **Value**: `mo8rs3o1`
- **Purpose**: Override default Sanity project ID

#### `SANITY_DATASET`
- **Value**: `production`
- **Purpose**: Override default Sanity dataset

#### `MANUS_PROJECT_ID`
- **Value**: `ryno-terrahash-website`
- **Purpose**: For future API integration

---

## Workflow Files

### `.github/workflows/deploy.yml`

Runs on every push to `main`:
- Installs dependencies
- Runs TypeScript checks
- Builds the project
- Provides deployment instructions

### `.github/workflows/ci.yml`

Runs on pull requests to `main`:
- Validates code quality
- Ensures builds succeed
- Does NOT deploy

---

## Typical Development Workflow

### 1. Make Changes Locally

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes
# ... edit files ...

# Test locally
pnpm dev

# Commit changes
git add .
git commit -m "feat: add new feature"
git push origin feature/my-feature
```

### 2. Create Pull Request

1. Go to GitHub repository
2. Click **"New Pull Request"**
3. Select your feature branch
4. CI workflow runs automatically
5. Review and merge when ready

### 3. Deploy to Production

1. Merge PR to `main`
2. GitHub Actions builds automatically
3. Go to Manus Dashboard
4. Create checkpoint
5. Click Publish

---

## Monitoring Deployments

### GitHub Actions Dashboard

View all builds:
```
https://github.com/Ryno-Crypto-Mining-Services/ryno-web/actions
```

### Manus Dashboard

Monitor deployment status:
```
https://manus.im/projects/ryno-terrahash-website
```

### Production Site

Live site:
```
https://rynocripto-rwmgyyvp.manus.space
```

---

## Rollback Procedure

If a deployment introduces bugs:

### Option 1: Rollback in Manus Dashboard

1. Go to Manus Dashboard
2. Navigate to **Checkpoints**
3. Find the last working checkpoint
4. Click **"Publish"** on that checkpoint

### Option 2: Revert Git Commit

```bash
# Revert the problematic commit
git revert HEAD

# Push to GitHub
git push origin main

# Wait for CI to build
# Create new checkpoint in Manus Dashboard
# Publish the reverted version
```

---

## Troubleshooting

### Build Fails in GitHub Actions

**Problem**: TypeScript errors or build failures

**Solution**:
1. Check the Actions tab for error details
2. Fix errors locally
3. Test with `pnpm check` and `pnpm build`
4. Push fixes to GitHub

### Changes Not Showing on Production

**Problem**: Site not updated after deployment

**Solution**:
1. Verify checkpoint was created in Manus Dashboard
2. Ensure you clicked "Publish" on the checkpoint
3. Clear browser cache (Ctrl+Shift+R)
4. Check Manus Dashboard for deployment errors

### Sanity CMS Content Not Loading

**Problem**: Blog posts or CMS content missing

**Solution**:
1. Verify `SANITY_PROJECT_ID` and `SANITY_DATASET` are correct
2. Check Sanity Studio: https://ryno-terrahash.sanity.studio
3. Ensure content is published (not draft)
4. Check browser console for API errors

---

## Best Practices

### Commit Messages

Use conventional commits:
```
feat: add new feature
fix: resolve bug
docs: update documentation
style: format code
refactor: restructure code
test: add tests
chore: update dependencies
```

### Branch Strategy

- `main` - Production-ready code
- `feature/*` - New features
- `fix/*` - Bug fixes
- `docs/*` - Documentation updates

### Testing Before Deployment

Always test locally before pushing:
```bash
# Run TypeScript checks
pnpm check

# Build project
pnpm build

# Test dev server
pnpm dev
```

---

## Deployment Checklist

Before creating a checkpoint:

- [ ] All tests pass locally
- [ ] TypeScript checks pass
- [ ] Build succeeds
- [ ] GitHub Actions CI passes
- [ ] Changes tested in development
- [ ] No console errors
- [ ] Sanity CMS content verified
- [ ] Responsive design checked

---

## Support

### GitHub Actions Issues
- Documentation: https://docs.github.com/actions
- Repository Actions: https://github.com/Ryno-Crypto-Mining-Services/ryno-web/actions

### Manus Platform Issues
- Documentation: https://docs.manus.im
- Support: https://help.manus.im
- Dashboard: https://manus.im/projects

### Project-Specific Issues
- Repository: https://github.com/Ryno-Crypto-Mining-Services/ryno-web
- Issues: https://github.com/Ryno-Crypto-Mining-Services/ryno-web/issues

---

## Quick Reference

### Deploy New Changes
```
1. Push to main → GitHub Actions builds
2. Manus Dashboard → Create Checkpoint
3. Click Publish → Site updates
```

### View Build Status
```
GitHub Actions → https://github.com/Ryno-Crypto-Mining-Services/ryno-web/actions
```

### Access Production
```
Website → https://rynocripto-rwmgyyvp.manus.space
Dashboard → https://manus.im/projects/ryno-terrahash-website
```

---

**Last Updated**: November 15, 2024
