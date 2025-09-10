# Changelog

All notable changes to Nischal Neupane Portfolio will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.3] - 2025-09-10

### 🆕 Added
- **BlogActionButtons Component**: Floating action buttons for sharing, liking, and engagement
- **BlogNavigation Component**: Sticky navigation bar with dropdown menus and mobile support
- **BlogPostEngagement Component**: Comprehensive engagement section with reactions and comments
- **BlogTableOfContents Component**: Dynamic table of contents with smooth scrolling
- **ReadingProgress Component**: Visual reading progress indicator (top bar + circular)
- Enhanced navigation with static pages support from Hashnode
- Dynamic blog navigation generation
- Improved fallback handling for posts without cover images

### 🎨 Enhanced
- **UI/UX Improvements**: Terminal-themed design consistency across all blog components
- **Responsive Design**: Enhanced mobile experience with collapsible menus
- **Interactive Elements**: Smooth animations and hover effects throughout
- **Accessibility**: Improved keyboard navigation and screen reader support
- **Performance**: Optimized component loading and better caching strategies

### 🔧 Fixed
- **Build Issues**: Resolved server-side component compatibility with onClick handlers
- **Client/Server Separation**: Proper separation of client and server components
- **Static Generation**: Fixed prerendering issues for blog post pages
- **SEO Optimization**: Enhanced meta tags and Open Graph support for individual posts

### 📚 Documentation
- Updated README.md with comprehensive v1.0.3 documentation
- Added detailed component descriptions and usage examples
- Enhanced project structure documentation
- Updated CHANGELOG.md with complete version history

## [1.0.2] - 2025-09-07

### ✨ Major Feature: Hashnode Headless Blog Integration

#### Added
- **Complete Hashnode GraphQL API v2.0 Integration**
  - Dynamic blog listing page at `/blog`
  - Individual blog post pages at `/blog/[slug]`
  - Real-time webhook support for content updates
  - ISR (Incremental Static Regeneration) with smart caching
  - Automatic sitemap and RSS feed generation
  - Search functionality for blog posts
  - Related posts suggestions
  - Comments and analytics support

- **Advanced Performance Features**
  - Tagged cache invalidation with `unstable_cache`
  - Static generation for all blog posts
  - Webhook-driven revalidation at `/api/webhook/hashnode`
  - Manual revalidation endpoint at `/api/revalidate`
  - Optimized GraphQL queries with proper error handling

- **New Dependencies**
  - `graphql-request@6.1.0` - Efficient GraphQL client
  - `tsx@4.20.5` - TypeScript execution for scripts

#### Enhanced
- **Developer Experience**
  - Comprehensive testing scripts for Hashnode integration
  - Environment variable documentation and examples
  - Debug mode for ISR caching
  - TypeScript types for all blog data structures

- **SEO & Content**
  - SEO-optimized meta tags for all blog content
  - Automatic sitemap generation including blog posts
  - RSS feed for blog syndication
  - Open Graph images from Hashnode

#### Fixed
- GraphQL schema compatibility issues
- Build process optimization for production
- Mobile responsiveness for blog components
- TypeScript compilation issues

## [1.0.1] - 2025-09-07

### 🔧 Dependencies & Security Updates

#### Updated
- **Next.js**: `14.2.5` → `14.2.32` (Critical security patches)
- **Framer Motion**: `11.3.19` → `12.23.12` (Latest features & performance improvements)
- **GraphQL**: `16.8.1` → `16.11.0` (Latest stable release)
- **Lucide React**: `0.427.0` → `0.542.0` (New icons & optimizations)

#### Fixed
- Fixed all critical security vulnerabilities in Next.js
- Added `metadataBase` for proper SEO and social media sharing
- Removed problematic `vercel.json` regions configuration for Hobby plan compatibility

#### Security
- ✅ Zero security vulnerabilities
- 🛡️ All dependencies updated to secure versions
- 🔒 Enhanced metadata configuration

## [1.0.0] - 2025-09-07

### 🎉 Initial Release

#### Added
- **Home Page**: Interactive welcome with typing animation and terminal-style design
- **About Page**: Personal journey, education timeline, and events attended
- **Skills & Projects Page**: Technical skills showcase and project portfolio
- **Blog Page**: Ready for Hashnode integration with mock posts
- **Contact Page**: Multiple contact methods and collaboration info
- **Responsive Navigation**: Mobile-friendly navbar with hamburger menu
- **Footer**: Social links and terminal-style signature
- **Particle Background**: Interactive particle.js effects
- **Dark Theme**: Terminal-inspired color scheme with glow effects
- **SEO Optimization**: Comprehensive meta tags and Open Graph support
- **Performance Optimization**: Next.js Image components and lazy loading

#### Technical Features
- Next.js 14.2.5 with App Router
- TypeScript for type safety
- TailwindCSS with custom design system
- Framer Motion animations
- Terminal.css integration
- Responsive design (mobile-first)
- Production build optimization
- Vercel deployment ready

#### Design System
- Terminal Green (#00ff41) - Primary accent
- Terminal Blue (#0099ff) - Secondary accent
- Terminal Purple (#9966ff) - Tertiary accent
- Terminal Orange (#ff9900) - Warning/highlight
- Glassmorphism cards with backdrop blur
- Hover glow effects
- Fira Code monospace typography

#### Components
- ParticleBackground: Interactive particle system
- Navbar: Responsive navigation with mobile menu
- Footer: Social links and branding
- Glass cards with hover effects
- Terminal-style command headers

### 🔧 Configuration
- ESLint configuration with Next.js rules
- Tailwind custom theme with terminal colors
- Next.js config with image optimization
- Vercel deployment configuration
- Comprehensive .gitignore

### 📚 Documentation
- Comprehensive README with setup instructions
- Project structure documentation
- Deployment guides for Vercel
- Component usage examples
- Design system documentation

### 🚀 Deployment Ready
- Optimized build process
- Static generation for better performance
- Custom domain support
- Environment configuration

---

## Planned for Future Releases

### [1.1.0] - Coming Soon
- [ ] Hashnode blog integration with live API
- [ ] Contact form with email functionality
- [ ] Project filtering and search
- [ ] Blog post search and categories
- [ ] Performance improvements

### [1.2.0] - Future
- [ ] Admin dashboard for content management
- [ ] Newsletter subscription
- [ ] Advanced animations and micro-interactions
- [ ] Multi-language support
- [ ] Analytics integration

---

**Legend:**
- 🎉 Major release
- ✨ New features
- 🔧 Technical improvements
- 🐛 Bug fixes
- 📚 Documentation
- 🚀 Deployment/Infrastructure
