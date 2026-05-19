import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer.jsx';
import StudentNavbar from './StudentNavbar.jsx';
import StudentSidebar from './StudentSidebar.jsx';

export default function StudentLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen text-slate-100 lg:flex">
      <StudentSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <StudentNavbar onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
