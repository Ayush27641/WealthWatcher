# 🚀 WealthWatcher Deployment Guide

This guide will help you deploy WealthWatcher to production environments.

## Prerequisites

- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 9.0.0 or higher
- **PostgreSQL**: Database (recommend Supabase for managed solution)

## Environment Setup

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone <your-repo-url>
cd WealthWatcher-main

# Install dependencies
npm install

# Generate Prisma client
npm run postinstall
```

### 2. Environment Variables

Copy the `.env.example` file to `.env` and fill in your production values:

```bash
cp .env.example .env
```

#### Required Environment Variables:

- **DATABASE_URL**: Your production PostgreSQL connection string
- **DIRECT_URL**: Direct database connection (for migrations)
- **NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY**: Clerk authentication public key
- **CLERK_SECRET_KEY**: Clerk authentication secret key
- **GROQ_API_KEY**: Groq AI API key for receipt scanning and insights
- **RESEND_API_KEY**: Resend email service API key
- **ARCJET_KEY**: ArcJet security service API key

## Database Setup

### 1. Run Database Migrations

```bash
# Deploy migrations to production database
npm run db:migrate
```

### 2. Optional: Seed Database

```bash
# Seed with initial data (if needed)
npm run db:seed
```

## Build and Deploy

### 1. Production Build

```bash
# Build the application
npm run build

# Start production server
npm start
```

### 2. Pre-deployment Checks

```bash
# Run linting and type checking
npm run check
```

## Deployment Platforms

### Vercel (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Set Environment Variables**:
   - Add all environment variables in Vercel dashboard
   - Ensure database is accessible from Vercel's regions

### Railway

1. **Connect Repository**: Link your GitHub repository to Railway
2. **Set Environment Variables**: Add all required environment variables
3. **Deploy**: Railway will automatically deploy when you push to main branch

### Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

## Post-Deployment Configuration

### 1. Domain Setup
- Configure your custom domain
- Set up SSL certificates
- Update Clerk authentication URLs

### 2. Database Maintenance
```bash
# Monitor database performance
# Set up automated backups
# Configure connection pooling if needed
```

### 3. Monitoring & Logging
- Set up application monitoring (Sentry, DataDog, etc.)
- Configure log aggregation
- Set up uptime monitoring

## Security Checklist

- ✅ Environment variables are set correctly
- ✅ Database connections use SSL
- ✅ Authentication is properly configured
- ✅ Security headers are enabled (configured in next.config.mjs)
- ✅ CORS is properly configured
- ✅ Rate limiting is enabled (ArcJet)
- ✅ Input validation is in place

## Performance Optimization

### 1. Database Optimization
- Ensure proper indexing (configured in schema.prisma)
- Monitor query performance
- Set up connection pooling

### 2. CDN and Caching
- Use CDN for static assets
- Configure proper cache headers
- Enable image optimization

### 3. Bundle Analysis
```bash
ANALYZE=true npm run build
```

## Troubleshooting

### Common Issues:

1. **Database Connection Errors**:
   - Verify DATABASE_URL and DIRECT_URL
   - Check database server accessibility
   - Ensure SSL configuration

2. **Authentication Issues**:
   - Verify Clerk environment variables
   - Check domain configuration
   - Ensure callback URLs are correct

3. **Build Failures**:
   - Run `npm run check` locally first
   - Check for environment variable dependencies
   - Verify all imports are correct

4. **Performance Issues**:
   - Monitor database query performance
   - Check for N+1 query problems
   - Optimize image loading

## Environment-Specific Notes

### Production Environment Variables
Set `NODE_ENV=production` for:
- Optimized error handling
- Reduced logging
- Performance optimizations

### Staging Environment
- Use separate Clerk environment
- Use staging database
- Enable detailed logging for debugging

## Maintenance

### Regular Updates
```bash
# Check for dependency updates
npm outdated

# Update dependencies
npm update

# Run security audit
npm audit
```

### Database Maintenance
```bash
# Generate new migration after schema changes
npx prisma migrate dev --name migration_name

# Deploy migration to production
npm run db:migrate
```

## Support

For deployment issues:
1. Check the application logs
2. Verify environment variables
3. Test database connectivity
4. Check service integrations (Clerk, Groq, Resend, ArcJet)

---

**Happy Deploying! 🎉**