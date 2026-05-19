import { useState } from 'react';
import { Activity, AlertTriangle, ArrowRight, BrainCircuit, CheckCircle2, ClipboardList, Search, Settings, ShieldCheck, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import RiskBadge from '../components/RiskBadge.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import StatCard from '../components/StatCard.jsx';
import { monthlyRisk, riskDrivers, students } from '../data/students.js';

const highRiskStudents = students.filter((student) => student.risk >= 75);
const mediumRiskStudents = students.filter((student) => student.risk >= 45 && student.risk < 75);
const averageRisk = Math.round(students.reduce((total, student) => total + student.risk, 0) / students.length);
const driverColors = ['#22D3EE', '#34D399', '#FBBF24', '#FB7185'];
const formActions = [
  { label: 'Student Records', href: '/students', icon: Users, detail: 'View registered students, attendance, marks, counselor, and risk band.' },
  { label: 'Risk Analysis', href: '/risk-analysis', icon: BrainCircuit, detail: 'Understand dropout risk using attendance, marks, behavior, and support indicators.' },
  { label: 'Reports', href: '/reports', icon: ClipboardList, detail: 'Review intervention progress and school-level report summaries.' },
  { label: 'Search Students', href: '/students', icon: Search, detail: 'Quickly find students from the dummy student record list.' },
  { label: 'Settings', href: '/settings', icon: Settings, detail: 'Check admin thresholds and governance notes for this frontend prototype.' },
];

export default function Dashboard() {
  const [activeAction, setActiveAction] = useState(formActions[3]);

  return (
    <div className="space-y-6">
      <section
        className="relative overflow-hidden rounded-lg border border-white/10 bg-cover bg-center shadow-glow"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(11, 17, 32, 0.96), rgba(17, 24, 39, 0.82), rgba(17, 24, 39, 0.54)), url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1800&q=85')",
        }}
      >
        <div className="grid min-h-[520px] gap-6 p-6 sm:p-8 xl:grid-cols-[minmax(0,1fr)_400px] xl:items-end">
          <div className="flex max-w-4xl flex-col justify-end">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-lg border border-cyanGlow/30 bg-cyanGlow/10 px-3 py-2 text-sm font-semibold text-cyanGlow">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Smart school analytics
            </div>
            <h1 className="max-w-4xl text-4xl font-semibold text-white sm:text-5xl lg:text-6xl">
              AI-Powered School Dropout Prediction System
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300">
              Manage students, attendance, marks, reports, and risk predictions from a modern responsive dashboard built for fast school intervention workflows.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyanGlow px-5 py-3 text-sm font-semibold text-midnight transition hover:bg-cyan-300" to="/students">
                View Students
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link className="inline-flex items-center justify-center rounded-lg border border-white/10 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/6" to="/risk-analysis">
                Check Risk
              </Link>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <HeroMetric label="Prediction confidence" value="91%" />
              <HeroMetric label="Students tracked" value="1,248" />
              <HeroMetric label="Active alerts" value="16" />
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-midnight/78 p-4 backdrop-blur-xl">
            <div className="mb-4">
              <p className="text-sm font-semibold text-white">Interactive Workflow</p>
              <p className="mt-1 text-xs text-slate-400">Select a module to preview its purpose.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
            {formActions.map((action) => (
              <button
                className={`rounded-lg border p-3 text-left transition ${activeAction.label === action.label ? 'border-cyanGlow/50 bg-cyanGlow/12' : 'border-white/10 bg-white/5 hover:border-cyanGlow/30 hover:bg-cyanGlow/10'}`}
                key={action.label}
                onClick={() => setActiveAction(action)}
                type="button"
              >
                <action.icon className="h-5 w-5 text-cyanGlow" aria-hidden="true" />
                <p className="mt-3 text-sm font-medium text-white">{action.label}</p>
              </button>
            ))}
            </div>
            <div className="mt-4 rounded-lg border border-white/10 bg-white/6 p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-cyanGlow/15 p-2 text-cyanGlow">
                  <activeAction.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-white">{activeAction.label}</h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-300">{activeAction.detail}</p>
              <Link className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyanGlow hover:text-cyan-300" to={activeAction.href}>
                Open module
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Users} label="Tracked Students" value="1,248" helper="Across grades 8 through 12" />
        <StatCard icon={AlertTriangle} label="High Risk Cases" value={highRiskStudents.length} helper="Require intervention this week" tone="danger" />
        <StatCard icon={Activity} label="Average Risk" value={`${averageRisk}%`} helper="Down 4% from last month" tone="warning" />
        <StatCard icon={CheckCircle2} label="Interventions Active" value="134" helper="Plans currently in progress" tone="mint" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.75fr)]">
        <div className="rounded-lg border border-white/10 bg-panel/80 p-5 shadow-glow">
          <SectionHeader title="Cohort Risk Trend" subtitle="Dummy monthly distribution by prediction band" />
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyRisk}>
                <CartesianGrid stroke="rgba(148, 163, 184, 0.14)" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} />
                <Tooltip
                  cursor={{ fill: 'rgba(255,255,255,0.04)' }}
                  contentStyle={{ background: '#111827', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, color: '#fff' }}
                />
                <Bar dataKey="low" stackId="risk" fill="#34D399" radius={[0, 0, 6, 6]} />
                <Bar dataKey="medium" stackId="risk" fill="#FBBF24" />
                <Bar dataKey="high" stackId="risk" fill="#FB7185" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-panel/80 p-5 shadow-glow">
          <SectionHeader title="Risk Drivers" subtitle="Top model signals in current cohort" />
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={riskDrivers} dataKey="value" innerRadius={62} outerRadius={92} paddingAngle={4}>
                  {riskDrivers.map((entry, index) => (
                    <Cell key={entry.name} fill={driverColors[index]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#111827', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {riskDrivers.map((driver, index) => (
              <div className="rounded-lg bg-white/5 p-3" key={driver.name}>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: driverColors[index] }} />
                  <span className="text-xs text-slate-400">{driver.name}</span>
                </div>
                <p className="mt-2 text-lg font-semibold text-white">{driver.value}%</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-white/10 bg-panel/80 p-5 shadow-glow">
        <SectionHeader title="Priority Student Watchlist" subtitle="Sorted by predicted dropout risk" />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-separate border-spacing-y-2 text-left text-sm">
            <thead className="text-xs uppercase tracking-[0.14em] text-slate-500">
              <tr>
                <th className="px-3 py-2">Student</th>
                <th className="px-3 py-2">Grade</th>
                <th className="px-3 py-2">Attendance</th>
                <th className="px-3 py-2">Average</th>
                <th className="px-3 py-2">Risk</th>
                <th className="px-3 py-2">Counselor</th>
              </tr>
            </thead>
            <tbody>
              {[...students].sort((a, b) => b.risk - a.risk).map((student) => (
                <tr className="rounded-lg bg-white/5 text-slate-200" key={student.id}>
                  <td className="rounded-l-lg px-3 py-3">
                    <div className="font-medium text-white">{student.name}</div>
                    <div className="text-xs text-slate-500">{student.id}</div>
                  </td>
                  <td className="px-3 py-3">{student.grade}</td>
                  <td className="px-3 py-3">{student.attendance}%</td>
                  <td className="px-3 py-3">{student.averageScore}%</td>
                  <td className="px-3 py-3"><RiskBadge risk={student.risk} /></td>
                  <td className="rounded-r-lg px-3 py-3">{student.counselor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-danger/20 bg-danger/10 p-5">
          <h3 className="text-base font-semibold text-white">Immediate Attention</h3>
          <p className="mt-2 text-sm text-slate-300">{highRiskStudents.length} students are above the 75% dropout risk threshold.</p>
        </div>
        <div className="rounded-lg border border-warning/20 bg-warning/10 p-5">
          <h3 className="text-base font-semibold text-white">Preventive Outreach</h3>
          <p className="mt-2 text-sm text-slate-300">{mediumRiskStudents.length} students are in the medium-risk band and need monitoring.</p>
        </div>
      </section>
    </div>
  );
}

function HeroMetric({ label, value }) {
  return (
    <div className="rounded-lg border border-white/10 bg-midnight/70 p-4 backdrop-blur">
      <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
    </div>
  );
}
