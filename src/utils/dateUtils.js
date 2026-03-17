export const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const DAY_NAMES_FULL = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const EVENT_COLORS = [
  { name: 'Blue', value: '#4a9eff' },
  { name: 'Green', value: '#4ecdc4' },
  { name: 'Red', value: '#ff6b6b' },
  { name: 'Yellow', value: '#ffd93d' },
  { name: 'Purple', value: '#a855f7' },
  { name: 'Orange', value: '#ff8c42' },
  { name: 'Pink', value: '#f472b6' },
  { name: 'Teal', value: '#2dd4bf' },
];

export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

export function isSameDay(d1, d2) {
  if (!d1 || !d2) return false;
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

export function isToday(date) {
  return isSameDay(date, new Date());
}

export function formatDate(date) {
  return date.toISOString().split('T')[0];
}

export function formatTime(time) {
  if (!time) return '';
  const [h, m] = time.split(':');
  const hour = parseInt(h, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const display = hour % 12 || 12;
  return `${display}:${m} ${ampm}`;
}

export function getCalendarDays(year, month) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const daysInPrevMonth = getDaysInMonth(year, month - 1);
  const days = [];

  for (let i = firstDay - 1; i >= 0; i -= 1) {
    days.push({
      date: new Date(year, month - 1, daysInPrevMonth - i),
      isCurrentMonth: false,
      isPrevMonth: true,
    });
  }

  for (let i = 1; i <= daysInMonth; i += 1) {
    days.push({
      date: new Date(year, month, i),
      isCurrentMonth: true,
    });
  }

  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i += 1) {
    days.push({
      date: new Date(year, month + 1, i),
      isCurrentMonth: false,
      isNextMonth: true,
    });
  }

  return days;
}

export function getEventsForDate(events, date) {
  return events
    .filter((ev) => isSameDay(new Date(ev.date), date))
    .sort((a, b) => (a.time || '').localeCompare(b.time || ''));
}

export function getUpcomingEvents(events, count = 10) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  return events
    .filter((ev) => new Date(ev.date) >= now)
    .sort((a, b) => {
      const dateComp = new Date(a.date) - new Date(b.date);
      if (dateComp !== 0) return dateComp;
      return (a.time || '').localeCompare(b.time || '');
    })
    .slice(0, count);
}

export function getRelativeDateLabel(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);

  const diffDays = Math.round((target - today) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays === -1) return 'Yesterday';
  if (diffDays > 1 && diffDays <= 7) return `In ${diffDays} days`;

  return target.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}
