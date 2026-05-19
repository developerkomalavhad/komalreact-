import { useState } from 'react';
import { AlertTriangle, Bell, CheckCircle2 } from 'lucide-react';
import { studentNotifications } from '../../data/studentPanel.js';
import { GlassPanel } from './StudentDashboard.jsx';

const icons = {
  warning: AlertTriangle,
  info: Bell,
  success: CheckCircle2,
};

export default function StudentNotifications() {
  const [readItems, setReadItems] = useState([]);

  return (
    <GlassPanel title="Notifications Panel">
      <div className="grid gap-4">
        {studentNotifications.map((notification) => {
          const Icon = icons[notification.type];
          const isRead = readItems.includes(notification.title);

          return (
            <article className={`rounded-lg border p-4 transition hover:border-cyanGlow/30 ${isRead ? 'border-white/10 bg-white/3 opacity-70' : 'border-white/10 bg-white/5 hover:bg-white/8'}`} key={notification.title}>
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-cyanGlow/12 p-2 text-cyanGlow">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="font-semibold text-white">{notification.title}</h3>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-500">{notification.time}</span>
                      <button
                        className="rounded-md border border-white/10 px-2 py-1 text-xs font-semibold text-slate-300 transition hover:bg-white/6"
                        onClick={() => setReadItems((current) => (isRead ? current.filter((item) => item !== notification.title) : [...current, notification.title]))}
                        type="button"
                      >
                        {isRead ? 'Unread' : 'Mark read'}
                      </button>
                    </div>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{notification.message}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </GlassPanel>
  );
}
