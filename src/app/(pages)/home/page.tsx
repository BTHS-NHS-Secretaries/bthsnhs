import fs from 'fs';
import path from 'path';
import HomeContent from './HomeContent';

const IMAGES_DIR = path.join(process.cwd(), 'public', 'data', 'images');

// Auto-discovers whatever images live in public/data/images/{subdir} — no filenames
// are ever hardcoded, so dropping/removing photos there just works.
function listImages(subdir: string): string[] {
  try {
    const files = fs.readdirSync(path.join(IMAGES_DIR, subdir));
    return files
      .filter((file) => /\.(jpe?g|png|webp)$/i.test(file))
      .sort()
      .map((file) => `/data/images/${subdir}/${file}`);
  } catch (error) {
    console.error(`Error reading images directory "${subdir}":`, error);
    return [];
  }
}

export default function Home() {
  const carouselImages = listImages('cara');
  const galleryImages = listImages('misc');
  return <HomeContent carouselImages={carouselImages} galleryImages={galleryImages} />;
}
