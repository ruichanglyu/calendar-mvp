import React from 'react';
import EventItem from './EventItem';
import { isToday } from '../utils/dateUtils';

const MAX_VISIBLE = 3;

export default function DayCell({ dayInfo, events, onClick, onEventClick }) {
  const { date, isCurrentMonth } = dayInfo;
  const today = isToday(date);
  const dayNum = date.getDate();

  const visibleEvents = events.slice(0, MAX_VISIBLE);
  const moreCount = events.length - MAX_VISIBLE;

  return (
    <div
      className={`day-cell ${!isCurrentMonth ? 'other-month' : ''} ${
        today ? 'today' : ''
      }`}
      onClick={onClick}
    >
      <div className="day-number-wrapper">
        <span className={`day-number ${today ? 'today-badge' : ''}`}>
          {dayNum}
        </span>
      </div>

      <div className="day-events">
        {visibleEvents.map((event) => (
          <EventItem
            key={event.id}
            event={event}
            compact
            onClick={(e) => onEventClick(event, e)}
          />
        ))}
        {moreCount > 0 && <div className="more-events">+{moreCount} more</div>}
      </div>

      <style>{`
        .day-cell {
          background: var(--bg-primary);
          padding: 6px;
          min-height: 100px;
          cursor: pointer;
          transition: var(--transition);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .day-cell:hover {
          background: var(--bg-secondary);
        }

        .day-cell.other-month {
          opacity: 0.35;
        }

        .day-cell.today {
          background: var(--accent-light);
        }

        .day-cell.today:hover {
          background: rgba(108, 99, 255, 0.22);
        }

        .day-number-wrapper {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 4px;
        }

        .day-number {
          font-size: 13px;
          font-weight: 500;
          color: var(--text-secondary);
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }

        .day-number.today-badge {
          background: var(--accent);
          color: white;
          font-weight: 700;
        }

        .day-events {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
          overflow: hidden;
        }

        .more-events {
          font-size: 11px;
          color: var(--text-muted);
          padding: 2px 6px;
          font-weight: 500;
        }

        @media (max-width: 600px) {
          .day-cell {
            min-height: 60px;
            padding: 4px;
          }

          .day-number {
            font-size: 11px;
            width: 22px;
            height: 22px;
          }
        }
      `}</style>
    </div>
  );
}
