#!/bin/bash

# 🚀 Netlify Deployment Script for Portfolio
# This script automates the build and deployment process to Netlify

set -e  # Exit on any error

echo "🚀 Starting Netlify deployment process..."
echo "================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Step 1: Check if Netlify CLI is available
print_status "Checking Netlify CLI availability..."
if ! npx netlify --version &> /dev/null; then
    print_error "Netlify CLI not available. Please ensure it's installed."
    print_status "Installing Netlify CLI as dev dependency..."
    npm install --save-dev netlify-cli
    if [ $? -ne 0 ]; then
        print_error "Failed to install Netlify CLI"
        exit 1
    fi
fi
print_success "Netlify CLI is available"

# Step 2: Check if user is logged in to Netlify
print_status "Checking Netlify authentication..."
if ! npx netlify status &> /dev/null; then
    print_warning "Not logged in to Netlify. Please login first..."
    print_status "Opening Netlify login..."
    npx netlify login
    if [ $? -ne 0 ]; then
        print_error "Failed to login to Netlify"
        exit 1
    fi
fi
print_success "Netlify authentication verified"

# Step 3: Clean previous builds
print_status "Cleaning previous build artifacts..."
if [ -d "dist" ]; then
    rm -rf dist
    print_success "Previous dist folder removed"
fi

# Step 4: Install dependencies
print_status "Installing dependencies..."
npm install
if [ $? -eq 0 ]; then
    print_success "Dependencies installed successfully"
else
    print_error "Failed to install dependencies"
    exit 1
fi

# Step 5: Build the project
print_status "Building the project..."
npm run build
if [ $? -eq 0 ]; then
    print_success "Project built successfully"
else
    print_error "Build failed"
    exit 1
fi

# Step 6: Verify build output
print_status "Verifying build output..."
if [ -d "dist" ] && [ "$(ls -A dist)" ]; then
    print_success "Build output verified - dist folder contains files"
    print_status "Build contents:"
    ls -la dist/
else
    print_error "Build output is empty or dist folder doesn't exist"
    exit 1
fi

# Step 7: Deploy to Netlify
print_status "Deploying to Netlify..."
if [ "$1" = "production" ] || [ "$1" = "prod" ]; then
    print_status "Deploying to PRODUCTION..."
    npx netlify deploy --prod --dir=dist
    deployment_type="PRODUCTION"
else
    print_status "Deploying to PREVIEW (use 'production' argument for prod deployment)..."
    npx netlify deploy --dir=dist
    deployment_type="PREVIEW"
fi

if [ $? -eq 0 ]; then
    print_success "🎉 Deployment successful!"
    echo "================================================"
    print_success "✅ ${deployment_type} deployment completed"
    print_success "🌐 Your site is now live on Netlify"
    echo ""
    if [ "$deployment_type" = "PRODUCTION" ]; then
        print_success "🔗 Production URL: Check your Netlify dashboard"
    else
        print_success "🔗 Preview URL: Check the output above for the preview link"
        print_status "💡 To deploy to production, run: npm run deploy:prod"
    fi
    echo "================================================"
else
    print_error "Deployment failed"
    exit 1
fi

# Step 8: Optional - Open the site
if [ "$2" = "open" ]; then
    print_status "Opening deployed site..."
    npx netlify open:site
fi

print_success "🚀 Deployment script completed successfully!"
echo ""
print_status "Available commands:"
echo "  npm run deploy          - Deploy to preview"
echo "  npm run deploy:prod     - Deploy to production" 
echo "  npm run deploy:open     - Deploy and open site"
echo ""
print_status "For more options, check: https://cli.netlify.com/"
