import { BarChart3, BrainCircuit, ClipboardList, GraduationCap, LayoutDashboard, Settings, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '../utils/classNames.js';

const navItems = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'Students', href: '/students', icon: Users },
  { label: 'Risk Analysis', href: '/risk-analysis', icon: BrainCircuit },
  { label: 'Reports', href: '/reports', icon: ClipboardList },
  { label: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar({ isOpen, onClose }) {
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
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-cyanGlow/15 text-cyanGlow">
            <GraduationCap className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyanGlow">EduPredict</p>
            <h1 className="text-base font-semibold text-white">Dropout AI</h1>
          </div>
        </div>

        <nav className="mt-8 space-y-1">
          {navItems.map((item) => (
            <NavLink
              end={item.href === '/'}
              key={item.href}
              to={item.href}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-400 transition hover:bg-white/6 hover:text-white',
                  isActive && 'bg-cyanGlow/12 text-cyanGlow ring-1 ring-cyanGlow/20',
                )
              }
            >
              <item.icon className="h-5 w-5" aria-hidden="true" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto rounded-lg border border-white/10 bg-panelSoft/80 p-4">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
            <BarChart3 className="h-4 w-4 text-mint" aria-hidden="true" />
            Model Health
          </div>
          <div className="h-2 rounded-full bg-white/10">
            <div className="h-2 w-[91%] rounded-full bg-mint" />
          </div>
          <p className="mt-3 text-xs leading-5 text-slate-400">Prediction confidence is stable across the latest dummy cohort.</p>
        </div>
      </aside>
    </>
  );
}
