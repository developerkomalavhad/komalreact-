import { Bell, LogOut, Menu } from 'lucide-react';
import { useAuth } from '../auth/AuthContext.jsx';

export default function StudentNavbar({ onMenuClick }) {
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
          <div>
            <p className="hidden text-xs font-semibold uppercase tracking-[0.16em] text-mint sm:block">Student Dashboard</p>
            <h2 className="text-base font-semibold text-white sm:text-lg">AI Learning Risk Panel</h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            aria-label="Notifications"
            className="relative rounded-lg border border-white/10 p-2 text-slate-300 transition hover:bg-white/6 hover:text-white"
            type="button"
          >
            <Bell className="h-5 w-5" aria-hidden="true" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-warning" />
          </button>

          <div className="hidden items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2 sm:flex">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-mint/15 text-sm font-semibold text-mint">
              {user?.name?.charAt(0) || 'S'}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">{user?.name}</p>
              <p className="truncate text-xs text-slate-500">{user?.studentId || 'Student'}</p>
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
