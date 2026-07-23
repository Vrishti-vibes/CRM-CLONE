import React, { useState } from 'react';
import {
  FiChevronLeft,
  FiChevronRight,
  FiPhone,
  FiVideo,
  FiCheckSquare,
} from 'react-icons/fi';

export default function CalendarView({ tasks }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const getTypeIcon = (type) => {
    switch (type) {
      case 'CALL':
        return <FiPhone className="w-3 h-3 text-sky-400 shrink-0" />;
      case 'MEETING':
        return <FiVideo className="w-3 h-3 text-purple-400 shrink-0" />;
      default:
        return <FiCheckSquare className="w-3 h-3 text-emerald-400 shrink-0" />;
    }
  };

  const renderCalendarDays = () => {
    const days = [];
    // Empty slots before first day
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="bg-slate-900/40 border border-slate-800/40 min-h-[100px] p-2"
        />
      );
    }

    // Actual calendar days
    for (let day = 1; day <= daysInMonth; day++) {
      const dayTasks = tasks.filter((t) => {
        if (!t.due_date) return false;
        const d = new Date(t.due_date);
        return (
          d.getDate() === day &&
          d.getMonth() === month &&
          d.getFullYear() === year
        );
      });

      const isToday =
        day === new Date().getDate() &&
        month === new Date().getMonth() &&
        year === new Date().getFullYear();

      days.push(
        <div
          key={day}
          className={`bg-slate-900/90 border border-slate-800 min-h-[100px] p-2 flex flex-col justify-between transition-colors ${
            isToday ? 'ring-1 ring-brand-500 bg-slate-900' : ''
          }`}
        >
          <div className="flex justify-between items-center mb-1">
            <span
              className={`text-xs font-bold ${
                isToday
                  ? 'w-5 h-5 rounded-full bg-brand-600 text-white flex items-center justify-center'
                  : 'text-slate-400'
              }`}
            >
              {day}
            </span>
            {dayTasks.length > 0 && (
              <span className="text-[10px] text-brand-400 font-bold">
                {dayTasks.length}
              </span>
            )}
          </div>

          <div className="space-y-1 overflow-y-auto max-h-[70px]">
            {dayTasks.map((task) => (
              <div
                key={task.id}
                className="p-1 rounded bg-slate-800 border border-slate-700/60 text-[10px] text-slate-200 flex items-center gap-1 truncate"
                title={task.title}
              >
                {getTypeIcon(task.type)}
                <span className="truncate">{task.title}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">
          {monthNames[month]} {year}
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={prevMonth}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <FiChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextMonth}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <FiChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Weekday Labels */}
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold uppercase tracking-wider text-slate-400">
        <span>Sun</span>
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1">{renderCalendarDays()}</div>
    </div>
  );
}