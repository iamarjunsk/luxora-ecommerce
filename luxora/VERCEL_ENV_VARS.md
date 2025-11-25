# Vercel Environment Variables

Copy these environment variables to your Vercel project:
**Settings → Environment Variables → Add New**

---

## Database (Supabase PostgreSQL)

```
DATABASE_URL
postgres://postgres.gbgjrssocprhruqytxhe:WbiQVbJWhJQbAn6X@aws-1-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1
```

```
DIRECT_URL
postgres://postgres.gbgjrssocprhruqytxhe:WbiQVbJWhJQbAn6X@aws-1-ap-south-1.pooler.supabase.com:5432/postgres
```

---

## JWT Secret (Application Authentication)

```
JWT_SECRET
c97ae45b4df9cd7bdf3d616a0920d8038fd0f8a1a7051e097a2dcb9c03e1a12b
```

---

## Razorpay Payment Gateway

**⚠️ IMPORTANT**: Use your PRODUCTION keys, not test keys!

```
RAZORPAY_KEY_ID
rzp_live_xxxxxxxxxxxxx
```

```
RAZORPAY_KEY_SECRET
your_razorpay_production_secret
```

---

## Application URL

After deployment, update this with your actual Vercel URL:

```
NUXT_PUBLIC_BASE_URL
https://your-project-name.vercel.app
```

---

## File Upload (Optional)

```
UPLOAD_DIR
./public/uploads
```

---

## ✅ Database Status

- ✅ Prisma schema updated to PostgreSQL
- ✅ All tables created in Supabase
- ✅ Database ready for production

## 📝 Next Steps

1. Push code to GitHub: `git push origin production`
2. Import repository to Vercel
3. Add all environment variables above
4. Deploy!

## 🔒 Security Notes

- ✅ JWT Secret generated (strong 32-byte random string)
- ⚠️ Remember to add production Razorpay keys
- ⚠️ Update NUXT_PUBLIC_BASE_URL after deployment
