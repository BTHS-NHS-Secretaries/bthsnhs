import ExecutiveSection from './ExecutiveSection';
import fs from 'fs';
import path from 'path';

interface Executive {
  id: string;
  role: string;
  name: string;
  major: string;
  image: string;
  favoriteColor: string;
  favoriteFood: string;
  bucketListAnswer: string;
}

interface ExecutiveSection {
  title: string;
  members: Executive[];
}

const EXEC_PHOTOS_DIR = path.join(process.cwd(), 'public', 'data', 'execphotos');
const EXEC_PHOTOS_URL_BASE = '/data/execphotos';

function buildPhotoMap(): Map<string, string> {
  const map = new Map<string, string>();
  try {
    const files = fs.readdirSync(EXEC_PHOTOS_DIR);
    for (const file of files) {
      const base = path.basename(file, path.extname(file)).toLowerCase();
      // First match wins so unexpected duplicate-name photos don't clobber each other.
      if (!map.has(base)) {
        map.set(base, file);
      }
    }
  } catch (error) {
    console.error('Error reading executive photos directory:', error);
  }
  return map;
}

// Photos get uploaded with inconsistent extensions/casing (.jpg, .JPG, .png, .jpeg),
// so we match by name alone and let the filesystem tell us the real extension.
function resolveImage(id: string, photoMap: Map<string, string>): string {
  const file = photoMap.get(id.toLowerCase());
  return file ? `${EXEC_PHOTOS_URL_BASE}/${file}` : `${EXEC_PHOTOS_URL_BASE}/${id}.jpg`;
}

async function getExecutiveData(): Promise<ExecutiveSection[]> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'executives.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    const parsed = JSON.parse(data);
    const photoMap = buildPhotoMap();
    const sections: ExecutiveSection[] = parsed.sections;
    return sections.map((section) => ({
      ...section,
      members: section.members.map((member) => ({
        ...member,
        image: resolveImage(member.id, photoMap),
      })),
    }));
  } catch (error) {
    console.error('Error loading executives:', error);
    return [];
  }
}

export default async function ExecutiveBoard() {
  const executiveData = await getExecutiveData();

  return (
    <div className="bg-darkBlue-900 text-white">
      <section className="max-w-8xl mx-auto px-4 pt-32">
        <h1 className="text-6xl font-bold mb-4 text-center opacity-0 animate-fadeInUp">
          <span className="text-gold">2026-2027</span> Executive Board
        </h1>
        <div
          className="w-24 h-2 bg-gold mx-auto rounded-full mb-8 opacity-0 animate-fadeInUp shadow-[0_0_24px_rgba(218,165,32,0.65)]"
          style={{ animationDelay: '150ms' }}
        ></div>
        <p
          className="text-2xl text-center max-w-4xl mx-auto text-gray-100 mb-8 opacity-0 animate-fadeInUp"
          style={{ animationDelay: '280ms' }}
        >
          Meet the dedicated executives who lead BTHS NHS and work to improve our community.
        </p>
      </section>

      <section className="max-w-9xl mx-auto px-4 py-4">
        {executiveData.map((section, index) => (
          <ExecutiveSection
            key={section.title}
            title={section.title}
            members={section.members}
            prioritizeImages={index === 0}
          />
        ))}
      </section>

      <div className="pb-12" />
    </div>
  );
}
