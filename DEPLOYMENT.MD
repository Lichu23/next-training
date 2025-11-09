# Deployment Guide: Barcode Scanner App

## Prerequisites
- Node.js (v18 or later)
- npm or yarn
- Git (for Vercel/Netlify deployment)
- Vercel or Netlify account (free tier works)

## 1. Build the Application

```bash
# Install dependencies
npm install

# Create production build
npm run build

# Test production build locally
npm start
```

## 2. Deploy to Vercel (Recommended)

1. Push your code to a GitHub/GitLab/Bitbucket repository
2. Go to [Vercel](https://vercel.com) and sign in with your Git provider
3. Click "Add New" → "Project"
4. Import your repository
5. Configure settings:
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`
6. Click "Deploy"

## 3. Environment Variables

If you add any environment variables later:
1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add your variables
4. Redeploy the application

## 4. Testing in Production

1. Open your deployed URL in Chrome/Edge (desktop) or Chrome (Android)
2. Grant camera permissions when prompted
3. Test the barcode scanner with different barcodes

## 5. Troubleshooting

- **Camera not working**: Ensure you're using HTTPS and have granted camera permissions
- **Barcode not detected**: Try with well-lit conditions and proper focus
- **Browser support issues**: The app works best in Chrome/Edge on desktop and Chrome on Android

## 6. Updating the App

1. Make your changes locally
2. Commit and push to your repository
3. Vercel will automatically redeploy the app

## 7. Custom Domain (Optional)

1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Follow the instructions to add your custom domain
