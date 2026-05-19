import { ShieldCheck, SlidersHorizontal } from 'lucide-react';
import SectionHeader from '../components/SectionHeader.jsx';

export default function Settings() {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-white/10 bg-panel/80 p-5 shadow-glow">
        <SectionHeader title="System Settings" subtitle="Static prototype controls for future backend integration" />
        <div className="grid gap-4 md:grid-cols-2">
          <SettingCard icon={SlidersHorizontal} title="Risk Thresholds" description="High-risk threshold currently set at 75% and medium-risk at 45%." />
          <SettingCard icon={ShieldCheck} title="Data Governance" description="Backend, authentication, and live student records are intentionally not connected yet." />
        </div>
      </section>
    </div>
  );
}

function SettingCard({ icon: Icon, title, description }) {
  return (
    <article className="rounded-lg border border-white/10 bg-white/5 p-4">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-cyanGlow/12 text-cyanGlow">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <h3 className="font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
    </article>
  );
}
