import React from 'react';
import { formatTime } from '../utils/dateUtils';

export default function EventItem({ event, compact, onClick, onDelete }) {
  if (compact) {
    return (
      <div
        className="event-item-compact"
        onClick={onClick}
        style={{ '--event-color': event.color || '#4a9eff' }}
      >
        <div className="event-dot" />
        <span className="event-title-compact">
          {event.time && (
            <span className="event-time-compact">{formatTime(event.time)} </span>
          )}
          {event.title}
        </span>

        <style>{`
          .event-item-compact {
            display: flex;
            align-items: center;
            gap: 4px;
            padding: 2px 6px;
            border-radius: 4px;
            cursor: pointer;
            transition: var(--transition);
            background: color-mix(in srgb, var(--event-color) 18%, transparent);
          }

          .event-item-compact:hover {
            background: color-mix(in srgb, var(--event-color) 30%, transparent);
          }

          .event-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: var(--event-color);
            flex-shrink: 0;
          }

          .event-title-compact {
            font-size: 11px;
            font-weight: 500;
            color: var(--text-primary);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .event-time-compact {
            color: var(--text-muted);
            font-size: 10px;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div
      className="event-item-full"
      onClick={onClick}
      style={{ '--event-color': event.color || '#4a9eff' }}
    >
      <div className="event-color-bar" />
      <div className="event-details">
        <div className="event-title-full">{event.title}</div>
        {event.time && <div className="event-time-full">{formatTime(event.time)}</div>}
        {event.description && (
          <div className="event-desc-full">{event.description}</div>
        )}
      </div>
      {onDelete && (
        <button
          className="event-delete-btn"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(event.id);
          }}
          title="Delete"
        >
          ✕
        </button>
      )}

      <style>{`
        .event-item-full {
          display: flex;
          align-items: stretch;
          gap: 12px;
          padding: 12px;
          background: var(--bg-tertiary);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: var(--transition);
          position: relative;
        }

        .event-item-full:hover {
          background: var(--bg-hover);
        }

        .event-color-bar {
          width: 4px;
          border-radius: 2px;
          background: var(--event-color);
          flex-shrink: 0;
        }

        .event-details {
          flex: 1;
          min-width: 0;
        }

        .event-title-full {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 2px;
        }

        .event-time-full {
          font-size: 12px;
          color: var(--text-secondary);
        }

        .event-desc-full {
          font-size: 12px;
          color: var(--text-muted);
          margin-top: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .event-delete-btn {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 22px;
          height: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          color: var(--text-muted);
          border-radius: 4px;
          font-size: 10px;
          opacity: 0;
          transition: var(--transition);
        }

        .event-item-full:hover .event-delete-btn {
          opacity: 1;
        }

        .event-delete-btn:hover {
          background: var(--danger);
          color: white;
        }
      `}</style>
    </div>
  );
}
