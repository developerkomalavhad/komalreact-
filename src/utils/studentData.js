import { studentProfile } from '../data/studentPanel.js';
import { students } from '../data/students.js';

const STUDENT_KEY = 'dropout-dashboard-student';

export function getRegisteredStudentProfile() {
  const savedStudent = window.localStorage.getItem(STUDENT_KEY);

  if (!savedStudent) {
    return studentProfile;
  }

  const parsed = JSON.parse(savedStudent);

  return {
    ...studentProfile,
    name: parsed.name || studentProfile.name,
    rollNumber: parsed.studentId || studentProfile.rollNumber,
    className: parsed.grade || studentProfile.className,
    email: parsed.email || studentProfile.email,
    parentContact: parsed.parentContact || studentProfile.parentContact,
  };
}

export function getAdminStudentRecords(registeredStudent) {
  if (!registeredStudent) {
    return students;
  }

  const registeredRecord = {
    id: registeredStudent.studentId,
    name: registeredStudent.name,
    grade: registeredStudent.grade,
    attendance: 82,
    averageScore: 76,
    behaviorScore: 80,
    socioeconomicIndex: 68,
    risk: 28,
    trend: 'New',
    counselor: 'Pending Assignment',
  };

  const withoutDuplicate = students.filter((student) => student.id !== registeredStudent.studentId);
  return [registeredRecord, ...withoutDuplicate];
}
