'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface MemberData {
  'Full Name': string;
  'First Name': string;
  'Last Name': string;
  Committee: string;
  Email: string;
  'Graduating Class': string;
  Prefect: string;
  'Total General Points': number;
  'Total Committee Points': number;
  [key: string]: any;
}

export default function MemberPointsDashboard() {
  const router = useRouter();
  const [generalData, setGeneralData] = useState<MemberData | null>(null);
  const [committeeData, setCommitteeData] = useState<MemberData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMemberData = async () => {
      try {
        const email = localStorage.getItem('userEmail');

        if (!email) {
          router.push('/login');
          return;
        }

        const generalRes = await fetch('/api/member/general', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });

        if (!generalRes.ok) {
          throw new Error('Failed to fetch general data');
        }

        const generalResult = await generalRes.json();

        const committeeRes = await fetch('/api/member/committee', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });

        if (!committeeRes.ok) {
          throw new Error('Failed to fetch committee data');
        }

        const committeeResult = await committeeRes.json();

        setGeneralData(generalResult.data);
        setCommitteeData(committeeResult.data);
        setLoading(false);
      } catch (err) {
        console.error('Error loading member data:', err);
        setError('Failed to load member data');
        setLoading(false);
      }
    };

    if (typeof window !== 'undefined') {
      loadMemberData();
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="relative bg-darkBlue-900 text-white min-h-screen overflow-hidden">
        <div className="absolute top-[-8%] right-[-8%] w-[32rem] h-[32rem] rounded-full bg-gold/[0.07] blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-8%] w-[32rem] h-[32rem] rounded-full bg-blue-500/[0.07] blur-[120px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 pt-32 pb-16">
          <div className="text-center">
            <div className="inline-block w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-xl text-gray-400">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !generalData) {
    return (
      <div className="relative bg-darkBlue-900 text-white min-h-screen overflow-hidden">
        <div className="absolute top-[-8%] right-[-8%] w-[32rem] h-[32rem] rounded-full bg-gold/[0.07] blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-8%] w-[32rem] h-[32rem] rounded-full bg-blue-500/[0.07] blur-[120px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 pt-32 pb-16">
          <div className="text-center">
            <p className="text-xl text-red-400">{error || 'Failed to load user data'}</p>
            <button
              onClick={() => router.push('/login')}
              className="mt-4 px-6 py-3 bg-gold text-darkBlue-900 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-200"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  const excludeKeys = [
    'Full Name',
    'First Name',
    'Last Name',
    'Committee',
    'Email',
    'Graduating Class',
    'Prefect',
    'Total General Points',
    'id',
    'created_at',
  ];

  const generalEvents = Object.entries(generalData)
    .filter(([key]) => !excludeKeys.includes(key))
    .reduce((acc, [key, value]) => {
      acc[key] = parseInt(String(value)) || 0;
      return acc;
    }, {} as { [key: string]: number });

  const committeeExcludeKeys = [
    'Full Name',
    'First Name',
    'Last Name',
    'Committee',
    'Email',
    'Graduating Class',
    'Prefect',
    'Total Committee Points',
    'id',
    'created_at',
  ];

  const committeeEvents = committeeData
    ? Object.entries(committeeData)
        .filter(([key]) => !committeeExcludeKeys.includes(key))
        .reduce((acc, [key, value]) => {
          acc[key] = parseInt(String(value)) || 0;
          return acc;
        }, {} as { [key: string]: number })
    : {};

  const renderEventsTable = (events: { [key: string]: number }, emptyLabel: string, accentText: string) => {
    if (Object.keys(events).length === 0) {
      return (
        <div className="rounded-xl border border-dashed border-gold/25 py-10 text-center">
          <p className="text-gray-500">{emptyLabel}</p>
        </div>
      );
    }

    return (
      <div className="overflow-x-auto rounded-xl border border-gold/40 shadow-lg">
        <table className="w-full">
          <thead>
            <tr className="bg-gold/10 border-b border-gold/40">
              <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider text-gray-300">
                Event Name
              </th>
              <th className="px-6 py-4 text-right font-semibold text-sm uppercase tracking-wider text-gray-300">
                Points
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(events).map(([event, points], idx) => (
              <tr
                key={event}
                className={`border-b border-gold/10 last:border-b-0 hover:bg-gold/5 transition-colors duration-150 ${
                  idx % 2 === 1 ? 'bg-white/[0.02]' : ''
                }`}
              >
                <td className="px-6 py-4 text-gray-200">{event}</td>
                <td className={`px-6 py-4 text-right font-bold ${accentText}`}>{points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="relative bg-darkBlue-900 text-white min-h-screen overflow-hidden">
      <div className="absolute top-[-8%] right-[-8%] w-[32rem] h-[32rem] rounded-full bg-gold/[0.07] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[32rem] h-[32rem] rounded-full bg-blue-500/[0.06] blur-[120px] pointer-events-none" />
      <div className="absolute top-[45%] right-[-10%] w-[26rem] h-[26rem] rounded-full bg-teal-500/[0.05] blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 pt-32 pb-16">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-12 opacity-0 animate-fadeInUp">
          <div className="flex-1">
            <h1 className="text-6xl font-bold mb-4">
              Welcome, <span className="text-gold">{generalData['First Name']}</span>
            </h1>
            <p className="text-lg text-gray-300">
              <strong>Note:</strong> Events may be added before points are inputted. Please allow a week for your
              points to update. Thank you!
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-red-600/15 hover:bg-red-600 border border-red-500/50 hover:border-red-600 text-red-300 hover:text-white rounded-lg font-semibold transition-all duration-200 whitespace-nowrap"
          >
            Logout
          </button>
        </div>

        <div
          className="relative bg-gradient-to-br from-darkBlue-800/90 to-darkBlue-950/90 backdrop-blur-sm rounded-2xl border border-gold/30 p-8 mb-12 shadow-2xl opacity-0 animate-fadeInUp"
          style={{ animationDelay: '100ms' }}
        >
          <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-gold/40 rounded-tr-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-gold/40 rounded-bl-2xl pointer-events-none" />

          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-sm">
              <span className="text-gray-400">Committee</span>
              <span className="text-gold font-semibold">{generalData.Committee}</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-darkBlue-900/60 rounded-xl p-6 border border-gold/25 hover:border-gold/40 transition-colors duration-300">
              <p className="text-sm uppercase tracking-wider text-gray-400 mb-2">Total General Points</p>
              <p className="text-5xl font-bold text-gold">{generalData['Total General Points'] || 0}</p>
            </div>
            <div className="bg-darkBlue-900/60 rounded-xl p-6 border border-blue-400/25 hover:border-blue-400/40 transition-colors duration-300">
              <p className="text-sm uppercase tracking-wider text-gray-400 mb-2">Total Committee Points</p>
              <p className="text-5xl font-bold text-blue-400">{committeeData?.['Total Committee Points'] || 0}</p>
            </div>
          </div>
        </div>

        <div className="mb-12 opacity-0 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
          <h2 className="text-4xl font-bold mb-6 text-center text-gold">General Events</h2>
          {renderEventsTable(generalEvents, 'No general events found', 'text-gold')}
        </div>

        <div className="mb-12 opacity-0 animate-fadeInUp" style={{ animationDelay: '300ms' }}>
          <h2 className="text-4xl font-bold mb-6 text-center text-blue-400">Committee Events</h2>
          {renderEventsTable(committeeEvents, 'No committee events found', 'text-blue-400')}
        </div>

        <div className="text-center">
          <Link href="/" className="text-gold hover:text-yellow-400 transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
