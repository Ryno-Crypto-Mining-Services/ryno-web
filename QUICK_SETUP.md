# Quick Setup Checklist for Automated Deployment

## ✅ Completed (by Manus AI)

- [x] Git hooks installed locally
- [x] GitHub Actions workflow created (`.github/workflows/deploy.yml`)
- [x] CI workflow updated for pull requests only
- [x] Comprehensive documentation created

---

## 📋 Your Action Items

### 1. Add Manus API Key to GitHub (Required)

1. **Get your Manus API Key**:
   - Go to https://manus.space
   - Navigate to **Settings** → **API Keys**
   - Click **Create New API Key**
   - Name: `GitHub Actions Deployment`
   - Permissions: **Read & Write**
   - Copy the key (starts with `manus_sk_...`)

2. **Add to GitHub Secrets**:
   - Go to https://github.com/Ryno-Crypto-Mining-Services/ryno-web/settings/secrets/actions
   - Click **New repository secret**
   - Name: `MANUS_API_KEY`
   - Value: Paste your API key
   - Click **Add secret**

### 2. Test Automated Deployment

```bash
# Make a test change
echo "# Testing automated deployment" >> README.md

# Commit and push
git add README.md
git commit -m "test: verify automated deployment pipeline"
git push origin main
```

### 3. Verify Deployment

1. **Check GitHub Actions**:
   - Go to https://github.com/Ryno-Crypto-Mining-Services/ryno-web/actions
   - Look for "Deploy to Manus" workflow
   - Should show ✅ green checkmark

2. **Check Production**:
   - Visit https://rynocripto-rwmgyyvp.manus.space
   - Verify your test change is live

---

## 🔧 Optional: Webhook Configuration

If you want bidirectional communication (Manus → GitHub):

**Webhook URL to add in Manus**:
```
https://api.github.com/repos/Ryno-Crypto-Mining-Services/ryno-web/dispatches
```

**Events to subscribe**:
- `checkpoint.created`
- `deployment.completed`
- `deployment.failed`

See `DEPLOYMENT_SETUP.md` for detailed webhook setup.

---

## 📚 Documentation

- **Full Setup Guide**: `DEPLOYMENT_SETUP.md`
- **Multi-Agent Workflow**: `DEVELOPMENT.md`
- **Quick Agent Setup**: `MULTI_AGENT_SETUP.md`

---

## 🚀 How It Works

```
Push to main
    ↓
GitHub Actions runs
    ↓
Tests & builds code
    ↓
Calls Manus API
    ↓
Creates checkpoint
    ↓
Auto-deploys to production
    ↓
Live at rynocripto-rwmgyyvp.manus.space ✅
```

---

## ❓ Need Help?

- **Can't find API Keys in Manus**: Contact Manus support at https://help.manus.im
- **GitHub Actions failing**: Check the Actions tab for error logs
- **Deployment not working**: See troubleshooting section in `DEPLOYMENT_SETUP.md`

---

**Next Step**: Add `MANUS_API_KEY` to GitHub Secrets, then push a test commit!
