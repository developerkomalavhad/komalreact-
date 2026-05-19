import { subjectMarks } from '../../data/studentPanel.js';
import { GlassPanel } from './StudentDashboard.jsx';

export default function StudentMarks() {
  return (
    <GlassPanel title="Marks Table">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[620px] border-separate border-spacing-y-2 text-left text-sm">
          <thead className="text-xs uppercase tracking-[0.14em] text-slate-500">
            <tr>
              <th className="px-3 py-2">Subject</th>
              <th className="px-3 py-2">Marks</th>
              <th className="px-3 py-2">Grade</th>
              <th className="px-3 py-2">Performance</th>
            </tr>
          </thead>
          <tbody>
            {subjectMarks.map((item) => (
              <tr className="bg-white/5 text-slate-200" key={item.subject}>
                <td className="rounded-l-lg px-3 py-4 font-semibold text-white">{item.subject}</td>
                <td className="px-3 py-4">{item.marks}/100</td>
                <td className="px-3 py-4">{item.grade}</td>
                <td className="rounded-r-lg px-3 py-4">{item.performance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassPanel>
  );
}
