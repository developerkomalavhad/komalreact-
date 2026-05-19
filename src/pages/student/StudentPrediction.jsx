import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import CircularProgress from '../../components/student/CircularProgress.jsx';
import { studentStats } from '../../data/studentPanel.js';
import { calculateRisk, getRecommendation, getRiskLabel } from '../../utils/prediction.js';
import { GlassPanel } from './StudentDashboard.jsx';

export default function StudentPrediction() {
  const [inputs, setInputs] = useState({
    attendance: 82,
    marks: 76,
    behavior: 80,
    support: 35,
  });
  const risk = useMemo(() => calculateRisk(inputs), [inputs]);
  const riskLabel = getRiskLabel(risk);
  const recommendation = getRecommendation(risk);

  function updateInput(key, value) {
    setInputs((current) => ({ ...current, [key]: value }));
  }

  return (
    <GlassPanel title="AI Prediction Section">
      <div className="grid gap-6 xl:grid-cols-[260px_1fr_360px] xl:items-center">
        <CircularProgress value={risk} label="Risk" />
        <div>
          <p className="text-sm text-slate-400">Risk Percentage</p>
          <h1 className="mt-2 text-5xl font-semibold text-white">{risk}%</h1>
          <p className={`mt-2 text-lg font-semibold ${risk >= 70 ? 'text-danger' : risk >= 40 ? 'text-warning' : 'text-mint'}`}>{riskLabel}</p>
          <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
            <motion.div className="h-full rounded-full bg-gradient-to-r from-mint to-cyanGlow" initial={{ width: 0 }} animate={{ width: `${risk}%` }} />
          </div>
          <div className="mt-6 rounded-lg border border-cyanGlow/20 bg-cyanGlow/10 p-5">
            <h3 className="font-semibold text-white">AI Recommendation Card</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">{recommendation}</p>
          </div>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/5 p-4">
          <h3 className="font-semibold text-white">Try Prediction Inputs</h3>
          <div className="mt-4 space-y-4">
            <Range label="Attendance" value={inputs.attendance} onChange={(value) => updateInput('attendance', value)} />
            <Range label="Average Marks" value={inputs.marks} onChange={(value) => updateInput('marks', value)} />
            <Range label="Behavior Score" value={inputs.behavior} onChange={(value) => updateInput('behavior', value)} />
            <Range label="Support Risk" value={inputs.support} onChange={(value) => updateInput('support', value)} />
          </div>
          <button
            className="mt-5 w-full rounded-lg border border-white/10 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/6"
            onClick={() => setInputs({ attendance: studentStats.attendancePercentage, marks: studentStats.averageMarks, behavior: 80, support: 35 })}
            type="button"
          >
            Reset to Student Data
          </button>
        </div>
      </div>
    </GlassPanel>
  );
}

function Range({ label, onChange, value }) {
  return (
    <label className="block">
      <div className="mb-2 flex justify-between text-sm">
        <span className="text-slate-400">{label}</span>
        <span className="font-semibold text-white">{value}%</span>
      </div>
      <input
        className="w-full accent-cyanGlow"
        max="100"
        min="0"
        onChange={(event) => onChange(Number(event.target.value))}
        type="range"
        value={value}
      />
    </label>
  );
}
