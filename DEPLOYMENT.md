# 🚀 Netlify Deployment Guide

This guide explains how to deploy your portfolio to Netlify using the automated deployment scripts.

## 📋 Prerequisites

1. **Netlify Account**: Sign up at [netlify.com](https://netlify.com) if you haven't already
2. **Node.js**: Ensure you have Node.js installed
3. **Git**: Make sure your project is committed to git

## 🔧 Setup (One-time)

### 1. Install Dependencies
```bash
npm install
```

### 2. Login to Netlify
```bash
npx netlify login
```
This will open a browser window to authenticate with Netlify.

### 3. Link Your Site (Optional)
If you want to link to an existing Netlify site:
```bash
npx netlify link
```

## 🚀 Deployment Commands

### Quick Deploy (Preview)
Deploy to a preview URL for testing:
```bash
npm run deploy
```

### Production Deploy
Deploy to your production domain:
```bash
npm run deploy:prod
```

### Deploy and Open
Deploy and automatically open the site in your browser:
```bash
# Preview + Open
npm run deploy:open

# Production + Open  
npm run deploy:prod:open
```

## 📁 What Happens During Deployment

1. **Dependency Check**: Verifies all npm packages are installed
2. **Build Process**: Runs `npm run build` to create optimized production files
3. **File Verification**: Ensures build output exists in `dist/` folder
4. **Upload**: Pushes files to Netlify's CDN
5. **Success Report**: Provides deployment URL and status

## 🎯 Deployment Types

| Command | Purpose | URL Type | Use Case |
|---------|---------|----------|----------|
| `npm run deploy` | Preview | Temporary | Testing changes |
| `npm run deploy:prod` | Production | Live domain | Final release |
| `npm run deploy:open` | Preview + Open | Temporary | Quick preview |
| `npm run deploy:prod:open` | Prod + Open | Live domain | Release & view |

## 🔍 Troubleshooting

### Common Issues

1. **Build Fails**
   ```bash
   # Check for errors
   npm run build
   # Fix any linting issues
   npm run lint
   ```

2. **Netlify CLI Not Found**
   ```bash
   # Install globally
   npm install -g netlify-cli
   # Or use via npx
   npx netlify --version
   ```

3. **Authentication Issues**
   ```bash
   # Re-login
   npx netlify logout
   npx netlify login
   ```

4. **Deploy Permissions**
   ```bash
   # Ensure script is executable
   chmod +x deploy-netlify.sh
   ```

## 📊 Monitoring Deployment

### View Deployment Status
```bash
npx netlify status
```

### View Site Info
```bash
npx netlify sites:list
```

### View Deployment History
```bash
npx netlify deploys
```

## 🔗 Useful Netlify Commands

```bash
# Open Netlify dashboard
npx netlify open

# Open deployed site
npx netlify open:site

# View build logs
npx netlify logs

# Environment variables
npx netlify env:list
```

## 🌟 Best Practices

1. **Always test locally first**: `npm run dev`
2. **Check build output**: `npm run build && npm run preview`
3. **Deploy to preview first**: Test with `npm run deploy` before production
4. **Monitor deployments**: Check Netlify dashboard after deployment
5. **Keep dependencies updated**: Regular `npm update`

## 🔒 Security Notes

- Never commit sensitive API keys to git
- Use Netlify environment variables for secrets
- Regularly update dependencies for security patches

## 📞 Support

- **Netlify Docs**: [docs.netlify.com](https://docs.netlify.com)
- **Netlify CLI Docs**: [cli.netlify.com](https://cli.netlify.com)
- **Deployment Issues**: Check Netlify dashboard → Site → Deploys

---

## 🎉 Quick Start

For immediate deployment:

```bash
# 1. Install and setup
npm install
npx netlify login

# 2. Deploy to preview
npm run deploy

# 3. If everything looks good, deploy to production
npm run deploy:prod
```

Your site will be live on Netlify! 🚀
