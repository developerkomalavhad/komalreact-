import { Phone, School, UserRound } from 'lucide-react';
import { getRegisteredStudentProfile } from '../../utils/studentData.js';
import { GlassPanel } from './StudentDashboard.jsx';

export default function StudentProfile() {
  const profile = getRegisteredStudentProfile();

  return (
    <GlassPanel title="Profile Card">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-mint/15 text-4xl font-semibold text-mint">
          {profile.name.charAt(0)}
        </div>
        <div className="grid flex-1 gap-4 md:grid-cols-2">
          <ProfileItem icon={UserRound} label="Student Name" value={profile.name} />
          <ProfileItem icon={School} label="Roll Number" value={profile.rollNumber} />
          <ProfileItem icon={School} label="Class" value={profile.className} />
          <ProfileItem icon={Phone} label="Parent Contact" value={profile.parentContact} />
        </div>
      </div>
    </GlassPanel>
  );
}

function ProfileItem({ icon: Icon, label, value }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-4">
      <div className="flex items-center gap-2 text-slate-400">
        <Icon className="h-4 w-4" aria-hidden="true" />
        <span className="text-sm">{label}</span>
      </div>
      <p className="mt-2 font-semibold text-white">{value}</p>
    </div>
  );
}
