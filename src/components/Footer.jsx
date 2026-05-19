import { Github, GraduationCap, Instagram, Linkedin } from 'lucide-react';

const links = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/komal-avhad/', icon: Linkedin },
  { label: 'GitHub', href: 'https://github.com/developerkomalavhad', icon: Github },
  { label: 'Instagram', href: 'https://www.instagram.com/codewithkomal/', icon: Instagram },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-midnight/92 px-4 py-6 text-slate-400 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-cyanGlow/15 text-cyanGlow">
            <GraduationCap className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-white">AI-Powered School Dropout Prediction System</h2>
            <p className="mt-1 text-sm">All Rights Reserved by 2026 · Developed by <span className="font-semibold text-white">Komal Avhad</span></p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-slate-300">Connect</span>
          <div className="flex items-center gap-2">
            {links.map((link) => (
              <a
                aria-label={link.label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-slate-300 transition hover:border-cyanGlow/40 hover:bg-cyanGlow/10 hover:text-cyanGlow"
                href={link.href}
                key={link.label}
                rel="noreferrer"
                target="_blank"
                title={link.label}
              >
                <link.icon className="h-5 w-5" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
