'use client';

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

interface ExecutiveModalProps {
  executive: Executive;
  isVisible: boolean;
  position: { top: number; left: number };
}

export default function ExecutiveModal({ executive, isVisible, position }: ExecutiveModalProps) {
  return (
    <div
      className={`fixed bg-darkBlue-800 bg-opacity-95 backdrop-blur-sm rounded-xl border-2 border-gold border-opacity-50 shadow-2xl p-6 z-50 transition-all duration-300 max-w-xs ${
        isVisible ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      }`}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        transform: 'translateY(-50%)',
      }}
    >
        
      <div className="mb-5 pb-4 border-b border-gold border-opacity-30">
        <h3 className="text-xl font-bold text-gold mb-1">{executive.role}</h3>
        <p className="text-white font-semibold">{executive.name}</p>
        <p className="text-gray-300 text-sm">{executive.major}</p>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-gold font-semibold text-xs uppercase tracking-widest mb-1">
            Favorite Color
          </p>
          <p className="text-gray-200 text-sm">{executive.favoriteColor}</p>
        </div>

        <div>
          <p className="text-gold font-semibold text-xs uppercase tracking-widest mb-1">
            Favorite Food
          </p>
          <p className="text-gray-200 text-sm">{executive.favoriteFood}</p>
        </div>

        <div>
          <p className="text-gold font-semibold text-xs uppercase tracking-widest mb-1">
            What is on your bucket list?
          </p>
          <p className="text-gray-200 text-xs leading-relaxed">
            {executive.bucketListAnswer?.trim() || "They haven't shared one yet."}
          </p>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-gold border-opacity-30 rounded-tr-xl"></div>
    </div>
  );
}
