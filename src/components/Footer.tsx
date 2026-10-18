import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/home" },
  { label: "About", href: "/about" },
  { label: "Executive Board", href: "/executive-board" },
  { label: "Member Points", href: "/member-points" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    handle: "@bthsnhs",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="3" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:thebthsnationalhonorsociety@gmail.com",
    handle: "thebthsnationalhonorsociety@gmail.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-600/50 to-transparent"></div>

      <div className="absolute top-0 left-0 w-96 h-80 -translate-x-1/3 -translate-y-1/4 rounded-full bg-gradient-radial from-blue-500/15 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-80 translate-x-1/4 translate-y-1/4 rounded-full bg-gradient-radial from-yellow-600/10 to-transparent pointer-events-none"></div>

      <div className="relative z-10 mx-auto max-w-5xl px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 md:pb-8">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-yellow-600/80 mb-2">
              Brooklyn Technical High School
            </p>
            <h2 className="text-4xl font-bold text-white mb-3 leading-tight">
              National Honor Society
            </h2>
            <p className="text-sm font-light text-gray-300 leading-relaxed max-w-xs">
              National Honor Society celebrating academic excellence, leadership, character, and community service.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 text-xs text-gray-400 tracking-wide">
                29 Fort Greene Place Brooklyn, NY 11217
              </div>
            </div>
          </div>

          {/* Navigation Section */}
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-yellow-600/90 mb-6">
              Explore
            </p>
            <ul className="flex flex-col gap-2 space-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-gray-300 hover:text-yellow-600 transition-colors duration-300 relative group inline-block"
                  >
                    {link.label}
                    <span className="absolute bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-600/60 to-blue-500/40 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social Section */}
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-yellow-600/90 mb-6">
              Connect
            </p>

            <ul className="flex flex-col gap-3">
              {socialLinks.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="flex items-center gap-3 text-decoration-none group transition-all duration-300"
                  >
                    <span className="w-9 h-9 rounded-lg border border-yellow-600/30 bg-yellow-600/8 flex items-center justify-center text-yellow-600/80 group-hover:border-yellow-600/60 group-hover:bg-yellow-600/15 group-hover:text-yellow-600 group-hover:shadow-lg group-hover:shadow-yellow-600/25 group-hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0">
                      {s.icon}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500 group-hover:text-yellow-600/95 transition-colors duration-300">
                        {s.label}
                      </span>
                      <span className="text-xs font-semibold text-gray-400 group-hover:text-yellow-600/95 transition-colors duration-300">
                        {s.handle}
                      </span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-yellow-600/20 to-transparent"></div>

        <div className="relative z-10 max-w-5xl mx-auto py-4 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 text-center sm:text-left">
          <span className="text-xs text-gray-500 tracking-wider">
            © {new Date().getFullYear()} BTHS National Honor Society. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
