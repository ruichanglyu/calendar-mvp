import React from 'react';
import DayCell from './DayCell';
import {
  DAY_NAMES,
  getCalendarDays,
  getEventsForDate,
} from '../utils/dateUtils';

export default function CalendarGrid({
  currentDate,
  events,
  onDayClick,
  onEventClick,
}) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const days = getCalendarDays(year, month);

  return (
    <div className="calendar-grid-wrapper">
      <div className="calendar-day-names">
        {DAY_NAMES.map((day) => (
          <div key={day} className="day-name">
            {day}
          </div>
        ))}
      </div>

      <div className="calendar-grid">
        {days.map((dayInfo, idx) => (
          <DayCell
            key={`${dayInfo.date.toISOString()}-${idx}`}
            dayInfo={dayInfo}
            events={getEventsForDate(events, dayInfo.date)}
            onClick={() => onDayClick(dayInfo.date)}
            onEventClick={onEventClick}
          />
        ))}
      </div>

      <style>{`
        .calendar-grid-wrapper {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background: var(--bg-primary);
        }

        .calendar-day-names {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          border-bottom: 1px solid var(--border);
          background: var(--bg-secondary);
        }

        .day-name {
          padding: 12px;
          text-align: center;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--text-muted);
        }

        .calendar-grid {
          flex: 1;
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          grid-template-rows: repeat(6, 1fr);
          gap: 1px;
          background: var(--border);
        }
      `}</style>
    </div>
  );
}
