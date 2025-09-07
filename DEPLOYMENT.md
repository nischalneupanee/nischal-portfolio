# 🚀 Quick Deployment Guide

## Prerequisites
- Hashnode blog set up and published
- Vercel account (or other Next.js hosting)
- Environment variables configured

## Deployment Steps

### 1. Quick Setup
```bash
# Run the setup script
npm run setup:hashnode

# Test the integration
npm run test:hashnode

# Test locally
npm run dev
```

### 2. Environment Variables
Set these in your hosting platform:

**Required:**
- `NEXT_PUBLIC_HASHNODE_PUBLICATION=your-blog.hashnode.dev`
- `NEXT_PUBLIC_SITE_URL=https://your-domain.com`

**Recommended:**
- `HASHNODE_WEBHOOK_SECRET=your-secret-key`
- `REVALIDATE_SECRET=your-revalidate-key`
- `HASHNODE_PAT=your-personal-access-token`

### 3. Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Login and deploy
vercel login
vercel

# Add environment variables
vercel env add NEXT_PUBLIC_HASHNODE_PUBLICATION
vercel env add NEXT_PUBLIC_SITE_URL
vercel env add HASHNODE_WEBHOOK_SECRET
vercel env add REVALIDATE_SECRET
vercel env add HASHNODE_PAT

# Redeploy with new env vars
vercel --prod
```

### 4. Configure Hashnode Webhooks
1. Go to your Hashnode blog dashboard
2. Settings → Webhooks
3. Add webhook:
   - **URL:** `https://your-domain.com/api/webhook/hashnode`
   - **Events:** POST_PUBLISHED, POST_UPDATED, POST_DELETED
   - **Secret:** Your `HASHNODE_WEBHOOK_SECRET` value

### 5. Test Everything
```bash
# Test webhook endpoint
curl https://your-domain.com/api/webhook/hashnode

# Test revalidation endpoint  
curl https://your-domain.com/api/revalidate

# Check blog posts load
curl https://your-domain.com/blog

# Verify sitemap
curl https://your-domain.com/sitemap.xml

# Check RSS feed
curl https://your-domain.com/rss.xml
```

## Features Working
✅ Real-time content updates via webhooks  
✅ Incremental Static Regeneration (ISR)  
✅ Smart caching with tagged invalidation  
✅ Featured and popular posts  
✅ Related posts recommendations  
✅ Search and filtering  
✅ SEO optimization with meta tags  
✅ RSS feeds and sitemaps  
✅ Performance optimization  

## Monitoring
- Check Vercel function logs for webhook activity
- Monitor cache performance in production
- Set up alerts for failed webhook calls
- Track blog performance with Web Vitals

## Next Steps
1. Customize the blog design to match your brand
2. Add newsletter subscription forms
3. Implement comment system integration
4. Set up analytics tracking
5. Configure CDN and performance monitoring

## Support
- See `HASHNODE_INTEGRATION.md` for detailed documentation
- Check GitHub issues for common problems
- Test locally with `npm run cache:debug` for debugging

---
**🎉 Your Hashnode headless blog is now live with real-time updates!**
