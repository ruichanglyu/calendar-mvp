import React from 'react';
import { MONTH_NAMES } from '../utils/dateUtils';

export default function CalendarHeader({
  currentDate,
  onPrev,
  onNext,
  onToday,
  onToggleSidebar,
  sidebarOpen,
}) {
  const month = MONTH_NAMES[currentDate.getMonth()];
  const year = currentDate.getFullYear();

  return (
    <header className="calendar-header">
      <div className="header-left">
        <button
          className="btn-icon sidebar-toggle"
          onClick={onToggleSidebar}
          title="Toggle sidebar"
        >
          {sidebarOpen ? '◀' : '▶'}
        </button>

        <h1 className="header-title">
          {month} <span className="header-year">{year}</span>
        </h1>
      </div>

      <div className="header-nav">
        <button className="btn-today" onClick={onToday}>
          Today
        </button>

        <div className="nav-arrows">
          <button className="btn-icon" onClick={onPrev} title="Previous month">
            ‹
          </button>
          <button className="btn-icon" onClick={onNext} title="Next month">
            ›
          </button>
        </div>
      </div>

      <style>{`
        .calendar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 28px;
          border-bottom: 1px solid var(--border);
          background: var(--bg-secondary);
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .sidebar-toggle {
          font-size: 12px;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-tertiary);
          color: var(--text-secondary);
          border-radius: var(--radius-sm);
        }

        .sidebar-toggle:hover {
          background: var(--bg-hover);
          color: var(--text-primary);
        }

        .header-title {
          font-size: 24px;
          font-weight: 700;
          letter-spacing: -0.5px;
        }

        .header-year {
          color: var(--text-muted);
          font-weight: 400;
        }

        .header-nav {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .btn-today {
          padding: 8px 20px;
          background: var(--accent);
          color: white;
          border-radius: var(--radius-sm);
          font-size: 14px;
          font-weight: 600;
        }

        .btn-today:hover {
          background: var(--accent-hover);
          transform: translateY(-1px);
        }

        .nav-arrows {
          display: flex;
          gap: 4px;
        }

        .btn-icon {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-tertiary);
          color: var(--text-primary);
          border-radius: var(--radius-sm);
          font-size: 20px;
          font-weight: 600;
        }

        .btn-icon:hover {
          background: var(--bg-hover);
          transform: translateY(-1px);
        }

        @media (max-width: 600px) {
          .calendar-header {
            padding: 14px 16px;
          }

          .header-title {
            font-size: 18px;
          }
        }
      `}</style>
    </header>
  );
}
