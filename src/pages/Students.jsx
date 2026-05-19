import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { useAuth } from '../auth/AuthContext.jsx';
import RiskBadge from '../components/RiskBadge.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { getAdminStudentRecords } from '../utils/studentData.js';

export default function Students() {
  const { registeredStudent } = useAuth();
  const [query, setQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState('All');
  const studentRecords = useMemo(() => getAdminStudentRecords(registeredStudent), [registeredStudent]);
  const filteredStudents = useMemo(
    () =>
      studentRecords.filter((student) => {
        const searchText = `${student.name} ${student.id} ${student.grade} ${student.counselor}`.toLowerCase();
        const matchesSearch = searchText.includes(query.toLowerCase());
        const matchesRisk =
          riskFilter === 'All' ||
          (riskFilter === 'High' && student.risk >= 75) ||
          (riskFilter === 'Medium' && student.risk >= 45 && student.risk < 75) ||
          (riskFilter === 'Low' && student.risk < 45);

        return matchesSearch && matchesRisk;
      }),
    [query, riskFilter, studentRecords],
  );

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-white/10 bg-panel/80 p-5 shadow-glow">
        <SectionHeader title="Student Records" subtitle="Search and filter frontend student records" />
        <div className="mb-5 grid gap-3 md:grid-cols-[1fr_180px]">
          <label className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" aria-hidden="true" />
            <input
              className="w-full rounded-lg border border-white/10 bg-white/5 py-3 pl-10 pr-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyanGlow/50 focus:ring-2 focus:ring-cyanGlow/20"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search name, ID, grade, counselor"
              value={query}
            />
          </label>
          <select
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-3 text-sm text-white outline-none transition focus:border-cyanGlow/50 focus:ring-2 focus:ring-cyanGlow/20"
            onChange={(event) => setRiskFilter(event.target.value)}
            value={riskFilter}
          >
            <option>All</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredStudents.map((student) => (
            <article className="rounded-lg border border-white/10 bg-white/5 p-4" key={student.id}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-white">{student.name}</h3>
                  <p className="mt-1 text-sm text-slate-400">{student.id} · Grade {student.grade}</p>
                </div>
                <RiskBadge risk={student.risk} />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
                <Metric label="Attendance" value={`${student.attendance}%`} />
                <Metric label="Average" value={`${student.averageScore}%`} />
                <Metric label="Behavior" value={`${student.behaviorScore}%`} />
              </div>
              <p className="mt-4 text-sm text-slate-400">Counselor: <span className="text-slate-200">{student.counselor}</span></p>
            </article>
          ))}
        </div>
        {filteredStudents.length === 0 ? (
          <p className="mt-5 rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-slate-400">No students found for this filter.</p>
        ) : null}
      </section>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-lg bg-midnight/50 p-3">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 font-semibold text-white">{value}</p>
    </div>
  );
}
