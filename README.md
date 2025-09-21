# 🚀 Nischal Portfolio v2.0.0 - Production Ready

Professional portfolio website with comprehensive Hashnode blog integration, featuring advanced search, series support, modular architecture, and production-optimized performance.

![Portfolio Preview](./public/Website%20Profile.png)

## 📋 Version Information

- **Version**: 2.0.0
- **Release Date**: January 2025
- **Status**: Production Ready ✅
- **Live Demo**: [nischalneupane.name.np](https://www.nischalneupane.name.np)
- **Performance**: 87.2kB shared JS bundle, fully optimized for production

## ✨ Features Overview

### 🎨 Portfolio Core
- **Futuristic Design**: TerminalCSS-inspired theme with particle background effects
- **Fully Responsive**: Mobile-first design optimized for all devices
- **Interactive Animations**: Smooth transitions using Framer Motion
- **Multi-page Architecture**: Home, About, Skills & Projects, Blog, Contact
- **SEO Optimized**: Comprehensive meta tags, Open Graph, and sitemap
- **Performance Focused**: Optimized bundles, lazy loading, static generation

### 📚 Advanced Blog System
- **Complete Hashnode Integration**: Native GraphQL API with full series support
- **Modular Component Architecture**: 15+ reusable, production-tested components
- **Advanced Search & Filtering**: Real-time search with tag filtering and sorting
- **Series Management**: Dedicated series pages with hierarchical navigation
- **Production-Ready Caching**: Next.js unstable_cache with revalidation strategies
- **GraphQL Schema Compliance**: Fully validated queries matching Hashnode v2 API

### 🔧 Technical Excellence
- **Next.js 14.2.32**: App Router with static generation and SSR
- **TypeScript**: Full type safety with strict configuration
- **TailwindCSS**: Utility-first styling with custom terminal theme
- **GraphQL**: Efficient data fetching with proper error handling
- **Production Build**: Clean compilation with zero warnings or errors

## 🛠️ Quick Start

### Prerequisites
- Node.js ≥ 18.0.0
- npm ≥ 8.0.0
- Hashnode account with published articles

### Installation

1. **Clone and Install**
   ```bash
   git clone https://github.com/nischalneupanee/nischal-portfolio.git
   cd nischal-portfolio/portfolio
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Hashnode details
   ```

3. **Development Server**
   ```bash
   npm run dev
   # Opens http://localhost:3000
   ```

4. **Production Build**
   ```bash
   npm run build
   npm start
   ```

## 🔧 Environment Configuration

### Required Environment Variables

Create a `.env.local` file with the following variables:

```env
# Hashnode Configuration
HASHNODE_PUBLICATION_HOST=your-blog.hashnode.dev
NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST=your-blog.hashnode.dev

# GraphQL Endpoint (Optional - uses default if not set)
HASHNODE_GRAPHQL_ENDPOINT=https://gql.hashnode.com

# Revalidation Settings (Optional)
REVALIDATE_SECRET=your-webhook-secret-key
```

### Environment Variable Details

| Variable | Required | Description | Default |
|----------|----------|-------------|---------|
| `HASHNODE_PUBLICATION_HOST` | ✅ | Your Hashnode publication domain | - |
| `NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST` | ✅ | Public version for client-side | - |
| `HASHNODE_GRAPHQL_ENDPOINT` | ❌ | GraphQL API endpoint | `https://gql.hashnode.com` |
| `REVALIDATE_SECRET` | ❌ | Webhook secret for revalidation | - |

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── blog/              # Blog pages and components
│   │   │   ├── [slug]/        # Dynamic blog post pages
│   │   │   ├── series/        # Series listing and detail pages
│   │   │   └── page.tsx       # Main blog listing
│   │   ├── api/               # API routes
│   │   │   ├── revalidate/    # ISR revalidation endpoint
│   │   │   └── webhook/       # Hashnode webhook handler
│   │   └── (other pages)/     # About, Contact, Skills, etc.
│   ├── components/            # Reusable UI components
│   │   ├── BlogContainer.tsx  # Main blog layout wrapper
│   │   ├── BlogSearch.tsx     # Advanced search component
│   │   ├── BlogNavigation.tsx # Blog navigation and breadcrumbs
│   │   └── (other components) # Supporting UI components
│   ├── hooks/                 # Custom React hooks
│   │   └── useBlogPosts.ts    # Blog data fetching hook
│   └── lib/                   # Utility libraries
│       ├── hashnode.ts        # GraphQL client and queries
│       ├── rss.ts            # RSS feed generation
│       └── sitemap.ts        # Sitemap generation
├── public/                    # Static assets
├── scripts/                   # Development and setup scripts
└── (config files)            # Next.js, TypeScript, Tailwind configs
```

## 🚀 Deployment Guide

### Vercel Deployment (Recommended)

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy to Vercel
   vercel --prod
   ```

2. **Environment Variables**
   - Add all required environment variables in Vercel dashboard
   - Ensure `NEXT_PUBLIC_*` variables are properly configured

3. **Build Settings**
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

### Manual Deployment

1. **Build for Production**
   ```bash
   npm run build
   npm run start
   ```

2. **Static Export (if needed)**
   ```bash
   # Add to next.config.mjs for static export
   output: 'export'
   ```

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🧪 Testing & Quality Assurance

### Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Production build
npm run start           # Start production server
npm run lint            # Run ESLint
npm run type-check      # TypeScript type checking
npm run preview         # Build and preview production

# Hashnode Integration
npm run setup:hashnode  # Interactive Hashnode setup
npm run test:hashnode   # Test Hashnode API connection

# Performance
npm run cache:debug     # Debug caching behavior
```

### Pre-deployment Checklist

- [ ] All GraphQL queries validated against Hashnode schema
- [ ] Production build completes without errors or warnings
- [ ] TypeScript compilation passes (`npm run type-check`)
- [ ] No security vulnerabilities (`npm audit`)
- [ ] Environment variables properly configured
- [ ] Blog posts load correctly with series and search functionality
- [ ] Mobile responsiveness tested across devices
- [ ] SEO meta tags and OpenGraph properly set
- [ ] Performance metrics meet Core Web Vitals standards

## 🔧 API Reference

### GraphQL Queries

The application uses several optimized GraphQL queries:

- `GET_POSTS_QUERY`: Fetch blog posts with pagination
- `GET_POST_BY_SLUG_QUERY`: Fetch individual blog post
- `GET_SERIES_QUERY`: Fetch all series
- `GET_SERIES_BY_SLUG_QUERY`: Fetch series with posts
- `SEARCH_POSTS_QUERY`: Search posts with filtering

### Webhook Integration

```typescript
// Webhook endpoint: /api/webhook/hashnode
POST /api/webhook/hashnode
{
  "data": {
    "post": {
      "slug": "post-slug",
      "// ... post data"
    }
  }
}
```

## 📊 Performance Metrics

### Bundle Analysis
- **Shared JS**: 87.2kB (optimized)
- **First Load JS**: ~96kB average per page
- **Static Pages**: 14 pages pre-rendered
- **Dynamic Routes**: Series pages and blog posts

### Core Web Vitals
- **LCP**: < 2.5s (optimized images and code splitting)
- **FID**: < 100ms (minimal JavaScript execution)
- **CLS**: < 0.1 (stable layout with proper sizing)

## 🐛 Troubleshooting

### Common Issues

**GraphQL Schema Errors**
```bash
# Error: Field "description" must have subfields
# Solution: Ensure proper field selection in queries
description {
  text
}
```

**Build Failures**
```bash
# Error: Type errors during build
# Solution: Run type checking
npm run type-check
```

**Missing Environment Variables**
```bash
# Error: HASHNODE_PUBLICATION_HOST not defined
# Solution: Check .env.local file
cp .env.example .env.local
```

**Series Not Loading**
```bash
# Error: Series queries failing
# Solution: Verify series exist on Hashnode and GraphQL query syntax
```

### Debug Mode

```bash
# Enable caching debug
npm run cache:debug

# Test Hashnode connection
npm run test:hashnode
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript strict mode
- Use semantic commit messages
- Test all blog functionality before submitting
- Ensure production build passes
- Update documentation for new features

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🎯 Changelog

### v2.0.0 (January 2025)
- ✅ Production-ready build with zero warnings
- ✅ Complete GraphQL schema compliance
- ✅ Enhanced package.json with proper metadata
- ✅ Comprehensive documentation and deployment guide
- ✅ Performance optimization (87.2kB shared bundle)
- ✅ Full TypeScript strict mode compliance

### v1.1.0 (Previous Release)
- Complete blog system redesign
- Modular component architecture
- Series support implementation
- Advanced search functionality

---

**Built with ❤️ by [Nischal Neupane](https://www.nischalneupane.name.np)**

*Portfolio showcasing AI/ML expertise with a production-ready blog system*

### 🎯 UX Improvements
- **Eliminated Duplicate Content**: Removed redundant CTAs and sections
- **Consistent Terminal Theme**: Maintained design language throughout
- **Better Content Structure**: Logical information hierarchy
- **Improved Engagement**: Single, well-placed interaction points
- **Enhanced Readability**: Better typography and spacing

## 🛠 Tech Stack

### Frontend
- **Next.js 14.2.32** - React framework with App Router
- **TypeScript** - Type-safe development
- **TailwindCSS** - Utility-first CSS framework
- **Terminal.css** - Terminal-inspired design system
- **Framer Motion** - Animation library
- **Particles.js** - Interactive particle background
- **Lucide React** - Beautiful icons

### Blog System (v1.1.0)
- **Hashnode GraphQL API v2.0** - Complete headless CMS integration
- **GraphQL Request** - Efficient API client with caching
- **ISR Caching** - Smart content revalidation (3600s default)
- **Series Support** - Full Hashnode series functionality
- **Advanced Search** - Real-time filtering and sorting
- **Modular Components** - Reusable blog UI components

### Development Tools
- **ESLint** - Code linting and best practices
- **PostCSS** - CSS processing and optimization
- **Autoprefixer** - CSS vendor prefixes
- **tsx** - TypeScript execution for scripts

### Performance & SEO
- **Static Generation** - Pre-rendered pages with ISR
- **Sitemap Generation** - Automatic XML sitemap creation
- **RSS Feed** - Auto-generated RSS feed for blog
- **Meta Tags** - Comprehensive OpenGraph and Twitter card support
- **Webhook Support** - Real-time content updates from Hashnode

### Deployment Ready
- **Vercel** - Optimized for Vercel deployment
- **Environment Variables** - Secure configuration management
- **Build Optimization** - Tree shaking and code splitting

## 🚀 Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nischalneupanee/nischal-portfolio.git
   cd nischal-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your configuration (see Environment Variables section)

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Environment Variables

### Required for Basic Functionality (Configure Now)

```bash
# Your Hashnode publication domain
NEXT_PUBLIC_HASHNODE_PUBLICATION=yourusername.hashnode.dev

# Hashnode GraphQL endpoint (default is fine)
NEXT_PUBLIC_HASHNODE_GQL_END=https://gql.hashnode.com
```

### Optional (Configure After Deployment in Vercel)

```bash
# Your live domain (after deployment)
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Hashnode Personal Access Token (for enhanced features)
# Get from: https://hashnode.com/settings/developer
HASHNODE_PAT=your_hashnode_personal_access_token

# Security secrets (generate using: openssl rand -hex 32)
HASHNODE_WEBHOOK_SECRET=your_webhook_secret
REVALIDATE_SECRET=your_revalidate_secret
```

### Build for Production

```bash
npm run build
npm start
```

## 🚀 Deployment

### Quick Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "feat: portfolio v1.0.2 with Hashnode integration"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables in Vercel dashboard
   - Deploy automatically

3. **Post-Deployment Setup**
   - Update `NEXT_PUBLIC_SITE_URL` with your actual domain
   - Generate secure secrets for webhooks and revalidation
   - Configure Hashnode webhooks (see Hashnode Integration section)

### Hashnode Integration Setup

1. **Configure Webhooks in Hashnode**
   - Go to your Hashnode dashboard → Blog Settings → Integrations
   - Add webhook URL: `https://yourdomain.com/api/webhook/hashnode`
   - Use the `HASHNODE_WEBHOOK_SECRET` you configured in Vercel

2. **Generate Security Secrets**
   ```bash
   # Generate webhook secret
   openssl rand -hex 32
   
   # Generate revalidation secret
   openssl rand -hex 32
   ```

3. **Test Integration**
   ```bash
   # Test Hashnode connection
   npm run test:hashnode
   
   # Test manual revalidation
   curl "https://yourdomain.com/api/revalidate?secret=YOUR_REVALIDATE_SECRET"
   ```

### Manual GitHub Setup

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit with version tag
git commit -m "feat: nischal-portfolio v1.0.2 - Hashnode integration"

# Add GitHub remote
git remote add origin https://github.com/nischalneupanee/nischal-portfolio.git

# Push to GitHub
git branch -M main
git push -u origin main

# Create version tag
git tag v1.0.0
git push origin v1.0.0
```

## �📁 Project Structure

```
portfolio/
├── public/                 # Static assets
│   ├── home-photo.png     # Profile images
│   ├── about-photo.jpg    
│   ├── navlogo.png        
│   ├── project1.jpeg      # Project images
│   ├── project2.jpeg      
│   ├── project3.jpeg      
│   └── Nischal Resume.pdf # Resume file
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── about/         # About page
│   │   ├── blog/          # Blog listing and individual posts
│   │   │   └── [slug]/    # Dynamic blog post pages
│   │   ├── contact/       # Contact page
│   │   ├── skills-projects/ # Skills & Projects page
│   │   ├── api/           # API routes for webhooks and revalidation
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx       # Home page
│   │   └── globals.css    # Global styles
│   ├── components/        # Reusable components
│   │   ├── Navbar.tsx     # Navigation component
│   │   ├── Footer.tsx     # Footer component
│   │   ├── ParticleBackground.tsx # Particle effects
│   │   ├── BlogActionButtons.tsx # Floating blog action buttons
│   │   ├── BlogNavigation.tsx # Blog navigation with dropdowns
│   │   ├── BlogPostEngagement.tsx # Post engagement section
│   │   ├── BlogTableOfContents.tsx # Dynamic TOC
│   │   ├── ReadingProgress.tsx # Reading progress indicator
│   │   ├── BlogContainer.tsx # Blog post container
│   │   ├── BlogSearch.tsx # Blog search functionality
│   │   └── TagFilter.tsx  # Tag filtering component
│   ├── hooks/             # Custom React hooks
│   │   └── useBlogPosts.ts # Blog posts data fetching
│   └── lib/               # Utility functions
│       ├── hashnode.ts    # Hashnode API integration
│       ├── rss.ts         # RSS feed generation
│       └── sitemap.ts     # Sitemap generation
├── tailwind.config.ts     # Tailwind configuration
├── next.config.mjs        # Next.js configuration
└── package.json          # Dependencies and scripts
```

## 🎨 Design System

### Color Palette
- **Terminal Green**: `#00ff41` - Primary accent
- **Terminal Blue**: `#0099ff` - Secondary accent  
- **Terminal Purple**: `#9966ff` - Tertiary accent
- **Terminal Orange**: `#ff9900` - Warning/highlight
- **Background Dark**: `#0a0a0a` - Main background
- **Background Darker**: `#050505` - Card backgrounds

### Typography
- **Primary Font**: Fira Code (Monospace)
- **Secondary Font**: Inter (Sans-serif)

### Components
- **Glass Cards**: Glassmorphism effect with backdrop blur
- **Terminal Commands**: Command-line inspired headings
- **Hover Glows**: Interactive glow effects on hover
- **Particle Background**: Animated particle system

## 👨‍💻 Author

**Nischal Neupane**
- Portfolio: [nischalneupane.name.np](https://www.nischalneupane.name.np)
- LinkedIn: [linkedin.com/in/nischalneupanee](https://www.linkedin.com/in/nischalneupanee/)
- GitHub: [github.com/nischalneupanee](https://github.com/nischalneupanee)
- Blog: [www.nischalneupane.name.np/blog](https://www.nischalneupane.name.np/blog)

---

**Built using Next.js, TailwindCSS & TypeScript**

*"The future belongs to those who learn more skills and combine them in creative ways."* - Nischal Neupane
