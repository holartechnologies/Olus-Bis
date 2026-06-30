# Deployment Guide

This guide covers deploying **OLUS-BIS Immigration Services** to **Vercel** with **Supabase** (PostgreSQL database + file storage).

## Prerequisites

- [GitHub](https://github.com) account
- [Vercel](https://vercel.com) account
- [Supabase](https://supabase.com) project (database + storage already configured)

---

## Step 1: Supabase Setup (Already Done)

- PostgreSQL database provisioned
- `documents` storage bucket created (public, with upload/read policies)
- Database schema pushed and migrated

---

## Step 2: Deploy to Vercel

### 2.1 Push code to GitHub

```bash
git push origin main
```

### 2.2 Import on Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import the `holartechnologies/Olus-Bis` repository
3. Framework is auto-detected as **Next.js**
4. Expand **Environment Variables**

### 2.3 Add Environment Variables

Add every variable from your `.env` file into Vercel:

| Variable | Value |
|---|---|
| `DATABASE_URL` | Your Supabase PostgreSQL connection string (pooler) |
| `AUTH_SECRET` | Random secret (generate via `openssl rand -base64 32`) |
| `AUTH_URL` | `https://your-domain.vercel.app` |
| `OPENAI_API_KEY` | Your OpenAI API key |
| `SMTP_HOST` | `mail.privateemail.com` |
| `SMTP_PORT` | `465` |
| `SMTP_SECURE` | `true` |
| `SMTP_USER` | `noreply@yourdomain.com` |
| `SMTP_PASS` | Your SMTP password |
| `SMTP_FROM` | `noreply@yourdomain.com` |
| `RESEND_API_KEY` | (optional) |
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.vercel.app` |
| `NEXT_PUBLIC_SITE_NAME` | `OLUS-BIS Immigration Services` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Your WhatsApp number |
| `NEXT_PUBLIC_PHONE_NUMBER` | Your phone number |
| `NEXT_PUBLIC_EMAIL` | `info@yourdomain.com` |
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service role key |
| `NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET` | `documents` |

### 2.4 Deploy

Click **Deploy**. Vercel will build and deploy the project automatically.

---

## Step 3: Post-Deployment

1. Visit your Vercel URL to verify the site works
2. Login at `/auth/login`:
   - **Email:** `admin@olus-bis.com`
   - **Password:** `Admin@123456`
3. Change the admin password immediately

### Custom Domain (Optional)

1. In your Vercel project dashboard, go to **Settings → Domains**
2. Add your custom domain (e.g., `olus-bis.com`)
3. Update your domain's DNS records as instructed by Vercel

---

## Environment Variables Reference

### Database (Supabase PostgreSQL)

```
DATABASE_URL="postgresql://postgres.[project-ref]:[password]@[region].pooler.supabase.com:5432/postgres?sslmode=require"
```

### Supabase (Storage + Auth)

```
NEXT_PUBLIC_SUPABASE_URL="https://[project-ref].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[anon-key]"
SUPABASE_SERVICE_ROLE_KEY="[service-role-key]"
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET="documents"
```

---

## Troubleshooting

**Build fails:**
- Ensure all env vars are set in Vercel dashboard
- Run `npm run build` locally to check for errors

**Database connection error:**
- Verify `DATABASE_URL` uses the **pooler** connection string (not direct)
- Ensure `sslmode=require` is appended

**File uploads fail:**
- Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correct
- Check that the `documents` bucket exists and has upload policies
- Check browser console for CORS errors

**Emails not sending:**
- Verify SMTP settings in Vercel env vars
- Try using Resend as alternative (set `RESEND_API_KEY`)
