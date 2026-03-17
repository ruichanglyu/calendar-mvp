import React from 'react';
import EventItem from './EventItem';
import { getRelativeDateLabel, getUpcomingEvents } from '../utils/dateUtils';

export default function Sidebar({
  events,
  currentDate,
  isOpen,
  onEventClick,
  onDateNavigate,
  searchQuery,
  onSearchChange,
}) {
  const upcoming = getUpcomingEvents(events, 15);

  const filteredEvents = searchQuery
    ? events
        .filter(
          (ev) =>
            ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ev.description?.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 20)
    : null;

  const displayEvents = filteredEvents || upcoming;

  const grouped = displayEvents.reduce((acc, ev) => {
    const label = getRelativeDateLabel(ev.date);
    if (!acc[label]) acc[label] = [];
    acc[label].push(ev);
    return acc;
  }, {});

  const today = new Date();
  const stats = {
    total: events.length,
    thisMonth: events.filter((ev) => {
      const d = new Date(ev.date);
      return (
        d.getMonth() === today.getMonth() &&
        d.getFullYear() === today.getFullYear()
      );
    }).length,
    today: events.filter((ev) => {
      const d = new Date(ev.date);
      return (
        d.getDate() === today.getDate() &&
        d.getMonth() === today.getMonth() &&
        d.getFullYear() === today.getFullYear()
      );
    }).length,
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <span className="logo-icon">📅</span>
          <h2 className="logo-text">Calendar</h2>
        </div>
      </div>

      <div className="sidebar-stats">
        <button
          className="stat-item"
          type="button"
          onClick={() =>
            onDateNavigate(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1))
          }
        >
          <span className="stat-value">{stats.today}</span>
          <span className="stat-label">Today</span>
        </button>
        <button
          className="stat-item"
          type="button"
          onClick={() =>
            onDateNavigate(new Date(today.getFullYear(), today.getMonth(), 1))
          }
        >
          <span className="stat-value">{stats.thisMonth}</span>
          <span className="stat-label">This Month</span>
        </button>
        <div className="stat-item">
          <span className="stat-value">{stats.total}</span>
          <span className="stat-label">Total</span>
        </div>
      </div>

      <div className="sidebar-search">
        <input
          type="text"
          className="search-input"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchQuery && (
          <button className="search-clear" onClick={() => onSearchChange('')}>
            ✕
          </button>
        )}
      </div>

      <div className="sidebar-events">
        <h3 className="sidebar-section-title">
          {searchQuery ? `Results (${displayEvents.length})` : 'Upcoming'}
        </h3>

        {displayEvents.length === 0 && (
          <div className="empty-state">
            <span className="empty-icon">{searchQuery ? '🔍' : '🎉'}</span>
            <p className="empty-text">{searchQuery ? 'No events found' : 'No upcoming events'}</p>
            <p className="empty-hint">
              {searchQuery ? 'Try a different search' : 'Click on a day to add one'}
            </p>
          </div>
        )}

        {Object.entries(grouped).map(([dateLabel, evts]) => (
          <div key={dateLabel} className="event-group">
            <div className="event-group-label">{dateLabel}</div>
            <div className="event-group-list">
              {evts.map((ev) => (
                <EventItem key={ev.id} event={ev} onClick={() => onEventClick(ev)} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .sidebar {
          width: 300px;
          background: var(--bg-secondary);
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transition: width 0.25s ease, opacity 0.25s ease;
          flex-shrink: 0;
        }

        .sidebar.closed {
          width: 0;
          border-right: none;
          opacity: 0;
          pointer-events: none;
        }

        .sidebar-header {
          padding: 20px;
          border-bottom: 1px solid var(--border);
        }

        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .logo-icon {
          font-size: 24px;
        }

        .logo-text {
          font-size: 18px;
          font-weight: 700;
          letter-spacing: -0.3px;
        }

        .sidebar-stats {
          display: flex;
          padding: 16px 20px;
          gap: 12px;
          border-bottom: 1px solid var(--border);
        }

        .stat-item {
          flex: 1;
          text-align: center;
          padding: 8px;
          background: var(--bg-tertiary);
          border-radius: var(--radius-sm);
          color: inherit;
        }

        button.stat-item:hover {
          background: var(--bg-hover);
        }

        .stat-value {
          display: block;
          font-size: 20px;
          font-weight: 700;
          color: var(--accent);
        }

        .stat-label {
          display: block;
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-muted);
          margin-top: 2px;
        }

        .sidebar-search {
          padding: 16px 20px;
          position: relative;
        }

        .search-input {
          width: 100%;
          padding: 10px 36px 10px 14px;
          background: var(--bg-tertiary);
          color: var(--text-primary);
          border: 2px solid transparent;
          border-radius: var(--radius-sm);
          font-size: 13px;
        }

        .search-input:focus {
          border-color: var(--accent);
          background: var(--bg-primary);
        }

        .search-input::placeholder {
          color: var(--text-muted);
        }

        .search-clear {
          position: absolute;
          right: 28px;
          top: 50%;
          transform: translateY(-50%);
          width: 22px;
          height: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-hover);
          color: var(--text-muted);
          border-radius: 4px;
          font-size: 10px;
        }

        .search-clear:hover {
          background: var(--danger);
          color: white;
        }

        .sidebar-events {
          flex: 1;
          overflow-y: auto;
          padding: 0 20px 20px;
        }

        .sidebar-section-title {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--text-muted);
          margin-bottom: 12px;
        }

        .event-group {
          margin-bottom: 16px;
        }

        .event-group-label {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 8px;
          padding-left: 4px;
        }

        .event-group-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .empty-state {
          text-align: center;
          padding: 32px 16px;
        }

        .empty-icon {
          font-size: 40px;
          display: block;
          margin-bottom: 12px;
        }

        .empty-text {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .empty-hint {
          font-size: 12px;
          color: var(--text-muted);
          margin-top: 4px;
        }

        @media (max-width: 768px) {
          .sidebar {
            position: fixed;
            z-index: 100;
            height: 100vh;
            box-shadow: var(--shadow);
          }

          .sidebar.closed {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </aside>
  );
}
