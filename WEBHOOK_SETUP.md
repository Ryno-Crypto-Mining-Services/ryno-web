# Webhook Configuration Guide

## Important: Webhook Direction Clarification

The automated deployment workflow works in **one direction only**:

```
GitHub → Manus
(Push to GitHub triggers deployment to Manus)
```

The webhook URL `https://api.github.com/repos/Ryno-Crypto-Mining-Services/ryno-web/dispatches` is for the **reverse direction** (Manus → GitHub), which requires additional setup and is **optional**.

---

## Current Setup (Working)

### GitHub Actions → Manus API

**How it works:**
1. You push code to GitHub
2. GitHub Actions workflow runs automatically
3. Workflow calls Manus API to create checkpoint and deploy
4. Your site updates at https://rynocripto-rwmgyyvp.manus.space

**Status:** ✅ Ready to use once you add `MANUS_API_KEY` to GitHub Secrets

**No webhook needed for this direction!**

---

## Optional: Manus → GitHub Webhooks

If you want Manus to notify GitHub when certain events happen (deployment complete, checkpoint created, etc.), you need to set up authentication.

### Why You Get 401 Unauthorized

The GitHub API endpoint requires authentication:
- **Endpoint**: `https://api.github.com/repos/Ryno-Crypto-Mining-Services/ryno-web/dispatches`
- **Method**: POST
- **Authentication**: GitHub Personal Access Token (PAT) required
- **Header**: `Authorization: Bearer YOUR_GITHUB_TOKEN`

### Setup Steps (Optional)

#### 1. Create GitHub Personal Access Token

1. Go to https://github.com/settings/tokens/new
2. **Note**: `Manus Webhook Integration`
3. **Expiration**: Choose duration (90 days, 1 year, or no expiration)
4. **Scopes**: Select `repo` (full control of private repositories)
5. Click **Generate token**
6. **Copy the token** (starts with `ghp_...` or `github_pat_...`)

#### 2. Configure Webhook in Manus

1. Go to Manus Dashboard → Project Settings → Webhooks
2. Click **Add Webhook**
3. **URL**: `https://api.github.com/repos/Ryno-Crypto-Mining-Services/ryno-web/dispatches`
4. **Method**: POST
5. **Headers**:
   ```json
   {
     "Authorization": "Bearer YOUR_GITHUB_TOKEN",
     "Accept": "application/vnd.github.v3+json",
     "Content-Type": "application/json"
   }
   ```
6. **Payload** (example):
   ```json
   {
     "event_type": "manus_deployment",
     "client_payload": {
       "status": "{{status}}",
       "version": "{{version}}",
       "timestamp": "{{timestamp}}"
     }
   }
   ```
7. **Events to subscribe**:
   - `checkpoint.created`
   - `deployment.started`
   - `deployment.completed`
   - `deployment.failed`

#### 3. Create GitHub Workflow to Handle Webhook

Create `.github/workflows/manus-webhook.yml`:

```yaml
name: Handle Manus Webhook

on:
  repository_dispatch:
    types: [manus_deployment]

jobs:
  handle-webhook:
    runs-on: ubuntu-latest
    steps:
      - name: Log Manus Event
        run: |
          echo "Manus deployment event received"
          echo "Status: ${{ github.event.client_payload.status }}"
          echo "Version: ${{ github.event.client_payload.version }}"
          echo "Timestamp: ${{ github.event.client_payload.timestamp }}"
      
      - name: Send Slack Notification (Optional)
        if: github.event.client_payload.status == 'completed'
        run: |
          # Add your Slack webhook or notification logic here
          echo "Deployment completed successfully!"
```

---

## Alternative: Simpler Webhook Options

### Option 1: Use GitHub Webhook (Recommended)

Instead of Manus → GitHub, use **GitHub → External Service**:

1. Go to https://github.com/Ryno-Crypto-Mining-Services/ryno-web/settings/hooks
2. Click **Add webhook**
3. **Payload URL**: Your notification endpoint (Slack, Discord, email service, etc.)
4. **Content type**: `application/json`
5. **Events**: Select `Workflow runs` and `Deployments`
6. GitHub will notify your service when deployments happen

### Option 2: Use Manus Dashboard Notifications

Simply monitor deployments in the Manus Dashboard:
- https://manus.space/projects/ryno-terrahash-website
- View deployment history
- Get email notifications (if Manus supports it)

### Option 3: GitHub Actions Notifications

Add notification steps to your deployment workflow:

```yaml
# In .github/workflows/deploy.yml
- name: Notify on Success
  if: success()
  run: |
    # Send email, Slack message, etc.
    echo "Deployment successful!"

- name: Notify on Failure
  if: failure()
  run: |
    # Send alert
    echo "Deployment failed!"
```

---

## Recommended Approach

**For most use cases, you don't need Manus → GitHub webhooks.**

The current setup (GitHub → Manus) is sufficient because:
- ✅ Automatic deployment on push
- ✅ GitHub Actions shows deployment status
- ✅ Manus Dashboard shows live status
- ✅ No additional authentication needed
- ✅ Simpler to maintain

**Only set up Manus → GitHub webhooks if you need:**
- Custom GitHub Actions triggered by Manus events
- Complex multi-repo workflows
- Advanced CI/CD orchestration

---

## Testing Your Current Setup

Instead of testing webhooks, test the actual deployment:

```bash
# Make a test change
echo "# Test deployment" >> README.md

# Commit and push
git add README.md
git commit -m "test: verify automated deployment"
git push origin main

# Watch the deployment
# 1. GitHub Actions: https://github.com/Ryno-Crypto-Mining-Services/ryno-web/actions
# 2. Manus Dashboard: https://manus.space/projects/ryno-terrahash-website
# 3. Production: https://rynocripto-rwmgyyvp.manus.space
```

---

## Summary

| Direction | Status | Authentication Required |
|-----------|--------|------------------------|
| **GitHub → Manus** | ✅ Ready | Yes (MANUS_API_KEY in GitHub Secrets) |
| **Manus → GitHub** | ⚠️ Optional | Yes (GitHub PAT in Manus webhook config) |

**Next Step:** Add `MANUS_API_KEY` to GitHub Secrets and test the deployment!

---

## Support

- **GitHub Actions Issues**: https://github.com/Ryno-Crypto-Mining-Services/ryno-web/actions
- **Manus API Issues**: https://help.manus.im
- **Webhook Testing**: Use https://webhook.site to debug webhook payloads

---

**Last Updated**: November 14, 2024
