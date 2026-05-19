import { Bell, GraduationCap, LogOut, Menu, Search } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext.jsx';
import { cn } from '../utils/classNames.js';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Students', href: '/students' },
  { label: 'Risk', href: '/risk-analysis' },
  { label: 'Reports', href: '/reports' },
];

export default function Navbar({ onMenuClick }) {
  const { logout, user } = useAuth();

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-midnight/88 px-4 py-3 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            aria-label="Open sidebar"
            className="rounded-lg border border-white/10 p-2 text-slate-300 transition hover:bg-white/6 hover:text-white lg:hidden"
            onClick={onMenuClick}
            type="button"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
          <div className="hidden h-10 w-10 items-center justify-center rounded-lg bg-cyanGlow/15 text-cyanGlow sm:flex">
            <GraduationCap className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <p className="hidden text-xs font-semibold uppercase tracking-[0.16em] text-cyanGlow sm:block">EduPredict AI</p>
            <h2 className="text-base font-semibold text-white sm:text-lg">Student Risk Command Center</h2>
          </div>
        </div>

        <nav className="hidden items-center gap-1 xl:flex">
          {navLinks.map((link) => (
            <NavLink
              className={({ isActive }) =>
                cn(
                  'rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition hover:bg-white/6 hover:text-white',
                  isActive && 'bg-cyanGlow/12 text-cyanGlow',
                )
              }
              end={link.href === '/'}
              key={link.href}
              to={link.href}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden min-w-0 flex-1 justify-end lg:flex">
          <label className="relative w-full max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" aria-hidden="true" />
            <input
              className="w-full rounded-lg border border-white/10 bg-white/5 py-2 pl-10 pr-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyanGlow/50 focus:ring-2 focus:ring-cyanGlow/20"
              placeholder="Search students, grade, counselor"
              type="search"
            />
          </label>
        </div>

        <div className="flex items-center gap-2">
          <button
            aria-label="Notifications"
            className="relative rounded-lg border border-white/10 p-2 text-slate-300 transition hover:bg-white/6 hover:text-white"
            type="button"
          >
            <Bell className="h-5 w-5" aria-hidden="true" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-danger" />
          </button>

          <div className="hidden items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2 sm:flex">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyanGlow/15 text-sm font-semibold text-cyanGlow">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">{user?.name}</p>
              <p className="truncate text-xs text-slate-500">{user?.role}</p>
            </div>
          </div>

          <button
            aria-label="Logout"
            className="rounded-lg border border-white/10 p-2 text-slate-300 transition hover:bg-white/6 hover:text-white"
            onClick={logout}
            type="button"
          >
            <LogOut className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}
