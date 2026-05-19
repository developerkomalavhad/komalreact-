import { motion } from 'framer-motion';

export default function StudentStatCard({ icon: Icon, label, value, helper, tone = 'cyan' }) {
  const tones = {
    cyan: 'from-cyanGlow/20 to-cyanGlow/5 text-cyanGlow',
    mint: 'from-mint/20 to-mint/5 text-mint',
    warning: 'from-warning/20 to-warning/5 text-warning',
    danger: 'from-danger/20 to-danger/5 text-danger',
  };

  return (
    <motion.article
      className="rounded-lg border border-white/10 bg-white/8 p-5 shadow-glow backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyanGlow/30"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">{label}</p>
          <h3 className="mt-3 text-3xl font-semibold text-white">{value}</h3>
        </div>
        <div className={`rounded-lg bg-gradient-to-br p-3 ${tones[tone]}`}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>
      <p className="mt-4 text-sm text-slate-400">{helper}</p>
    </motion.article>
  );
}
