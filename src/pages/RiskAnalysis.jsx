import { BrainCircuit } from 'lucide-react';
import SectionHeader from '../components/SectionHeader.jsx';
import { students } from '../data/students.js';

export default function RiskAnalysis() {
  const factors = [
    { label: 'Attendance volatility', value: '36%', detail: 'Absences, late arrivals, multi-week dips' },
    { label: 'Academic decline', value: '28%', detail: 'Score trend, failed assessments, missing work' },
    { label: 'Behavior indicators', value: '18%', detail: 'Discipline events and classroom engagement' },
    { label: 'Socioeconomic context', value: '18%', detail: 'Support access and family constraints' },
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-white/10 bg-panel/80 p-5 shadow-glow">
        <SectionHeader title="Prediction Factors" subtitle="Transparent dummy feature weights for the current prototype" />
        <div className="grid gap-4 md:grid-cols-2">
          {factors.map((factor) => (
            <article className="rounded-lg border border-white/10 bg-white/5 p-4" key={factor.label}>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-cyanGlow/12 p-2 text-cyanGlow">
                    <BrainCircuit className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-semibold text-white">{factor.label}</h3>
                </div>
                <span className="text-xl font-semibold text-cyanGlow">{factor.value}</span>
              </div>
              <p className="mt-3 text-sm text-slate-400">{factor.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-white/10 bg-panel/80 p-5 shadow-glow">
        <SectionHeader title="Model Output Preview" subtitle="Sample predicted risk scores from dummy data" />
        <div className="space-y-4">
          {students.map((student) => (
            <div className="grid gap-3 rounded-lg bg-white/5 p-4 md:grid-cols-[180px_1fr_64px]" key={student.id}>
              <div>
                <p className="font-medium text-white">{student.name}</p>
                <p className="text-xs text-slate-500">{student.grade}</p>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-full rounded-full bg-midnight">
                  <div className="h-3 rounded-full bg-cyanGlow" style={{ width: `${student.risk}%` }} />
                </div>
              </div>
              <p className="text-right font-semibold text-white">{student.risk}%</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
