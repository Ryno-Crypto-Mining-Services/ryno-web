# Automated Deployment Setup Guide

## Overview

This project is configured for **automatic deployment to Manus** on every push to the `main` branch using GitHub Actions and the Manus API.

---

## Prerequisites

1. **Manus API Key** - Generated from your Manus account
2. **GitHub Repository** - With Actions enabled
3. **Manus Project ID** - Your project identifier (default: `ryno-terrahash-website`)

---

## Step 1: Configure GitHub Secrets

Add the following secrets to your GitHub repository:

### Navigate to GitHub Settings

1. Go to your repository: https://github.com/Ryno-Crypto-Mining-Services/ryno-web
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**

### Required Secrets

#### `MANUS_API_KEY` (Required)
- **Value**: Your Manus API key
- **Where to get it**: Manus Dashboard → Settings → API Keys → Create New Key
- **Example**: `manus_sk_abc123xyz789...`

#### `MANUS_PROJECT_ID` (Optional)
- **Value**: `ryno-terrahash-website`
- **Note**: If not set, defaults to `ryno-terrahash-website`

#### `SANITY_PROJECT_ID` (Optional)
- **Value**: `mo8rs3o1`
- **Note**: Only needed if different from default

#### `SANITY_DATASET` (Optional)
- **Value**: `production`
- **Note**: Only needed if different from default

---

## Step 2: Get Your Manus API Key

### Option A: Via Manus Dashboard

1. Log in to https://manus.space
2. Navigate to **Settings** → **API Keys**
3. Click **Create New API Key**
4. Give it a name: `GitHub Actions Deployment`
5. Set permissions: **Read & Write** (for checkpoint creation and deployment)
6. Copy the generated key (starts with `manus_sk_...`)
7. **Important**: Save it securely - you won't be able to see it again

### Option B: Via Manus CLI (if available)

```bash
manus auth login
manus api-keys create --name "GitHub Actions" --scope deploy
```

---

## Step 3: Configure Webhook (Optional - Not Required)

**⚠️ Important:** Webhooks from Manus → GitHub are **optional** and **not required** for automated deployment. Skip this step unless you need advanced integration.

**Current Setup Works Without Webhooks:**
```
Push to GitHub → GitHub Actions runs → Calls Manus API → Deploys site ✅
```

**Webhook Would Enable (Advanced, Optional):**
```
Manus event → Calls GitHub API → Triggers GitHub Actions
```

**Why You Might Get 401 Unauthorized:**
The webhook URL `https://api.github.com/repos/Ryno-Crypto-Mining-Services/ryno-web/dispatches` requires GitHub Personal Access Token authentication. This is complex and unnecessary for basic deployment.

**For detailed webhook setup instructions (optional), see `WEBHOOK_SETUP.md`.**

**Recommended:** Skip webhooks and proceed to Step 4 (testing deployment).

---

## Step 4: Test the Deployment

### Manual Test

1. Make a small change to the code:
   ```bash
   echo "# Test deployment" >> README.md
   git add README.md
   git commit -m "test: verify automated deployment"
   git push origin main
   ```

2. Watch the deployment:
   - GitHub: Go to **Actions** tab to see workflow running
   - Manus: Check dashboard for new checkpoint and deployment status

### Expected Workflow

```
Push to main
    ↓
GitHub Actions triggered
    ↓
Run tests & build
    ↓
Call Manus API
    ↓
Create checkpoint
    ↓
Auto-publish to production
    ↓
Deployment complete ✅
```

---

## Step 5: Verify Deployment

After pushing to `main`:

1. **Check GitHub Actions**:
   - Go to https://github.com/Ryno-Crypto-Mining-Services/ryno-web/actions
   - Look for the "Deploy to Manus" workflow
   - Verify it shows ✅ success

2. **Check Manus Dashboard**:
   - Go to your project in Manus
   - Verify new checkpoint was created
   - Check deployment status

3. **Check Production Site**:
   - Visit https://rynocripto-rwmgyyvp.manus.space
   - Verify your changes are live
   - Check browser console for errors

---

## Workflow Files

### `.github/workflows/deploy.yml`

Main deployment workflow that runs on every push to `main`:
- Installs dependencies
- Runs TypeScript checks
- Builds the project
- Creates Manus checkpoint
- Triggers automatic deployment

### `.github/workflows/ci.yml`

Continuous integration workflow for pull requests:
- Runs on PRs to `main`
- Validates code quality
- Ensures builds succeed
- Does NOT deploy

---

## Troubleshooting

### Deployment Fails: "Authentication failed"

**Problem**: Invalid or missing `MANUS_API_KEY`

**Solution**:
1. Verify the API key is correctly set in GitHub Secrets
2. Check the key hasn't expired in Manus Dashboard
3. Ensure the key has deployment permissions

### Deployment Fails: "Project not found"

**Problem**: Incorrect `MANUS_PROJECT_ID`

**Solution**:
1. Check your project ID in Manus Dashboard
2. Update the `MANUS_PROJECT_ID` secret in GitHub
3. Default is `ryno-terrahash-website` - verify this matches

### Build Succeeds but Deployment Doesn't Trigger

**Problem**: Manus API endpoint might be incorrect

**Solution**:
1. Check the API endpoint in `.github/workflows/deploy.yml`
2. Verify the endpoint format: `https://api.manus.space/v1/projects/{id}/checkpoints`
3. Check Manus API documentation for updates

### Webhook Not Triggering

**Problem**: Webhook configuration issue

**Solution**:
1. Verify webhook URL is correct
2. Check webhook secret matches
3. Ensure webhook events are properly selected
4. Test webhook with Manus Dashboard webhook tester

---

## API Endpoints Reference

### Manus API

**Base URL**: `https://api.manus.space/v1`

**Create Checkpoint & Deploy**:
```bash
POST /projects/{project_id}/checkpoints
Authorization: Bearer {api_key}
Content-Type: application/json

{
  "description": "Deployment from GitHub Actions",
  "auto_publish": true
}
```

**Response**:
```json
{
  "version": "abc123def",
  "status": "deployed",
  "url": "https://your-project.manus.space"
}
```

---

## Security Best Practices

### API Key Security

✅ **DO**:
- Store API keys in GitHub Secrets (encrypted)
- Use separate API keys for different environments
- Rotate API keys periodically
- Revoke unused or compromised keys immediately

❌ **DON'T**:
- Commit API keys to the repository
- Share API keys in chat or email
- Use the same key across multiple projects
- Give keys more permissions than needed

### Webhook Security

- Always use HTTPS for webhook URLs
- Validate webhook signatures
- Use strong, random webhook secrets
- Limit webhook event subscriptions to what's needed

---

## Monitoring Deployments

### GitHub Actions Dashboard

View all deployments:
```
https://github.com/Ryno-Crypto-Mining-Services/ryno-web/actions
```

### Manus Dashboard

Monitor deployment status:
```
https://manus.space/projects/ryno-terrahash-website
```

### Production Site

Live site:
```
https://rynocripto-rwmgyyvp.manus.space
```

---

## Rollback Procedure

If a deployment introduces bugs:

### Option 1: Revert Git Commit

```bash
git revert HEAD
git push origin main
# Automated deployment will trigger with reverted code
```

### Option 2: Manual Rollback in Manus

1. Go to Manus Dashboard
2. Navigate to Checkpoints
3. Find the last working checkpoint
4. Click "Rollback" or "Publish" on that checkpoint

### Option 3: Deploy Previous Checkpoint via API

```bash
curl -X POST https://api.manus.space/v1/projects/ryno-terrahash-website/checkpoints/{version_id}/publish \
  -H "Authorization: Bearer $MANUS_API_KEY"
```

---

## Deployment Frequency

**Current Configuration**: Deploy on every push to `main`

**Alternative Configurations**:

### Deploy on Tag Only
```yaml
on:
  push:
    tags:
      - 'v*'  # Deploy only on version tags
```

### Deploy on Schedule
```yaml
on:
  schedule:
    - cron: '0 0 * * *'  # Deploy daily at midnight
```

### Manual Deployment Only
```yaml
on:
  workflow_dispatch:  # Manual trigger only
```

---

## Cost Considerations

- GitHub Actions: Free for public repositories (2,000 minutes/month for private)
- Manus API: Check your plan's API rate limits
- Deployments: Monitor your Manus plan's deployment quota

---

## Support

### Manus API Issues
- Documentation: https://docs.manus.space/api
- Support: https://help.manus.im

### GitHub Actions Issues
- Documentation: https://docs.github.com/actions
- Community: https://github.community

### Project-Specific Issues
- Repository Issues: https://github.com/Ryno-Crypto-Mining-Services/ryno-web/issues

---

## Quick Reference

### Add GitHub Secret
```
Settings → Secrets and variables → Actions → New repository secret
```

### Trigger Manual Deployment
```
Actions → Deploy to Manus → Run workflow
```

### View Deployment Logs
```
Actions → Latest workflow run → deploy job
```

### Check Production
```
https://rynocripto-rwmgyyvp.manus.space
```

---

**Last Updated**: November 14, 2024
