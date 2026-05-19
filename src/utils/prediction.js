export function calculateRisk({ attendance, marks, behavior, support }) {
  const attendanceRisk = 100 - Number(attendance || 0);
  const marksRisk = 100 - Number(marks || 0);
  const behaviorRisk = 100 - Number(behavior || 0);
  const supportRisk = Number(support || 50);

  return Math.min(100, Math.max(0, Math.round(attendanceRisk * 0.35 + marksRisk * 0.3 + behaviorRisk * 0.2 + supportRisk * 0.15)));
}

export function getRiskLabel(risk) {
  if (risk >= 70) return 'High Risk';
  if (risk >= 40) return 'Medium Risk';
  return 'Low Risk';
}

export function getRecommendation(risk) {
  if (risk >= 70) {
    return 'Immediate counselor meeting, parent call, and daily attendance monitoring are recommended.';
  }

  if (risk >= 40) {
    return 'Schedule mentoring, monitor weekly attendance, and improve weaker subjects with short study goals.';
  }

  return 'Risk is low. Maintain attendance above 85% and keep current study routine consistent.';
}
