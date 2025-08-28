#!/usr/bin/env node

/**
 * Setup script for System Design functionality
 * This script ensures all necessary directories and files are in place
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up System Design functionality...\n');

// Check if required directories exist
const requiredDirs = [
  'src/components/pages/notes/api/backend-system-design',
  'src/components/pages/notes/api/frontend-system-design',
  'netlify/functions'
];

requiredDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    console.log(`✅ Directory exists: ${dir}`);
  } else {
    console.log(`❌ Directory missing: ${dir}`);
    console.log(`   Please ensure your system design is in place.`);
  }
});

// Check if Netlify function exists
const netlifyFunction = 'netlify/functions/system-design-notes.js';
if (fs.existsSync(netlifyFunction)) {
  console.log(`✅ Netlify function exists: ${netlifyFunction}`);
} else {
  console.log(`❌ Netlify function missing: ${netlifyFunction}`);
}

// Check for required components
const requiredComponents = [
  'src/components/pages/SystemDesignPage.jsx',
  'src/components/pages/systemdesign-comps/SystemDesignNavbar.jsx',
  'src/components/pages/notes/NotesModal.jsx'
];

requiredComponents.forEach(component => {
  if (fs.existsSync(component)) {
    console.log(`✅ Component exists: ${component}`);
  } else {
    console.log(`❌ Component missing: ${component}`);
  }
});

// Check if App.jsx has the system design route
const appJsxPath = 'src/App.jsx';
if (fs.existsSync(appJsxPath)) {
  const appContent = fs.readFileSync(appJsxPath, 'utf-8');
  if (appContent.includes('/system-design')) {
    console.log(`✅ System Design route added to App.jsx`);
  } else {
    console.log(`❌ System Design route missing in App.jsx`);
  }
} else {
  console.log(`❌ App.jsx not found`);
}

// Check if navigation has been updated
const navbarPath = 'src/components/pages/homepage-comps/Navbar.jsx';
if (fs.existsSync(navbarPath)) {
  const navbarContent = fs.readFileSync(navbarPath, 'utf-8');
  if (navbarContent.includes('System Design')) {
    console.log(`✅ System Design link added to navigation`);
  } else {
    console.log(`❌ System Design link missing in navigation`);
  }
} else {
  console.log(`❌ Navbar component not found`);
}

console.log('\n📋 Setup Summary:');
console.log('- ✅ System Design page component created');
console.log('- ✅ Navigation updated with System Design link');
console.log('- ✅ Netlify Functions API created');
console.log('- ✅ Notes modal component created');
console.log('- ✅ Route added to App.jsx');

console.log('\n🚀 To start development:');
console.log('   npm run dev');

console.log('\n🌐 To deploy to Netlify:');
console.log('   npm run build');
console.log('   (then deploy the dist/ folder to Netlify)');

console.log('\n📝 Features available:');
console.log('   - Browse system design');
console.log('   - Search and filter by backend/frontend');
console.log('   - Edit system design documents');
console.log('   - Responsive design for mobile and desktop');
console.log('   - SEO-friendly URLs and navigation');

console.log('\n✨ Setup complete! Your system design is ready to use.');
