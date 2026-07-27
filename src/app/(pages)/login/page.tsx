'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const trimmedUsername = username.trim();
      const trimmedPassword = password.trim();

      if (!trimmedUsername || !trimmedPassword) {
        setError('Please enter both username and password');
        setLoading(false);
        return;
      }

      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: trimmedUsername,
          password: trimmedPassword,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error || 'Login failed');
        setLoading(false);
        return;
      }

      localStorage.setItem('username', result.user.username);
      localStorage.setItem('userId', result.user.id);
      localStorage.setItem('userEmail', result.user.email);

      router.push('/member-points');
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-darkBlue-900 text-white min-h-screen flex flex-col overflow-hidden">
      <div className="absolute top-[-8%] right-[-8%] w-[32rem] h-[32rem] rounded-full bg-gold/[0.07] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-8%] w-[32rem] h-[32rem] rounded-full bg-blue-500/[0.07] blur-[120px] pointer-events-none" />

      <div className="relative flex-1 flex items-center justify-center px-4 py-28">
        <div className="w-full max-w-md opacity-0 animate-fadeInUp">
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-darkBlue-800 border border-gold/40 flex items-center justify-center overflow-hidden shadow-lg">
              <img
                src="/data/images/logo.png"
                alt="BTHS NHS Logo"
                className="w-full h-full object-contain p-2.5"
              />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Member Login</h1>
            <p className="text-gray-400">
              Enter your username and password to access your member points.
            </p>
          </div>

          <div className="relative bg-gradient-to-br from-darkBlue-800/90 to-darkBlue-950/90 backdrop-blur-sm rounded-2xl border border-gold/30 p-8 shadow-2xl mb-6">
            <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-gold/40 rounded-tr-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-gold/40 rounded-bl-2xl pointer-events-none" />

            {error && (
              <div className="bg-red-500/15 border border-red-500/40 rounded-lg p-4 mb-6">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-semibold text-gray-300 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  disabled={loading}
                  autoComplete="username"
                  className="w-full px-4 py-3 rounded-lg bg-darkBlue-900/80 border border-gold/30 text-white placeholder-gray-500 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    disabled={loading}
                    autoComplete="current-password"
                    className="w-full px-4 py-3 pr-12 rounded-lg bg-darkBlue-900/80 border border-gold/30 text-white placeholder-gray-500 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    tabIndex={-1}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gold transition-colors duration-200"
                  >
                    {showPassword ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-10-8-10-8a18.4 18.4 0 0 1 4.22-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 10 8 10 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-gradient-to-r from-gold to-yellow-500 hover:from-yellow-400 hover:to-yellow-600 hover:shadow-[0_0_25px_rgba(218,165,32,0.4)] text-darkBlue-900 font-bold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none transform hover:scale-[1.02] active:scale-95"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </div>

          <div className="bg-darkBlue-800/40 backdrop-blur-sm rounded-lg p-4 border border-gold/20">
            <p className="text-sm text-gray-300 text-center">
              <strong>Need help?</strong> Contact us at{' '}
              <Link href="/contact" className="text-gold hover:text-yellow-400 transition-colors">
                contact page
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
