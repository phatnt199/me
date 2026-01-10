import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '../public');
const avatarPath = join(publicDir, 'images/profile-1.png');

const icons = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'pwa-64x64.png', size: 64 },
  { name: 'pwa-192x192.png', size: 192 },
  { name: 'pwa-512x512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'maskable-icon-192x192.png', size: 192 },
  { name: 'maskable-icon-512x512.png', size: 512 },
];

async function generateIcons() {
  console.log('Generating PWA icons from avatar...\n');
  console.log(`Source: ${avatarPath}\n`);

  // Get image metadata to find the center for cropping
  const metadata = await sharp(avatarPath).metadata();
  const size = Math.min(metadata.width, metadata.height);

  for (const icon of icons) {
    await sharp(avatarPath)
      .resize(icon.size, icon.size, {
        fit: 'cover',
        position: 'top' // Focus on face area
      })
      .png()
      .toFile(join(publicDir, icon.name));
    console.log(`  Created: ${icon.name} (${icon.size}x${icon.size})`);
  }

  // Generate favicon.ico
  await sharp(avatarPath)
    .resize(32, 32, { fit: 'cover', position: 'top' })
    .png()
    .toFile(join(publicDir, 'favicon.ico'));
  console.log(`  Created: favicon.ico (32x32)`);

  // Generate SVG favicon (embedded image)
  const base64 = await sharp(avatarPath)
    .resize(64, 64, { fit: 'cover', position: 'top' })
    .png()
    .toBuffer()
    .then(buf => buf.toString('base64'));

  const svgFavicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <clipPath id="circle">
      <circle cx="32" cy="32" r="32"/>
    </clipPath>
  </defs>
  <image href="data:image/png;base64,${base64}" width="64" height="64" clip-path="url(#circle)"/>
</svg>`;

  await sharp(Buffer.from(svgFavicon))
    .resize(64, 64)
    .png()
    .toFile(join(publicDir, 'favicon-circle.png'));

  console.log(`\nPWA icons generated successfully from avatar!`);
}

generateIcons().catch(console.error);
