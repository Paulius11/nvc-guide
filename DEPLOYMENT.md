# Deployment Guide

## GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Setup Instructions

1. **Enable GitHub Pages**
   - Go to your repository Settings
   - Navigate to "Pages" section
   - Set Source to "GitHub Actions"

2. **Configure Repository**
   - Ensure the main branch is `main` or `master`
   - The workflow is triggered on push to these branches

3. **Automatic Deployment**
   - Every push to `main`/`master` triggers the build
   - GitHub Actions builds the web version using `npx expo export --platform web`
   - Built files are deployed to the `gh-pages` branch
   - Site is available at: `https://paulius11.github.io/nvc-guide`

### Manual Deployment

If you need to deploy manually:

```bash
# Build for web
npx expo export --platform web

# The build output will be in the 'dist' folder
# You can upload this folder to any static hosting service
```

### Troubleshooting

- **Build fails**: Check that all dependencies are properly installed
- **Assets not loading**: Ensure all asset paths are relative and correctly referenced
- **Routing issues**: The app uses React Navigation which should work with static hosting

### Supported Platforms

- **GitHub Pages**: ✅ Configured with GitHub Actions
- **Netlify**: ✅ Deploy the `dist` folder
- **Vercel**: ✅ Deploy the `dist` folder  
- **Firebase Hosting**: ✅ Deploy the `dist` folder
- **Any Static Host**: ✅ Upload the `dist` folder contents

### Environment Variables

No environment variables are required for basic deployment. The app runs entirely client-side with static data.