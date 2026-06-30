# OLUS-BIS Immigration Services

A full-stack immigration case management platform built with **Next.js 16**, **React 19**, **TypeScript**, **Supabase** (PostgreSQL + Storage), and **Prisma ORM**.

## Tech Stack

| Category | Tech |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS v4, Framer Motion, shadcn/ui |
| Database | Supabase PostgreSQL (via Prisma ORM) |
| Auth | NextAuth v5 (credentials) |
| File Storage | Supabase Storage |
| AI | OpenAI API |
| Email | Nodemailer (SMTP) / Resend |
| Deployment | Vercel |

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env
# Fill in your Supabase credentials, OpenAI key, etc.

# 3. Generate Prisma client
npx prisma generate

# 4. Push schema to database
npx prisma db push

# 5. Seed database (creates admin user + sample data)
npx prisma db seed

# 6. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Admin Access

After seeding, login at `/auth/login`:
- **Email:** `admin@olus-bis.com`
- **Password:** `Admin@123456`

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run prisma:generate` | Generate Prisma client |
| `npm run prisma:push` | Push schema to database |
| `npm run prisma:migrate` | Run database migrations |
| `npm run prisma:seed` | Seed database |
| `npm run prisma:studio` | Open Prisma Studio |

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for deploying to Vercel with Supabase.
