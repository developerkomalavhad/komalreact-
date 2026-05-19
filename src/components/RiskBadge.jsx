import { getRiskBand } from '../utils/risk.js';
import { cn } from '../utils/classNames.js';

export default function RiskBadge({ risk }) {
  const band = getRiskBand(risk);

  return (
    <span className={cn('inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold', band.bg, band.border, band.text)}>
      <span className={cn('h-2 w-2 rounded-full', band.dot)} />
      {band.label} · {risk}%
    </span>
  );
}
