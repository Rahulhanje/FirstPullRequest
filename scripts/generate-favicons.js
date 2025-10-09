import { createCanvas } from 'canvas';
import { writeFileSync } from 'fs';
import { resolve } from 'path';

/**
 * Favicon Generator Script for FirstPullRequest
 * This script generates basic favicon files from a simple design
 */

const generateFavicon = (size, filename) => {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#4f46e5'; // Your brand color
  ctx.fillRect(0, 0, size, size);

  // Border radius effect (simplified)
  ctx.globalCompositeOperation = 'destination-in';
  ctx.beginPath();
  ctx.roundRect(0, 0, size, size, size * 0.1);
  ctx.fill();
  ctx.globalCompositeOperation = 'source-over';

  // Text
  ctx.fillStyle = 'white';
  ctx.font = `bold ${size * 0.4}px monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('FPR', size / 2, size / 2);

  // Save file
  const buffer = canvas.toBuffer('image/png');
  const filepath = resolve(process.cwd(), 'public', filename);
  writeFileSync(filepath, buffer);
  
  console.log(`✅ Generated ${filename} (${size}x${size})`);
};

const generateAllFavicons = () => {
  console.log('🎨 Generating favicon files for FirstPullRequest...');
  
  try {
    // Generate different sizes
    generateFavicon(16, 'favicon-16x16.png');
    generateFavicon(32, 'favicon-32x32.png');
    generateFavicon(192, 'android-chrome-192x192.png');
    generateFavicon(512, 'android-chrome-512x512.png');
    
    console.log('🎉 All favicon files generated successfully!');
    console.log('\n📋 Files created:');
    console.log('  - favicon-16x16.png');
    console.log('  - favicon-32x32.png'); 
    console.log('  - android-chrome-192x192.png');
    console.log('  - android-chrome-512x512.png');
    console.log('\n🔗 Don\'t forget to create:');
    console.log('  - favicon.ico (use online converter)');
    console.log('  - safari-pinned-tab.svg (SVG monochrome version)');
    
  } catch (error) {
    console.error('❌ Error generating favicons:', error);
    console.log('\n💡 Alternative: Use online favicon generators:');
    console.log('  - https://favicon.io/favicon-generator/');
    console.log('  - https://realfavicongenerator.net/');
  }
};

// Note: This requires canvas package
// Install with: npm install canvas
// Or use online generators as mentioned above

export { generateAllFavicons };

if (import.meta.url === `file://${process.argv[1]}`) {
  generateAllFavicons();
}