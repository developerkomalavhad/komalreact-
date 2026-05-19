import { motion } from 'framer-motion';
import { Award, BarChart3, BrainCircuit, CheckCircle2 } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import CircularProgress from '../../components/student/CircularProgress.jsx';
import StudentStatCard from '../../components/student/StudentStatCard.jsx';
import { attendanceTrend, riskBreakdown, studentStats, subjectMarks } from '../../data/studentPanel.js';
import { getRegisteredStudentProfile } from '../../utils/studentData.js';

const pieColors = ['#34D399', '#FB7185'];

export default function StudentDashboard() {
  const profile = getRegisteredStudentProfile();

  return (
    <div className="space-y-6">
      <section
        className="overflow-hidden rounded-lg border border-white/10 bg-cover bg-center p-6 shadow-glow"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(11, 17, 32, 0.96), rgba(17, 24, 39, 0.82), rgba(17, 24, 39, 0.52)), url('https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1800&q=85')",
        }}
      >
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-mint">Welcome back</p>
          <h1 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">Hi {profile.name}, your AI learning panel is ready.</h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300">
            Track attendance, marks, risk level, recommendations, and alerts from one focused student dashboard.
          </p>
        </motion.div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StudentStatCard icon={BarChart3} label="Attendance Percentage" value={`${studentStats.attendancePercentage}%`} helper="Target is 85% or above" />
        <StudentStatCard icon={Award} label="Average Marks" value={`${studentStats.averageMarks}%`} helper="Overall academic average" tone="mint" />
        <StudentStatCard icon={BrainCircuit} label="Risk Level" value={studentStats.riskLevel} helper={`${studentStats.riskPercentage}% predicted risk`} tone="warning" />
        <StudentStatCard icon={CheckCircle2} label="Performance Status" value={studentStats.performanceStatus} helper="Based on recent trend" tone="mint" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
        <GlassPanel title="Attendance Line Chart">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={attendanceTrend}>
                <CartesianGrid stroke="rgba(148, 163, 184, 0.14)" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="attendance" stroke="#22D3EE" strokeWidth={3} dot={{ r: 4, fill: '#22D3EE' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassPanel>

        <GlassPanel title="AI Prediction">
          <div className="flex flex-col items-center gap-5">
            <CircularProgress value={studentStats.riskPercentage} label="Risk" />
            <div className="w-full">
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-slate-400">Dropout Risk</span>
                <span className="font-semibold text-mint">{studentStats.riskLevel}</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-mint to-cyanGlow"
                  initial={{ width: 0 }}
                  animate={{ width: `${studentStats.riskPercentage}%` }}
                  transition={{ duration: 0.9 }}
                />
              </div>
              <div className="mt-4 rounded-lg border border-mint/20 bg-mint/10 p-4">
                <p className="font-semibold text-white">AI Recommendation</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">Attend at least 8 upcoming classes and focus on History revision to reduce risk below 20%.</p>
              </div>
            </div>
          </div>
        </GlassPanel>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <GlassPanel title="Subject Marks Bar Chart">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectMarks}>
                <CartesianGrid stroke="rgba(148, 163, 184, 0.14)" vertical={false} />
                <XAxis dataKey="subject" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="marks" fill="#34D399" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassPanel>

        <GlassPanel title="Risk Level Pie Chart">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={riskBreakdown} dataKey="value" innerRadius={62} outerRadius={96} paddingAngle={4}>
                  {riskBreakdown.map((entry, index) => <Cell key={entry.name} fill={pieColors[index]} />)}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </GlassPanel>
      </section>
    </div>
  );
}

export function GlassPanel({ children, title }) {
  return (
    <motion.section
      className="rounded-lg border border-white/10 bg-white/8 p-5 shadow-glow backdrop-blur-xl"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="mb-4 text-lg font-semibold text-white">{title}</h2>
      {children}
    </motion.section>
  );
}

const tooltipStyle = {
  background: '#111827',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: 8,
  color: '#fff',
};
