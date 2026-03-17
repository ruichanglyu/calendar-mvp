import React, { useEffect, useRef, useState } from 'react';
import {
  DAY_NAMES_FULL,
  EVENT_COLORS,
  MONTH_NAMES,
  formatDate,
} from '../utils/dateUtils';

export default function EventModal({ date, event, onSave, onDelete, onClose }) {
  const [title, setTitle] = useState(event?.title || '');
  const [description, setDescription] = useState(event?.description || '');
  const [time, setTime] = useState(event?.time || '');
  const [endTime, setEndTime] = useState(event?.endTime || '');
  const [color, setColor] = useState(event?.color || EVENT_COLORS[0].value);
  const [dateValue, setDateValue] = useState(formatDate(date));
  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      titleRef.current?.focus();
      return;
    }

    onSave({
      title: title.trim(),
      description: description.trim(),
      date: dateValue,
      time,
      endTime,
      color,
    });
  };

  const displayDate = new Date(`${dateValue}T00:00:00`);
  const dayName = DAY_NAMES_FULL[displayDate.getDay()];
  const monthName = MONTH_NAMES[displayDate.getMonth()];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">{event ? 'Edit Event' : 'New Event'}</h2>
            <p className="modal-date">
              {dayName}, {monthName} {displayDate.getDate()},{' '}
              {displayDate.getFullYear()}
            </p>
          </div>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label className="form-label">Title *</label>
            <input
              ref={titleRef}
              type="text"
              className="form-input"
              placeholder="Event name..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Date</label>
            <input
              type="date"
              className="form-input"
              value={dateValue}
              onChange={(e) => setDateValue(e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Start Time</label>
              <input
                type="time"
                className="form-input"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">End Time</label>
              <input
                type="time"
                className="form-input"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-input form-textarea"
              placeholder="Add details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              maxLength={500}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Color</label>
            <div className="color-picker">
              {EVENT_COLORS.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  className={`color-swatch ${color === c.value ? 'selected' : ''}`}
                  style={{ background: c.value }}
                  onClick={() => setColor(c.value)}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          <div className="modal-actions">
            {event && (
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => onDelete()}
              >
                Delete Event
              </button>
            )}
            <div className="modal-actions-right">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {event ? 'Save Changes' : 'Create Event'}
              </button>
            </div>
          </div>
        </form>

        <style>{`
          .modal-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(4px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            padding: 20px;
            animation: fadeIn 0.15s ease;
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px) scale(0.97); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }

          .modal {
            background: var(--bg-secondary);
            border-radius: var(--radius);
            width: 100%;
            max-width: 480px;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: var(--shadow);
            border: 1px solid var(--border);
            animation: slideUp 0.2s ease;
          }

          .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            padding: 24px 24px 0;
          }

          .modal-title {
            font-size: 20px;
            font-weight: 700;
          }

          .modal-date {
            font-size: 13px;
            color: var(--text-secondary);
            margin-top: 4px;
          }

          .modal-close {
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--bg-tertiary);
            color: var(--text-secondary);
            border-radius: var(--radius-sm);
            font-size: 14px;
          }

          .modal-close:hover {
            background: var(--danger);
            color: white;
          }

          .modal-form {
            padding: 20px 24px 24px;
            display: flex;
            flex-direction: column;
            gap: 18px;
          }

          .form-group {
            display: flex;
            flex-direction: column;
            gap: 6px;
            flex: 1;
          }

          .form-row {
            display: flex;
            gap: 12px;
          }

          .form-label {
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: var(--text-secondary);
          }

          .form-input {
            padding: 10px 14px;
            background: var(--bg-tertiary);
            color: var(--text-primary);
            border: 2px solid transparent;
            border-radius: var(--radius-sm);
            font-size: 14px;
            width: 100%;
          }

          .form-input:focus {
            border-color: var(--accent);
            background: var(--bg-primary);
          }

          .form-input::placeholder {
            color: var(--text-muted);
          }

          .form-textarea {
            resize: vertical;
            min-height: 80px;
          }

          .color-picker {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
          }

          .color-swatch {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            border: 3px solid transparent;
            transition: var(--transition);
          }

          .color-swatch:hover {
            transform: scale(1.15);
          }

          .color-swatch.selected {
            border-color: var(--text-primary);
            transform: scale(1.15);
            box-shadow: 0 0 0 2px var(--bg-secondary),
              0 0 12px rgba(108, 99, 255, 0.4);
          }

          .modal-actions {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 12px;
            margin-top: 6px;
          }

          .modal-actions-right {
            display: flex;
            gap: 8px;
            margin-left: auto;
          }

          .btn {
            padding: 10px 20px;
            border-radius: var(--radius-sm);
            font-size: 14px;
            font-weight: 600;
          }

          .btn-primary {
            background: var(--accent);
            color: white;
          }

          .btn-primary:hover {
            background: var(--accent-hover);
            transform: translateY(-1px);
          }

          .btn-secondary {
            background: var(--bg-tertiary);
            color: var(--text-secondary);
          }

          .btn-secondary:hover {
            background: var(--bg-hover);
            color: var(--text-primary);
          }

          .btn-danger {
            background: transparent;
            color: var(--danger);
          }

          .btn-danger:hover {
            background: var(--danger);
            color: white;
          }

          @media (max-width: 500px) {
            .modal {
              max-width: 100%;
            }

            .form-row {
              flex-direction: column;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
