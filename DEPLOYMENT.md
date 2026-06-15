# Deployment Guide for Namecheap Shared Hosting

## Prerequisites
- Namecheap Shared Hosting account (Stellar or higher recommended)
- Domain name configured in Namecheap
- Node.js 18+ support (verify with Namecheap support or use CGI/Node.js selector in cPanel)

## Step 1: Database Setup

1. Log into your Namecheap cPanel
2. Find **MySQL Databases** (or **MariaDB**)
3. Create a new database:
   - Database Name: `olusbis_immigration`
   - Username: Create a database user
   - Password: Strong password
4. Note the database connection details:
   - Host: Usually `localhost` (check cPanel)
   - Port: `3306`

## Step 2: Prepare Your Project

```bash
# 1. Install dependencies
npm install

# 2. Generate Prisma client
npx prisma generate

# 3. Push schema to database
npx prisma db push

# 4. Seed the database (creates admin user + sample data)
npx prisma db seed

# 5. Build the project
npm run build
```

## Step 3: Upload to Namecheap

### Option A: Direct Upload (via cPanel File Manager)

1. In cPanel, open **File Manager**
2. Navigate to `public_html` (or a subfolder if using a subdomain)
3. Upload the entire project (or use Git)

### Option B: Git Deployment

1. In cPanel, find **Git Version Control**
2. Create or clone a repository
3. Point it to your repository

## Step 4: Configure Environment Variables

Create `.env` file in the project root on the server:

```env
DATABASE_URL="mysql://username:password@localhost:3306/olusbis_immigration"
AUTH_SECRET="your-random-secret-here"
AUTH_URL="https://yourdomain.com"
OPENAI_API_KEY="your-openai-api-key"
SMTP_HOST="mail.privateemail.com"
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER="noreply@yourdomain.com"
SMTP_PASS="your-password"
SMTP_FROM="noreply@yourdomain.com"
NEXT_PUBLIC_SITE_URL="https://yourdomain.com"
NEXT_PUBLIC_SITE_NAME="OLUS-BIS Immigration Services"
NEXT_PUBLIC_WHATSAPP_NUMBER="+1234567890"
NEXT_PUBLIC_PHONE_NUMBER="+1234567890"
NEXT_PUBLIC_EMAIL="info@yourdomain.com"
```

## Step 5: Start the Application

### Using Node.js App (if available in cPanel):

1. Go to **Setup Node.js App** in cPanel
2. Create a new application:
   - Node.js version: 18.x or 20.x
   - Application mode: Production
   - Application root: `/public_html` (or subfolder)
   - Application URL: your domain
   - Application startup file: `node_modules/.bin/next`
   - Pass environment variables (from `.env`)
3. Start the application

### Using Passenger (mod_passenger):

Namecheap supports Passenger for Node.js apps:
1. Ensure a `package.json` exists
2. The app will auto-start via Passenger

### Using Custom Startup Script:

Create a `server.js` in the root:

```javascript
const { spawn } = require('child_process');
const next = spawn('npx', ['next', 'start'], {
  env: { ...process.env, PORT: process.env.PORT || 3000 },
  stdio: 'inherit'
});
next.on('close', (code) => process.exit(code));
```

## Step 6: Configure .htaccess (Apache)

Create/update `.htaccess` in `public_html`:

```apache
# Force HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]

# Proxy to Node.js app (if not using Passenger)
RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]

# Security headers
Header set X-Content-Type-Options "nosniff"
Header set X-Frame-Options "DENY"
Header set X-XSS-Protection "1; mode=block"
Header set Referrer-Policy "strict-origin-when-cross-origin"

# Block access to sensitive files
<FilesMatch "\.(env|json|md|lock)$">
  Require all denied
</FilesMatch>

# Block access to storage directory
RewriteRule ^storage/ - [F,L]
```

## Step 7: Post-Deployment

1. Visit `https://yourdomain.com` to verify the site works
2. Visit `https://yourdomain.com/admin` to access the admin dashboard
3. Log in with admin credentials:
   - Email: `admin@olus-bis.com`
   - Password: `Admin@123456`
4. Change the admin password immediately

## Step 8: SSL Certificate

1. In cPanel, find **SSL/TLS**
2. Install **AutoSSL** or **Let's Encrypt**
3. Ensure HTTPS is working on your domain

## Folder Structure on Server

```
public_html/          # or a subfolder
├── .next/            # Built application
├── storage/
│   └── private/      # Uploaded files (secure)
│       ├── passports/
│       ├── certificates/
│       ├── visa-documents/
│       ├── employment-records/
│       └── consultation-files/
├── src/
├── prisma/
├── public/
├── node_modules/
├── .env              # Environment variables (KEEP SECURE)
├── package.json
├── next.config.ts
└── server.js         # Optional startup script
```

## Important Notes

1. **Storage**: Files are stored locally under `/storage/private/` - no external storage services needed
2. **Backups**: Regularly backup the `/storage/private/` folder and database
3. **Updates**: Run `npm run build` after any code changes
4. **Monitoring**: Check cPanel error logs if something goes wrong
5. **Scaling**: If traffic grows, consider upgrading your Namecheap hosting plan

## Troubleshooting

**Site shows 500 error:**
- Check `.env` file is properly configured
- Check database connection
- Check Node.js version compatibility
- View error logs in cPanel

**Uploads not working:**
- Ensure `/storage/private/` directory is writable
- Check file size limits in php.ini (if applicable)

**Emails not sending:**
- Verify SMTP settings in `.env`
- Check if Namecheap email is properly configured
- Try using Resend as alternative

**Build failing:**
- Ensure all dependencies are installed: `npm ci`
- Clear Next.js cache: `rm -rf .next`
- Rebuild: `npm run build`

## Support

For hosting-related issues: Namecheap Support
For application issues: Your development team
