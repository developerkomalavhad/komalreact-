import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);
const STORAGE_KEY = 'dropout-dashboard-user';
const STUDENT_KEY = 'dropout-dashboard-student';

const adminUser = {
  name: 'Admin User',
  email: 'admin@school.ai',
  type: 'admin',
  role: 'School Admin',
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = window.localStorage.getItem(STORAGE_KEY);
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [registeredStudent, setRegisteredStudent] = useState(() => {
    const savedStudent = window.localStorage.getItem(STUDENT_KEY);
    return savedStudent ? JSON.parse(savedStudent) : null;
  });

  function adminLogin(email, password) {
    if (email === 'admin@school.ai' && password === 'admin123') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(adminUser));
      setUser(adminUser);
      return { ok: true };
    }

    return { ok: false, message: 'Invalid admin email or password.' };
  }

  function registerStudent(student) {
    const nextStudent = {
      ...student,
      type: 'student',
      role: 'Student',
    };

    window.localStorage.setItem(STUDENT_KEY, JSON.stringify(nextStudent));
    setRegisteredStudent(nextStudent);
    return { ok: true };
  }

  function studentLogin(email, password) {
    if (!registeredStudent) {
      return { ok: false, message: 'Please register student first.' };
    }

    if (email === registeredStudent.email && password === registeredStudent.password) {
      const studentUser = {
        name: registeredStudent.name,
        email: registeredStudent.email,
        studentId: registeredStudent.studentId,
        type: 'student',
        role: 'Student',
      };

      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(studentUser));
      setUser(studentUser);
      return { ok: true };
    }

    return { ok: false, message: 'Invalid student email or password.' };
  }

  function logout() {
    window.localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }

  const value = useMemo(
    () => ({
      adminLogin,
      isAuthenticated: Boolean(user),
      logout,
      registeredStudent,
      registerStudent,
      studentLogin,
      user,
    }),
    [registeredStudent, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}
