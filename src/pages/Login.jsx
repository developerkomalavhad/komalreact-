import { useState } from 'react';
import { BrainCircuit, Eye, EyeOff, GraduationCap, Lock, Mail, UserPlus } from 'lucide-react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext.jsx';
import Footer from '../components/Footer.jsx';

export default function Login() {
  const { adminLogin, isAuthenticated, registeredStudent, registerStudent, studentLogin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mode, setMode] = useState('student');
  const [studentStep, setStudentStep] = useState(registeredStudent ? 'login' : 'register');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [admin, setAdmin] = useState({ email: 'admin@school.ai', password: 'admin123' });
  const [student, setStudent] = useState({
    name: '',
    studentId: '',
    grade: '',
    email: registeredStudent?.email || '',
    password: '',
  });
  const from = location.state?.from?.pathname || '/';

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  function handleAdminLogin(event) {
    event.preventDefault();
    const result = adminLogin(admin.email.trim(), admin.password);
    setError('');
    setSuccess('');

    if (!result.ok) {
      setError(result.message);
      return;
    }

    navigate('/student', { replace: true });
  }

  function handleStudentRegister(event) {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!student.name || !student.studentId || !student.grade || !student.email || !student.password) {
      setError('Please fill all student registration fields.');
      return;
    }

    registerStudent(student);
    setStudentStep('login');
    setSuccess('Student registered successfully. Now login with the same email and password.');
  }

  function handleStudentLogin(event) {
    event.preventDefault();
    const result = studentLogin(student.email.trim(), student.password);
    setError('');
    setSuccess('');

    if (!result.ok) {
      setError(result.message);
      return;
    }

    navigate('/', { replace: true });
  }

  return (
    <div className="min-h-screen">
      <main
        className="flex min-h-screen items-center justify-center bg-cover bg-center px-4 py-10 text-slate-100"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(11, 17, 32, 0.94), rgba(15, 23, 42, 0.86)), url('https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <section className="w-full max-w-5xl overflow-hidden rounded-lg border border-white/10 bg-panel/88 shadow-glow backdrop-blur">
          <div className="grid min-h-[640px] lg:grid-cols-[1fr_430px]">
            <div className="flex flex-col justify-between border-b border-white/10 bg-midnight/62 p-8 lg:border-b-0 lg:border-r">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyanGlow/15 text-cyanGlow">
                  <BrainCircuit className="h-7 w-7" aria-hidden="true" />
                </div>
                <h1 className="mt-8 max-w-2xl text-4xl font-semibold tracking-normal text-white sm:text-5xl">
                  AI-Powered School Dropout Prediction System
                </h1>
                <p className="mt-5 max-w-xl text-base leading-7 text-slate-400">
                  Admin gets direct dashboard access. Students register once, then login to view the homepage.
                </p>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                <Info label="Admin" value="Dashboard" />
                <Info label="Student" value="Register/Login" />
                <Info label="Backend" value="Not added" />
              </div>
            </div>

            <div className="flex items-center p-6 sm:p-8">
              <div className="w-full">
                <div className="mb-6 grid grid-cols-2 rounded-lg border border-white/10 bg-white/5 p-1">
                  <button className={tabClass(mode === 'student')} onClick={() => { setMode('student'); setError(''); setSuccess(''); }} type="button">
                    Student
                  </button>
                  <button className={tabClass(mode === 'admin')} onClick={() => { setMode('admin'); setError(''); setSuccess(''); }} type="button">
                    Admin
                  </button>
                </div>

                {mode === 'admin' ? (
                  <form onSubmit={handleAdminLogin}>
                    <FormHeader icon={Lock} eyebrow="Admin Login" title="Login to dashboard" subtitle="Admin login opens the dashboard directly." />
                    <AuthField icon={Mail} label="Admin Email">
                      <input className={inputClass} onChange={(event) => setAdmin({ ...admin, email: event.target.value })} type="email" value={admin.email} />
                    </AuthField>
                    <PasswordField
                      label="Admin Password"
                      onChange={(event) => setAdmin({ ...admin, password: event.target.value })}
                      showPassword={showPassword}
                      toggle={() => setShowPassword((current) => !current)}
                      value={admin.password}
                    />
                    <Message error={error} success={success} />
                    <button className={buttonClass} type="submit">Admin Login</button>
                    <p className="mt-4 rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-slate-400">
                      Demo admin: <span className="text-slate-200">admin@school.ai</span> / <span className="text-slate-200">admin123</span>
                    </p>
                  </form>
                ) : studentStep === 'register' ? (
                  <form onSubmit={handleStudentRegister}>
                    <FormHeader icon={UserPlus} eyebrow="Student Registration" title="Register student first" subtitle="After registration, the student login form will be shown." />
                    <AuthField icon={GraduationCap} label="Student Name">
                      <input className={inputClass} onChange={(event) => setStudent({ ...student, name: event.target.value })} placeholder="Enter student name" value={student.name} />
                    </AuthField>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <label>
                        <span className="text-sm font-medium text-slate-300">Student ID</span>
                        <input className={`${inputClass} mt-2`} onChange={(event) => setStudent({ ...student, studentId: event.target.value })} placeholder="STU-1001" value={student.studentId} />
                      </label>
                      <label>
                        <span className="text-sm font-medium text-slate-300">Grade</span>
                        <select className={`${inputClass} mt-2`} onChange={(event) => setStudent({ ...student, grade: event.target.value })} value={student.grade}>
                          <option value="">Select grade</option>
                          <option>8A</option>
                          <option>9B</option>
                          <option>10A</option>
                          <option>11C</option>
                          <option>12A</option>
                        </select>
                      </label>
                    </div>
                    <AuthField icon={Mail} label="Student Email">
                      <input className={inputClass} onChange={(event) => setStudent({ ...student, email: event.target.value })} placeholder="student@email.com" type="email" value={student.email} />
                    </AuthField>
                    <PasswordField
                      label="Create Password"
                      onChange={(event) => setStudent({ ...student, password: event.target.value })}
                      showPassword={showPassword}
                      toggle={() => setShowPassword((current) => !current)}
                      value={student.password}
                    />
                    <Message error={error} success={success} />
                    <button className={buttonClass} type="submit">Register Student</button>
                    {registeredStudent ? (
                      <button className={ghostButtonClass} onClick={() => setStudentStep('login')} type="button">Already registered? Login</button>
                    ) : null}
                  </form>
                ) : (
                  <form onSubmit={handleStudentLogin}>
                    <FormHeader icon={GraduationCap} eyebrow="Student Login" title="Login as student" subtitle="Registered student can login and see the homepage." />
                    <AuthField icon={Mail} label="Student Email">
                      <input className={inputClass} onChange={(event) => setStudent({ ...student, email: event.target.value })} type="email" value={student.email} />
                    </AuthField>
                    <PasswordField
                      label="Student Password"
                      onChange={(event) => setStudent({ ...student, password: event.target.value })}
                      showPassword={showPassword}
                      toggle={() => setShowPassword((current) => !current)}
                      value={student.password}
                    />
                    <Message error={error} success={success} />
                    <button className={buttonClass} type="submit">Student Login</button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

const inputClass =
  'w-full rounded-lg border border-white/10 bg-white/5 px-3 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyanGlow/50 focus:ring-2 focus:ring-cyanGlow/20';
const buttonClass = 'mt-6 w-full rounded-lg bg-cyanGlow px-4 py-3 text-sm font-semibold text-midnight transition hover:bg-cyan-300';
const ghostButtonClass = 'mt-3 w-full rounded-lg border border-white/10 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/6';

function tabClass(active) {
  return `rounded-md px-3 py-2 text-sm font-semibold transition ${active ? 'bg-cyanGlow text-midnight' : 'text-slate-400 hover:bg-white/6 hover:text-white'}`;
}

function FormHeader({ icon: Icon, eyebrow, title, subtitle }) {
  return (
    <div className="mb-7">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-cyanGlow/15 text-cyanGlow">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyanGlow">{eyebrow}</p>
      <h2 className="mt-3 text-2xl font-semibold text-white">{title}</h2>
      <p className="mt-2 text-sm text-slate-400">{subtitle}</p>
    </div>
  );
}

function AuthField({ children, icon: Icon, label }) {
  return (
    <label className="mt-4 block">
      <span className="text-sm font-medium text-slate-300">{label}</span>
      <span className="relative mt-2 block">
        <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" aria-hidden="true" />
        <span className="block [&>input]:pl-10">{children}</span>
      </span>
    </label>
  );
}

function PasswordField({ label, onChange, showPassword, toggle, value }) {
  return (
    <label className="mt-4 block">
      <span className="text-sm font-medium text-slate-300">{label}</span>
      <span className="relative mt-2 block">
        <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" aria-hidden="true" />
        <input className={`${inputClass} pl-10 pr-12`} onChange={onChange} type={showPassword ? 'text' : 'password'} value={value} />
        <button
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition hover:bg-white/6 hover:text-white"
          onClick={toggle}
          type="button"
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </span>
    </label>
  );
}

function Message({ error, success }) {
  if (error) {
    return <p className="mt-4 rounded-lg border border-danger/30 bg-danger/10 px-3 py-2 text-sm text-danger">{error}</p>;
  }

  if (success) {
    return <p className="mt-4 rounded-lg border border-mint/30 bg-mint/10 px-3 py-2 text-sm text-mint">{success}</p>;
  }

  return null;
}

function Info({ label, value }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-4">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-2 text-lg font-semibold text-white">{value}</p>
    </div>
  );
}
