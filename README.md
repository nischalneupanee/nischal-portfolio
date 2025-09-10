# 🚀 Nischal Portfolio v### 📝 Enh- **Smart Caching**: Tagged cache invalidation for efficient updates

## 🆕 What's New in v1.0.3

### Enhanced Blog Components
- **BlogActionButtons**: Floating action buttons for sharing, liking, and engagement
- **BlogNavigation**: Sticky navigation bar with dropdown menus and mobile support
- **BlogPostEngagement**: Comprehensive engagement section with reactions and comments
- **BlogTableOfContents**: Dynamic table of contents with smooth scrolling
- **ReadingProgress**: Visual reading progress indicator (top bar + circular)

### UI/UX Improvements
- **Terminal Theme**: Consistent terminal-inspired design across all blog components
- **Responsive Design**: Enhanced mobile experience with collapsible menus
- **Interactive Elements**: Smooth animations and hover effects
- **Accessibility**: Improved keyboard navigation and screen reader support
- **Performance**: Optimized component loading and better caching strategies

### Technical Enhancements
- **Server-Side Compatibility**: Fixed build issues with client/server component separation
- **Enhanced Navigation**: Dynamic navigation generation from Hashnode static pages
- **Better Fallbacks**: Improved handling of posts without cover images
- **SEO Optimization**: Enhanced meta tags and Open Graph support for individual posts

## 🛠 Tech Stacked Blog System (NEW in v1.0.3)
- **Headless CMS**: Seamlessly integrated with Hashnode GraphQL API v2.0
- **Interactive Components**: Reading progress, table of contents, share buttons
- **Enhanced UX**: Blog navigation, action buttons, engagement sections
- **Real-time Updates**: Webhook-driven content synchronization.3

Personal Portfolio website with integrated Hashnode headless blog, showcasing projects, skills, and dynamic content.

![Portfolio Preview](./public/Website%20Profile.png)

## 📋 Version Information

- **Version**: 1.0.3
- **Release Date**: September 10, 2025
- **Status**: Production Ready ✅
- **Live Demo**: [nischalneupane.name.np](https://www.nischalneupane.name.np)

## ✨ Features

### 🎨 Portfolio
- **Futuristic Design**: TerminalCSS-inspired theme with particle background effects
- **Fully Responsive**: Mobile-first design that works on all devices
- **Interactive Animations**: Smooth transitions using Framer Motion
- **Multi-page Structure**: Home, About, Skills & Projects, Blog, Contact
- **SEO Optimized**: Comprehensive meta tags and Open Graph support
- **Performance Focused**: Optimized images, lazy loading, and code splitting
- **Accessibility**: Semantic HTML and ARIA-compliant components

### � Hashnode Blog Integration (NEW in v1.0.2)
- **Headless CMS**: Seamlessly integrated with Hashnode GraphQL API v2.0
- **Real-time Updates**: Webhook-driven content synchronization
- **ISR (Incremental Static Regeneration)**: Optimal performance with automatic page updates
- **SEO Optimized**: Automatic sitemap and RSS feed generation
- **Advanced Features**: Search, analytics, related posts, and comments support
- **Smart Caching**: Tagged cache invalidation for efficient updates

## �🛠 Tech Stack

### Frontend
- **Next.js 14.2.32** - React framework with App Router
- **TypeScript** - Type-safe development
- **TailwindCSS** - Utility-first CSS framework
- **Terminal.css** - Terminal-inspired design system
- **Framer Motion** - Animation library
- **Particles.js** - Interactive particle background
- **Lucide React** - Beautiful icons

### Blog Integration
- **Hashnode GraphQL API v2.0** - Headless CMS
- **GraphQL Request** - Efficient API client
- **ISR Caching** - Smart content revalidation

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes
- **tsx** - TypeScript execution for scripts

### Deployment Ready
- **Vercel** - Optimized for Vercel deployment
- **Webhook Support** - Real-time content updates

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
