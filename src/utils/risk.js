export function getRiskBand(risk) {
  if (risk >= 75) {
    return {
      label: 'High',
      text: 'text-danger',
      bg: 'bg-danger/12',
      border: 'border-danger/30',
      dot: 'bg-danger',
    };
  }

  if (risk >= 45) {
    return {
      label: 'Medium',
      text: 'text-warning',
      bg: 'bg-warning/12',
      border: 'border-warning/30',
      dot: 'bg-warning',
    };
  }

  return {
    label: 'Low',
    text: 'text-mint',
    bg: 'bg-mint/12',
    border: 'border-mint/30',
    dot: 'bg-mint',
  };
}
