# 🚀 Nischal Portfolio v2.0.1

[![Next.js](https://img.shields.io/badge/Next.js-14.2.32-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)](https://graphql.org/)
[![Jest](https://img.shields.io/badge/Jest-112%2B_Tests-C21325?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> Professional portfolio website with comprehensive Hashnode blog integration, featuring advanced search, modular architecture, enterprise-level testing, and production-optimized performance.

## 🌟 Live Demo

**🔗 [View Live Portfolio](https://www.nischalneupane.name.np)**

![Portfolio Preview](./public/Website%20Profile.png)

## ✨ Features

### 🎨 Portfolio Core
- **Futuristic Design**: Terminal-inspired theme with particle background effects
- **Fully Responsive**: Mobile-first design optimized for all devices  
- **Interactive Animations**: Smooth transitions using Framer Motion
- **Multi-page Architecture**: Home, About, Skills & Projects, Blog, Contact
- **SEO Optimized**: Comprehensive meta tags, Open Graph, and sitemap

### 📚 Advanced Blog System
- **Complete Hashnode Integration**: Native GraphQL API with full blog support
- **Advanced Search & Filtering**: Real-time search with tag filtering and sorting
- **Reading Progress**: Visual progress indicator while reading
- **Social Sharing**: Share posts on Twitter, LinkedIn, Facebook, and more
- **Table of Contents**: Auto-generated navigation for long posts
- **RSS Feed**: Automatic RSS generation for subscribers
- **Analytics**: Track page views and engagement metrics

### 🔧 Technical Excellence
- **Next.js 14.2.32**: App Router with static generation and SSR
- **TypeScript**: Full type safety with strict configuration
- **TailwindCSS**: Utility-first styling with custom terminal theme
- **GraphQL**: Efficient data fetching with proper error handling
- **Testing**: Comprehensive Jest and React Testing Library setup
- **Performance**: 87.2kB shared JS bundle, fully optimized

## 🚀 Quick Start

### Prerequisites
```bash
Node.js ≥ 18.0.0
npm ≥ 8.0.0
```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nischalneupanee/nischal-portfolio.git
   cd nischal-portfolio/portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Development Server**
   ```bash
   npm run dev
   # Opens http://localhost:3000
   ```

## 🔧 Environment Configuration

Create a `.env.local` file with the following variables:

```env
# Hashnode Configuration (Required for blog functionality)
HASHNODE_PUBLICATION_HOST=your-blog.hashnode.dev
NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST=your-blog.hashnode.dev

# Optional
HASHNODE_GRAPHQL_ENDPOINT=https://gql.hashnode.com
REVALIDATE_SECRET=your-webhook-secret-key
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── blog/              # Blog pages and routing
│   │   ├── api/               # API routes (revalidation, webhooks)
│   │   └── (pages)/           # Other portfolio pages
│   ├── components/            # Reusable UI components
│   │   └── blog/              # 16 modular blog components
│   ├── lib/                   # Utility libraries
│   │   ├── hashnode.ts        # GraphQL client and queries
│   │   ├── types.ts           # TypeScript definitions
│   │   └── utils.ts           # Helper functions
│   └── hooks/                 # Custom React hooks
├── public/                    # Static assets
├── __tests__/                 # Test suites
└── docs/                      # Documentation
```

## 🧪 Comprehensive Testing Suite

Enterprise-level testing coverage ensuring production reliability and maintainability.

### Test Coverage Overview

- **Total Test Suites**: 11 comprehensive test files
- **Total Test Cases**: 112+ individual tests
- **Components Tested**: 100% coverage of critical components
- **API Routes Tested**: 100% coverage with error scenarios
- **Accessibility**: WCAG compliance testing included

### Test Categories

#### 🎯 **Component Testing**
```bash
# Core components (100% coverage)
src/components/__tests__/
├── Navbar.test.tsx        # Navigation, mobile menu, social links
├── Footer.test.tsx        # Copyright, social links, navigation
└── ParticleBackground.test.tsx  # Script loading, error handling
```

#### 📄 **Page Testing**
```bash
# All page components tested
src/app/__tests__/
├── page.test.tsx          # Home page hero, terminal display
├── about/__tests__/       # Education timeline, events
├── contact/__tests__/     # Contact forms, email functionality
└── skills-projects/__tests__/  # Skills display, project filtering
```

#### 🔌 **API Testing**
```bash
# Complete API route coverage
src/app/api/__tests__/
└── revalidate.test.ts     # Path/tag revalidation, security
```

#### 📚 **Blog System Testing**
```bash
# Blog components (19/19 passing)
src/components/blog/__tests__/
├── PostCard.test.tsx      # Blog post preview cards
└── LoadingSpinner.test.tsx  # Loading states and animations
```

#### 🛠️ **Utility Testing**
```bash
# Library and utility functions
src/lib/__tests__/
└── hashnode.test.ts       # GraphQL queries, error handling
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run specific test file
npm test -- --testPathPattern=Navbar

# Run tests in verbose mode
npm test -- --verbose
```

### Testing Features

#### ✅ **User Interaction Testing**
- Form submissions and validation
- Button clicks and navigation
- Email copying functionality
- Mobile responsive behavior
- Social media sharing

#### ✅ **Accessibility Testing**
- ARIA labels and roles verification
- Screen reader compatibility
- Keyboard navigation support
- Focus management testing
- Form accessibility compliance

#### ✅ **Error Handling Testing**
- API failure scenarios
- Network error simulation
- Invalid data handling
- Graceful degradation
- Loading state management

#### ✅ **Performance Testing**
- Component rendering efficiency
- Memory leak prevention
- Proper cleanup on unmount
- Optimized re-rendering

### Mock Strategies

```typescript
// Sophisticated mocking for production reliability
jest.mock('framer-motion')     // Animation library
jest.mock('next/image')        // Next.js optimization
jest.mock('lucide-react')      // Icon components
jest.mock('navigator.clipboard') // Browser APIs
```

**Test Coverage**: 112+ tests with comprehensive component, API, and integration testing.

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**
   ```bash
   npm i -g vercel
   vercel --prod
   ```

2. **Environment Variables**
   - Add all required environment variables in Vercel dashboard
   - Ensure `NEXT_PUBLIC_*` variables are properly configured

### Build Commands

```bash
# Production build
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

## 📊 Performance Metrics

- **Build Size**: 87.2kB shared JavaScript bundle
- **Lighthouse Score**: 100/100 Performance
- **Load Time**: <2s initial page load
- **SEO**: Optimized with sitemap and meta tags

## 🛠️ Tech Stack

| Category | Technology | Version |
|----------|------------|---------|
| **Framework** | Next.js | 14.2.32 |
| **Language** | TypeScript | 5.0+ |
| **Styling** | Tailwind CSS | 3.4.1 |
| **Animations** | Framer Motion | 12.23.12 |
| **Data Fetching** | GraphQL | 16.11.0 |
| **Testing** | Jest + RTL | Latest |
| **Deployment** | Vercel | - |

## 🔧 Key Components

### Blog System
- **PostCard**: Reusable blog post preview component
- **SearchAndFilter**: Advanced search with real-time filtering
- **ReadingProgress**: Visual reading progress indicator
- **SocialShare**: Multi-platform sharing functionality
- **TableOfContents**: Auto-generated navigation

### Core Components
- **Navbar**: Responsive navigation with mobile menu
- **Footer**: Contact information and social links
- **ParticleBackground**: Interactive particle system
- **LoadingSpinner**: Elegant loading states

## 📈 Features Roadmap

- [x] Complete blog system with Hashnode integration
- [x] Advanced search and filtering
- [x] Social sharing and analytics
- [x] RSS feed and sitemap generation
- [x] Comprehensive testing suite
- [ ] Newsletter integration
- [ ] Dark/Light mode toggle
- [ ] Blog series support (API pending)
- [ ] Comment system integration
- [ ] Progressive Web App features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the [MIT License](LICENSE).

## 👤 Author

**Nischal Neupane**
- Portfolio: [nischalneupane.name.np](https://www.nischalneupane.name.np)
- GitHub: [@nischalneupanee](https://github.com/nischalneupanee)
- Email: nischalneupanee@gmail.com

## 🙏 Acknowledgments

- [Hashnode](https://hashnode.com) for the excellent headless CMS API
- [Vercel](https://vercel.com) for seamless deployment platform
- [Terminal CSS](https://terminal.css/) for the terminal-inspired design system

---

<div align="center">

**⭐ Star this repository if it helped you build something awesome!**

[![GitHub Stars](https://img.shields.io/github/stars/nischalneupanee/nischal-portfolio?style=social)](https://github.com/nischalneupanee/nischal-portfolio/stargazers)

</div>