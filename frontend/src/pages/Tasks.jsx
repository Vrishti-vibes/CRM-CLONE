import React, { useEffect, useState, useCallback } from 'react';
import { taskService } from '../services/taskService';
import TaskModal from '../components/tasks/TaskModal';
import {
  FiCheckSquare,
  FiPlus,
  FiPhone,
  FiVideo,
  FiClock,
  FiEdit2,
  FiTrash2,
  FiCheckCircle,
} from 'react-icons/fi';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState('');
  const [completedFilter, setCompletedFilter] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await taskService.getTasks({
        task_type: typeFilter || undefined,
        completed: completedFilter !== '' ? completedFilter === 'true' : undefined,
      });
      setTasks(res.items);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    } finally {
      setLoading(false);
    }
  }, [typeFilter, completedFilter]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCreateOrUpdate = async (formData) => {
    if (editingTask) {
      await taskService.updateTask(editingTask.id, formData);
    } else {
      await taskService.createTask(formData);
    }
    fetchTasks();
  };

  const handleToggle = async (id) => {
    try {
      await taskService.toggleTaskCompletion(id);
      fetchTasks();
    } catch (err) {
      console.error('Failed to toggle completion status:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task entry?')) {
      try {
        await taskService.deleteTask(id);
        fetchTasks();
      } catch (err) {
        console.error('Failed to delete task:', err);
      }
    }
  };

  const openCreateModal = () => {
    setEditingTask(null);
    setModalOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const getTypeBadge = (type) => {
    switch (type) {
      case 'CALL':
        return {
          icon: <FiPhone className="w-3.5 h-3.5" />,
          label: 'Call',
          color: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
        };
      case 'MEETING':
        return {
          icon: <FiVideo className="w-3.5 h-3.5" />,
          label: 'Meeting',
          color: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
        };
      default:
        return {
          icon: <FiCheckSquare className="w-3.5 h-3.5" />,
          label: 'Task',
          color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        };
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'URGENT':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      case 'HIGH':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      default:
        return 'bg-slate-700/50 text-slate-300 border-slate-600/50';
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <FiCheckSquare className="text-brand-500" />
            <span>Tasks, Calls & Meetings</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Organize scheduled sales activities and upcoming customer follow-ups ({tasks.length} items)
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-brand-600/30 transition-all self-start sm:self-auto"
        >
          <FiPlus className="w-4 h-4" />
          <span>Schedule Activity</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4 justify-between">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full sm:w-44 px-3 py-2 bg-slate-800/80 border border-slate-700/80 rounded-xl text-slate-200 text-xs focus:outline-none focus:border-brand-500"
          >
            <option value="">All Categories</option>
            <option value="TASK">Tasks Only</option>
            <option value="CALL">Calls Only</option>
            <option value="MEETING">Meetings Only</option>
          </select>

          <select
            value={completedFilter}
            onChange={(e) => setCompletedFilter(e.target.value)}
            className="w-full sm:w-44 px-3 py-2 bg-slate-800/80 border border-slate-700/80 rounded-xl text-slate-200 text-xs focus:outline-none focus:border-brand-500"
          >
            <option value="">All Statuses</option>
            <option value="false">Pending</option>
            <option value="true">Completed</option>
          </select>
        </div>
      </div>

      {/* Activities Grid */}
      <div className="space-y-3">
        {loading ? (
          <div className="h-64 flex items-center justify-center text-slate-400 text-xs font-medium">
            Loading scheduled activities...
          </div>
        ) : tasks.length === 0 ? (
          <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-2xl text-slate-500 text-xs font-medium">
            No activities scheduled matching criteria.
          </div>
        ) : (
          tasks.map((task) => {
            const badge = getTypeBadge(task.type);
            return (
              <div
                key={task.id}
                className={`p-4 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between gap-4 transition-all hover:border-slate-700 ${
                  task.completed ? 'opacity-50' : ''
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  <button
                    onClick={() => handleToggle(task.id)}
                    className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-colors shrink-0 ${
                      task.completed
                        ? 'bg-emerald-600 border-emerald-500 text-white'
                        : 'border-slate-700 bg-slate-800/60 hover:border-brand-500'
                    }`}
                  >
                    {task.completed && <FiCheckCircle className="w-4 h-4" />}
                  </button>

                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p
                        className={`text-sm font-bold text-white truncate ${
                          task.completed ? 'line-through text-slate-400' : ''
                        }`}
                      >
                        {task.title}
                      </p>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold border ${badge.color}`}
                      >
                        {badge.icon}
                        <span>{badge.label}</span>
                      </span>
                    </div>

                    {task.description && (
                      <p className="text-xs text-slate-400 truncate">{task.description}</p>
                    )}

                    {task.due_date && (
                      <p className="text-[11px] text-slate-500 flex items-center gap-1">
                        <FiClock className="w-3 h-3 text-slate-400" />
                        <span>Due: {new Date(task.due_date).toLocaleString()}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-md border ${getPriorityBadge(
                      task.priority
                    )}`}
                  >
                    {task.priority}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditModal(task)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                      title="Edit Activity"
                    >
                      <FiEdit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 transition-colors"
                      title="Delete Activity"
                    >
                      <FiTrash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Task Modal Form */}
      <TaskModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreateOrUpdate}
        initialData={editingTask}
      />
    </div>
  );
}