import { Download, FileText } from 'lucide-react';
import SectionHeader from '../components/SectionHeader.jsx';
import { interventions } from '../data/students.js';

export default function Reports() {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-white/10 bg-panel/80 p-5 shadow-glow">
        <SectionHeader
          title="Intervention Reports"
          subtitle="Frontend-only report summaries using dummy intervention data"
          action={
            <button className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/6" type="button">
              <Download className="h-4 w-4" aria-hidden="true" />
              Export
            </button>
          }
        />
        <div className="grid gap-4 md:grid-cols-2">
          {interventions.map((item) => {
            const percent = Math.round((item.completed / item.total) * 100);

            return (
              <article className="rounded-lg border border-white/10 bg-white/5 p-4" key={item.label}>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-mint/12 p-2 text-mint">
                      <FileText className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{item.label}</h3>
                      <p className="text-sm text-slate-400">{item.completed} of {item.total} complete</p>
                    </div>
                  </div>
                  <span className="text-lg font-semibold text-white">{percent}%</span>
                </div>
                <div className="mt-4 h-2 rounded-full bg-midnight">
                  <div className="h-2 rounded-full bg-mint" style={{ width: `${percent}%` }} />
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
