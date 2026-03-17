import React, { useCallback, useEffect, useState } from 'react';
import AppLayout from './components/AppLayout';
import './App.css';

const STORAGE_KEY = 'calendar_mvp_events';

const loadEvents = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveEvents = (events) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
};

export default function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState(loadEvents);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    saveEvents(events);
  }, [events]);

  const goToPrevMonth = useCallback(() => {
    setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  }, []);

  const goToNextMonth = useCallback(() => {
    setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  }, []);

  const goToToday = useCallback(() => {
    setCurrentDate(new Date());
  }, []);

  const handleDayClick = useCallback((date) => {
    setSelectedDate(date);
    setEditingEvent(null);
    setModalOpen(true);
  }, []);

  const handleEventClick = useCallback((event, e) => {
    e.stopPropagation();
    setEditingEvent(event);
    setSelectedDate(new Date(event.date));
    setModalOpen(true);
  }, []);

  const handleSaveEvent = useCallback(
    (eventData) => {
      if (editingEvent) {
        setEvents((prev) =>
          prev.map((ev) =>
            ev.id === editingEvent.id ? { ...eventData, id: ev.id } : ev
          )
        );
      } else {
        setEvents((prev) => [
          ...prev,
          { ...eventData, id: Date.now().toString() },
        ]);
      }
      setModalOpen(false);
      setEditingEvent(null);
    },
    [editingEvent]
  );

  const handleDeleteEvent = useCallback(
    (eventId) => {
      const id = eventId || editingEvent?.id;
      if (id) {
        setEvents((prev) => prev.filter((ev) => ev.id !== id));
        setModalOpen(false);
        setEditingEvent(null);
      }
    },
    [editingEvent]
  );

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    setEditingEvent(null);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (modalOpen) return;
      if (e.key === 'ArrowLeft') goToPrevMonth();
      if (e.key === 'ArrowRight') goToNextMonth();
      if (e.key === 't' || e.key === 'T') goToToday();
      if (e.key === 'n' || e.key === 'N') handleDayClick(new Date());
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goToPrevMonth, goToNextMonth, goToToday, handleDayClick, modalOpen]);

  return React.createElement(AppLayout, {
    currentDate,
    events,
    modalOpen,
    selectedDate,
    editingEvent,
    sidebarOpen,
    searchQuery,
    setCurrentDate,
    setEditingEvent,
    setModalOpen,
    setSearchQuery,
    setSidebarOpen,
    setSelectedDate,
    handleCloseModal,
    handleDayClick,
    handleDeleteEvent,
    handleEventClick,
    handleSaveEvent,
    goToNextMonth,
    goToPrevMonth,
    goToToday,
  });
}
