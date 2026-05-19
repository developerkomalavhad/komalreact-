export default function StatCard({ icon: Icon, label, value, helper, tone = 'cyan' }) {
  const tones = {
    cyan: 'bg-cyanGlow/12 text-cyanGlow',
    mint: 'bg-mint/12 text-mint',
    warning: 'bg-warning/12 text-warning',
    danger: 'bg-danger/12 text-danger',
  };

  return (
    <article className="rounded-lg border border-white/10 bg-panel/80 p-5 shadow-glow backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-400">{label}</p>
          <h3 className="mt-3 text-3xl font-semibold tracking-normal text-white">{value}</h3>
        </div>
        <div className={`rounded-lg p-3 ${tones[tone]}`}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>
      <p className="mt-4 text-sm text-slate-400">{helper}</p>
    </article>
  );
}
