import React from 'react';
import ReactDOM from 'react-dom/client';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext.jsx';
import ProtectedRoute from './auth/ProtectedRoute.jsx';
import RoleRoute from './auth/RoleRoute.jsx';
import AppLayout from './layout/AppLayout.jsx';
import StudentLayout from './layout/StudentLayout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Login from './pages/Login.jsx';
import Students from './pages/Students.jsx';
import RiskAnalysis from './pages/RiskAnalysis.jsx';
import Reports from './pages/Reports.jsx';
import Settings from './pages/Settings.jsx';
import StudentAttendance from './pages/student/StudentAttendance.jsx';
import StudentDashboard from './pages/student/StudentDashboard.jsx';
import StudentMarks from './pages/student/StudentMarks.jsx';
import StudentNotifications from './pages/student/StudentNotifications.jsx';
import StudentPrediction from './pages/student/StudentPrediction.jsx';
import StudentProfile from './pages/student/StudentProfile.jsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        element: <RoleRoute role="admin" redirectTo="/student" />,
        children: [
          {
            element: <AppLayout />,
            children: [
              { index: true, element: <Dashboard /> },
              { path: 'students', element: <Students /> },
              { path: 'risk-analysis', element: <RiskAnalysis /> },
              { path: 'reports', element: <Reports /> },
              { path: 'settings', element: <Settings /> },
            ],
          },
        ],
      },
      {
        path: 'student',
        element: <RoleRoute role="student" redirectTo="/" />,
        children: [
          {
            element: <StudentLayout />,
            children: [
              { index: true, element: <StudentDashboard /> },
              { path: 'attendance', element: <StudentAttendance /> },
              { path: 'marks', element: <StudentMarks /> },
              { path: 'prediction', element: <StudentPrediction /> },
              { path: 'notifications', element: <StudentNotifications /> },
              { path: 'profile', element: <StudentProfile /> },
            ],
          },
        ],
      },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
