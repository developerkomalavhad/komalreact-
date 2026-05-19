import { Bell, BarChart3, BrainCircuit, ClipboardList, GraduationCap, LayoutDashboard, UserRound } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '../utils/classNames.js';

const navItems = [
  { label: 'Dashboard', href: '/student', icon: LayoutDashboard },
  { label: 'Attendance', href: '/student/attendance', icon: BarChart3 },
  { label: 'Marks', href: '/student/marks', icon: ClipboardList },
  { label: 'AI Prediction', href: '/student/prediction', icon: BrainCircuit },
  { label: 'Notifications', href: '/student/notifications', icon: Bell },
  { label: 'Profile', href: '/student/profile', icon: UserRound },
];

export default function StudentSidebar({ isOpen, onClose }) {
  return (
    <>
      <button
        aria-label="Close sidebar"
        className={cn('fixed inset-0 z-30 bg-black/50 transition-opacity lg:hidden', isOpen ? 'opacity-100' : 'pointer-events-none opacity-0')}
        onClick={onClose}
        type="button"
      />
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-white/10 bg-midnight/95 px-4 py-5 backdrop-blur-xl transition-transform lg:static lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex items-center gap-3 px-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-mint/15 text-mint">
            <GraduationCap className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-mint">Student AI</p>
            <h1 className="text-base font-semibold text-white">My Risk Panel</h1>
          </div>
        </div>

        <nav className="mt-8 space-y-1">
          {navItems.map((item) => (
            <NavLink
              end={item.href === '/student'}
              key={item.href}
              to={item.href}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-400 transition hover:bg-white/6 hover:text-white',
                  isActive && 'bg-mint/12 text-mint ring-1 ring-mint/20',
                )
              }
            >
              <item.icon className="h-5 w-5" aria-hidden="true" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto rounded-lg border border-mint/20 bg-mint/10 p-4">
          <p className="text-sm font-semibold text-white">AI Recommendation</p>
          <p className="mt-2 text-xs leading-5 text-slate-300">Keep attendance above 85% and revise Math twice this week.</p>
        </div>
      </aside>
    </>
  );
}
