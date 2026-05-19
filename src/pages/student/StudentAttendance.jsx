import CircularProgress from '../../components/student/CircularProgress.jsx';
import { studentStats } from '../../data/studentPanel.js';
import { GlassPanel } from './StudentDashboard.jsx';

export default function StudentAttendance() {
  return (
    <GlassPanel title="Attendance Section">
      <div className="grid gap-6 lg:grid-cols-[260px_1fr] lg:items-center">
        <CircularProgress value={studentStats.attendancePercentage} label="Attendance" />
        <div className="grid gap-4 sm:grid-cols-3">
          <Metric label="Total Classes" value={studentStats.totalClasses} />
          <Metric label="Present Days" value={studentStats.presentDays} />
          <Metric label="Absent Days" value={studentStats.absentDays} tone="text-danger" />
        </div>
      </div>
    </GlassPanel>
  );
}

function Metric({ label, value, tone = 'text-white' }) {
  return (
    <div className="rounded-lg border border-white/10 bg-midnight/50 p-5">
      <p className="text-sm text-slate-400">{label}</p>
      <p className={`mt-3 text-3xl font-semibold ${tone}`}>{value}</p>
    </div>
  );
}
