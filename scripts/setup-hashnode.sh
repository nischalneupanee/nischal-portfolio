#!/bin/bash

# Hashnode Headless Blog Deployment Script
# This script helps set up the optimal Hashnode integration

set -e

echo "🚀 Hashnode Headless Blog Integration Setup"
echo "==========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Check if required files exist
check_files() {
    echo "📁 Checking required files..."
    
    required_files=(
        "src/lib/hashnode.ts"
        "src/app/api/webhook/hashnode/route.ts"
        "src/app/api/revalidate/route.ts"
        ".env.example"
    )
    
    for file in "${required_files[@]}"; do
        if [ -f "$file" ]; then
            print_status "$file exists"
        else
            print_error "$file is missing"
            exit 1
        fi
    done
}

# Check environment variables
check_env() {
    echo ""
    echo "🔧 Checking environment configuration..."
    
    if [ ! -f ".env.local" ]; then
        print_warning ".env.local not found. Creating from .env.example..."
        cp .env.example .env.local
        print_warning "Please edit .env.local with your actual values"
    else
        print_status ".env.local exists"
    fi
    
    # Check if required variables are set
    if [ -f ".env.local" ]; then
        source .env.local
        
        if [ -z "$NEXT_PUBLIC_HASHNODE_PUBLICATION" ]; then
            print_warning "NEXT_PUBLIC_HASHNODE_PUBLICATION not set in .env.local"
        else
            print_status "NEXT_PUBLIC_HASHNODE_PUBLICATION is set"
        fi
        
        if [ -z "$NEXT_PUBLIC_SITE_URL" ]; then
            print_warning "NEXT_PUBLIC_SITE_URL not set in .env.local"
        else
            print_status "NEXT_PUBLIC_SITE_URL is set"
        fi
    fi
}

# Check dependencies
check_dependencies() {
    echo ""
    echo "📦 Checking dependencies..."
    
    # Check if package.json has required dependencies
    if command -v node &> /dev/null; then
        print_status "Node.js is installed"
    else
        print_error "Node.js is not installed"
        exit 1
    fi
    
    if [ -f "package.json" ]; then
        if grep -q "graphql-request" package.json; then
            print_status "graphql-request dependency found"
        else
            print_warning "graphql-request dependency missing"
            echo "Installing graphql-request..."
            npm install graphql-request graphql
        fi
        
        if grep -q "next" package.json; then
            print_status "Next.js dependency found"
        else
            print_error "Next.js dependency missing"
            exit 1
        fi
    fi
}

# Generate secrets
generate_secrets() {
    echo ""
    echo "🔐 Generating secrets..."
    
    if command -v openssl &> /dev/null; then
        webhook_secret=$(openssl rand -hex 32)
        revalidate_secret=$(openssl rand -hex 32)
        
        echo ""
        echo "Generated secrets (add these to your .env.local):"
        echo "HASHNODE_WEBHOOK_SECRET=$webhook_secret"
        echo "REVALIDATE_SECRET=$revalidate_secret"
        print_status "Secrets generated successfully"
    else
        print_warning "OpenSSL not found. Please generate secrets manually:"
        echo "You can use online tools or run: node -e \"console.log(require('crypto').randomBytes(32).toString('hex'))\""
    fi
}

# Test API endpoints
test_endpoints() {
    echo ""
    echo "🧪 Testing API endpoints..."
    
    if command -v curl &> /dev/null; then
        # Test health endpoints
        echo "Testing revalidate endpoint health..."
        if curl -s http://localhost:3000/api/revalidate > /dev/null 2>&1; then
            print_status "Revalidate endpoint is accessible"
        else
            print_warning "Revalidate endpoint test failed (server may not be running)"
        fi
        
        echo "Testing webhook endpoint health..."
        if curl -s http://localhost:3000/api/webhook/hashnode > /dev/null 2>&1; then
            print_status "Webhook endpoint is accessible"
        else
            print_warning "Webhook endpoint test failed (server may not be running)"
        fi
    else
        print_warning "curl not found. Cannot test endpoints"
    fi
}

# Build and validate
build_project() {
    echo ""
    echo "🏗️ Building project..."
    
    if npm run build; then
        print_status "Project built successfully"
    else
        print_error "Build failed"
        exit 1
    fi
}

# Deployment checklist
deployment_checklist() {
    echo ""
    echo "📋 Deployment Checklist"
    echo "======================="
    echo ""
    echo "1. ✅ Environment Variables:"
    echo "   - NEXT_PUBLIC_HASHNODE_PUBLICATION"
    echo "   - NEXT_PUBLIC_SITE_URL"
    echo "   - HASHNODE_WEBHOOK_SECRET"
    echo "   - REVALIDATE_SECRET"
    echo "   - HASHNODE_PAT (optional but recommended)"
    echo ""
    echo "2. ✅ Hashnode Webhook Configuration:"
    echo "   - URL: https://your-domain.com/api/webhook/hashnode"
    echo "   - Events: POST_PUBLISHED, POST_UPDATED, POST_DELETED"
    echo "   - Secret: Use HASHNODE_WEBHOOK_SECRET value"
    echo ""
    echo "3. ✅ Vercel/Deployment Configuration:"
    echo "   - Add all environment variables to your hosting platform"
    echo "   - Ensure webhook endpoint is accessible"
    echo "   - Configure custom domain if needed"
    echo ""
    echo "4. ✅ Testing:"
    echo "   - Test webhook endpoint manually"
    echo "   - Verify revalidation works"
    echo "   - Check blog posts load correctly"
    echo "   - Validate sitemap and RSS feeds"
    echo ""
    echo "5. ✅ Monitoring:"
    echo "   - Set up error tracking"
    echo "   - Monitor webhook events"
    echo "   - Track cache performance"
}

# Main execution
main() {
    echo "Starting Hashnode integration setup..."
    echo ""
    
    check_files
    check_dependencies
    check_env
    generate_secrets
    
    echo ""
    echo "🎯 Setup completed!"
    echo ""
    echo "Next steps:"
    echo "1. Update .env.local with your actual values"
    echo "2. Run 'npm run dev' to start development server"
    echo "3. Test the integration locally"
    echo "4. Deploy to your hosting platform"
    echo "5. Configure Hashnode webhooks"
    echo ""
    
    deployment_checklist
    
    echo ""
    echo "📚 For detailed instructions, see HASHNODE_INTEGRATION.md"
}

# Show help
show_help() {
    echo "Hashnode Headless Blog Setup Script"
    echo ""
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  -h, --help     Show this help message"
    echo "  -t, --test     Test endpoints only"
    echo "  -b, --build    Build project only"
    echo "  -c, --check    Check configuration only"
    echo ""
    echo "Examples:"
    echo "  $0              # Full setup"
    echo "  $0 --test       # Test endpoints"
    echo "  $0 --build      # Build project"
}

# Parse command line arguments
case "${1:-}" in
    -h|--help)
        show_help
        exit 0
        ;;
    -t|--test)
        test_endpoints
        exit 0
        ;;
    -b|--build)
        build_project
        exit 0
        ;;
    -c|--check)
        check_files
        check_dependencies
        check_env
        exit 0
        ;;
    "")
        main
        ;;
    *)
        echo "Unknown option: $1"
        show_help
        exit 1
        ;;
esac
