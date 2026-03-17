import React from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import EventModal from './EventModal';
import Sidebar from './Sidebar';

export default function AppLayout({
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
}) {
  return (
    <div className="app">
      <Sidebar
        events={events}
        currentDate={currentDate}
        isOpen={sidebarOpen}
        onEventClick={(event) => {
          setEditingEvent(event);
          setSelectedDate(new Date(event.date));
          setModalOpen(true);
        }}
        onDateNavigate={(date) => setCurrentDate(date)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className={`main-content ${!sidebarOpen ? 'expanded' : ''}`}>
        <CalendarHeader
          currentDate={currentDate}
          onPrev={goToPrevMonth}
          onNext={goToNextMonth}
          onToday={goToToday}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
        />
        <CalendarGrid
          currentDate={currentDate}
          events={events}
          onDayClick={handleDayClick}
          onEventClick={handleEventClick}
        />
      </main>

      {modalOpen && (
        <EventModal
          date={selectedDate}
          event={editingEvent}
          onSave={handleSaveEvent}
          onDelete={handleDeleteEvent}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
