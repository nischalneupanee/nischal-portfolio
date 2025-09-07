# Nischal Neupane Portfolio v1.0.0 

Personal Portfolio website for showcasing my projects, skills and blogs.

![Portfolio Preview](./public/Website%20Profile.png)

## 📋 Version Information

- **Version**: 1.0.0
- **Release Date**: September 7, 2025
- **Status**: Production Ready ✅
- **Live Demo**: [nischalneupane.name.np](https://www.nischalneupane.name.np)

## ✨ Features

- **Futuristic Design**: TerminalCSS-inspired theme with particle background effects
- **Fully Responsive**: Mobile-first design that works on all devices
- **Interactive Animations**: Smooth transitions using Framer Motion
- **Multi-page Structure**: Home, About, Skills & Projects, Blog, Contact
- **Blog Integration**: Ready for Hashnode integration via GraphQL API
- **SEO Optimized**: Comprehensive meta tags and Open Graph support
- **Performance Focused**: Optimized images, lazy loading, and code splitting
- **Accessibility**: Semantic HTML and ARIA-compliant components

## 🛠 Tech Stack

### Frontend
- **Next.js 14.2.5** - React framework with App Router
- **TypeScript** - Type-safe development
- **TailwindCSS** - Utility-first CSS framework
- **Terminal.css** - Terminal-inspired design system
- **Framer Motion** - Animation library
- **Particles.js** - Interactive particle background
- **Lucide React** - Beautiful icons

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

### Deployment Ready
- **Vercel** - Optimized for Vercel deployment
- **GitHub Actions** - CI/CD pipeline ready

## 🚀 Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nischalneupanee/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## � Deployment

### Quick Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "feat: initial portfolio v1.0.0"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure your custom domain
   - Deploy automatically

### Manual GitHub Setup

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit with version tag
git commit -m "feat: nischal-portfolio v1.0.0 - initial release"

# Add GitHub remote
git remote add origin https://github.com/nischalneupanee/portfolio.git

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
│   │   ├── blog/          # Blog page
│   │   ├── contact/       # Contact page
│   │   ├── skills-projects/ # Skills & Projects page
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx       # Home page
│   │   └── globals.css    # Global styles
│   ├── components/        # Reusable components
│   │   ├── Navbar.tsx     # Navigation component
│   │   ├── Footer.tsx     # Footer component
│   │   └── ParticleBackground.tsx # Particle effects
│   └── lib/               # Utility functions
│       └── hashnode.ts    # Hashnode API integration
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
- Blog: [nischalneupanee.hashnode.dev](https://nischalneupanee.hashnode.dev)

---

**Built using Next.js, TailwindCSS & TypeScript**

*"The future belongs to those who learn more skills and combine them in creative ways."* - Nischal Neupane
