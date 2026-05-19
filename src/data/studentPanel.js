export const studentProfile = {
  name: 'Aarav Sharma',
  rollNumber: 'STU-1042',
  className: '10A',
  parentContact: '+91 98765 43210',
  email: 'aarav.sharma@student.ai',
};

export const studentStats = {
  attendancePercentage: 82,
  averageMarks: 76,
  riskPercentage: 28,
  riskLevel: 'Low Risk',
  performanceStatus: 'Improving',
  totalClasses: 180,
  presentDays: 148,
  absentDays: 32,
};

export const attendanceTrend = [
  { month: 'Jan', attendance: 78 },
  { month: 'Feb', attendance: 80 },
  { month: 'Mar', attendance: 76 },
  { month: 'Apr', attendance: 84 },
  { month: 'May', attendance: 82 },
  { month: 'Jun', attendance: 88 },
];

export const subjectMarks = [
  { subject: 'Math', marks: 78, grade: 'B+', performance: 'Good' },
  { subject: 'Science', marks: 84, grade: 'A', performance: 'Strong' },
  { subject: 'English', marks: 72, grade: 'B', performance: 'Good' },
  { subject: 'History', marks: 69, grade: 'B', performance: 'Needs focus' },
  { subject: 'Computer', marks: 91, grade: 'A+', performance: 'Excellent' },
];

export const riskBreakdown = [
  { name: 'Safe', value: 72 },
  { name: 'Risk', value: 28 },
];

export const studentNotifications = [
  {
    title: 'Low attendance warning',
    message: 'Attendance is below the ideal 85% target. Attend the next 8 classes to recover.',
    type: 'warning',
    time: 'Today',
  },
  {
    title: 'Upcoming exams',
    message: 'Science and Mathematics unit tests are scheduled next week.',
    type: 'info',
    time: '2 days',
  },
  {
    title: 'Admin notice',
    message: 'Parent-teacher meeting slots are open for this Friday.',
    type: 'success',
    time: 'This week',
  },
];
