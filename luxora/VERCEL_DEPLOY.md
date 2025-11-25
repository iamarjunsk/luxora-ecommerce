# Vercel Deployment Guide

## Quick Deployment Steps

### 1. Prepare Database

**Option A: Vercel Postgres (Recommended)**
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to Storage → Create Database → Postgres
3. Copy the connection string

**Option B: Supabase (Free PostgreSQL)**
1. Create account at [Supabase](https://supabase.com)
2. Create new project
3. Get connection string from Settings → Database

### 2. Push to GitHub

```bash
# Add all files
git add .

# Commit changes
git commit -m "Ready for production deployment"

# Push to GitHub
git push origin production
```

### 3. Deploy on Vercel

1. Visit [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Select the `production` branch
4. Configure project:
   - **Framework Preset**: Nuxt.js
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: `.output`

### 4. Add Environment Variables

In Vercel dashboard, go to **Settings → Environment Variables** and add:

```bash
DATABASE_URL=postgresql://user:pass@host:5432/db
JWT_SECRET=your-super-secure-random-secret-32-chars-minimum
RAZORPAY_KEY_ID=rzp_live_xxxxx
RAZORPAY_KEY_SECRET=your_secret_key
NUXT_PUBLIC_BASE_URL=https://your-domain.vercel.app
```

> **Generate JWT Secret**: Run this in terminal:
> ```bash
> node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
> ```

### 5. Run Database Migration

After first deployment, run migrations:

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Link your project
vercel link

# Run migrations
vercel env pull .env.production
npx prisma migrate deploy
```

### 6. Update Razorpay Webhook

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com)
2. Settings → Webhooks → Add Webhook
3. URL: `https://your-domain.vercel.app/api/payment/webhook`
4. Events: Select `payment.authorized`, `payment.failed`

### 7. Test Your Deployment

Visit your Vercel URL and test:
- [ ] Login/Registration
- [ ] Browse products
- [ ] Add to cart
- [ ] Checkout (test mode)
- [ ] Admin dashboard

---

## Post-Deployment

### Custom Domain

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### Enable Image Optimization

Vercel automatically optimizes images. For custom needs:
- Use Vercel's Image Optimization
- Or configure Cloudinary/AWS S3

### Monitor Performance

- View Analytics in Vercel Dashboard
- Check Function Logs for errors
- Monitor database performance

---

## Troubleshooting

### Build Fails
- Check build logs in Vercel
- Verify all environment variables are set
- Test build locally: `npm run build`

### Database Connection Error
- Verify DATABASE_URL format
- Check database allows external connections
- For Vercel Postgres, ensure project is linked

### Images Not Loading
- Check public folder is committed to git
- Verify UPLOAD_DIR path
- Consider using cloud storage for production

---

## Quick Commands

```bash
# Deploy to production
git push origin production

# View deployment
vercel --prod

# Check logs
vercel logs

# Run database migration
npx prisma migrate deploy
```
