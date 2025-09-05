# Vercel Deployment Guide

## Required Environment Variables

Set these environment variables in your Vercel project settings:

### Database
```
DATABASE_URL=postgresql://username:password@host:port/database
```
*Get this from your PostgreSQL provider (Neon, Supabase, PlanetScale, etc.)*

### Authentication
```
NEXTAUTH_SECRET=your-super-secret-key-here
NEXTAUTH_URL=https://your-domain.vercel.app
```
*Generate a secret with: `openssl rand -base64 32`*

### Email (Optional - for password reset)
```
EMAIL_SERVER_USER=your-smtp-username
EMAIL_SERVER_PASSWORD=your-smtp-password  
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_FROM=noreply@yourdomain.com
```

## Database Setup

1. **Create a PostgreSQL database** using:
   - [Neon](https://neon.tech) (recommended for Vercel)
   - [Supabase](https://supabase.com)  
   - [PlanetScale](https://planetscale.com)

2. **Set DATABASE_URL** in Vercel environment variables

3. **Deploy and run migrations**: The build process will automatically generate Prisma client

## Deployment Steps

1. **Connect to Vercel**:
   ```bash
   vercel --prod
   ```

2. **Set environment variables** in Vercel dashboard

3. **Deploy**:
   ```bash
   git push origin master
   ```

## Post-Deployment

1. **Create admin user** by visiting `/auth/register` and creating the first user
2. **Update user role** in database to `SUPER_ADMIN` if needed
3. **Test authentication** flow

## Troubleshooting

- **Build fails**: Check that all environment variables are set
- **Database errors**: Verify DATABASE_URL is correct PostgreSQL connection
- **Auth issues**: Confirm NEXTAUTH_SECRET and NEXTAUTH_URL are set
- **Missing tables**: Database should auto-migrate on first deploy

## Local Development

```bash
# Copy environment template
cp .env.example .env

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run development server
npm run dev
```