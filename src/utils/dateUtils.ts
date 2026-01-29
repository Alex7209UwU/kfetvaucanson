export function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function getWeekKey(date: Date): string {
  const weekStart = getWeekStart(date);
  return weekStart.toISOString().split('T')[0];
}

export function formatWeekDisplay(weekKey: string): string {
  const date = new Date(weekKey);
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
  return `Semaine du ${date.toLocaleDateString('fr-FR', options)}`;
}

export function addWeeks(date: Date, weeks: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + weeks * 7);
  return d;
}

export function formatDateShort(dateStr: string): string {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('fr-FR', options);
}
