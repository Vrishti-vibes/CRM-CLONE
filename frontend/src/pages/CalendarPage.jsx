import React, { useEffect, useState } from 'react';
import { taskService } from '../services/taskService';
import CalendarView from '../components/calendar/CalendarView';
import { FiCalendar } from 'react-icons/fi';

export default function CalendarPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await taskService.getTasks();
        setTasks(res.items);
      } catch (err) {
        console.error('Failed to load calendar events:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Bar */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
          <FiCalendar className="text-brand-500" />
          <span>Interactive Calendar</span>
        </h1>
        <p className="text-slate-400 text-xs mt-1">
          Visual monthly schedule of scheduled tasks, customer calls, and deal review meetings
        </p>
      </div>

      {loading ? (
        <div className="h-96 flex items-center justify-center text-slate-400 font-medium">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
            <span>Loading Calendar Schedule...</span>
          </div>
        </div>
      ) : (
        <CalendarView tasks={tasks} />
      )}
    </div>
  );
}