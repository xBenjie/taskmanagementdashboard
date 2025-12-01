import React from 'react';
import { BarChart3, Calendar, Users, Kanban } from 'lucide-react';
import { useTaskStore } from '../store/taskStore';

interface SidebarProps {
  activeView: 'board' | 'analytics';
  onViewChange: (view: 'board' | 'analytics') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const tasks = useTaskStore((state) => state.tasks);
  
  // Calculate real-time stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'done').length;
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length;
  const overdueTasks = tasks.filter(task => 
    task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'done'
  ).length;

  const menuItems = [
    { id: 'board' as const, label: 'Task Board', icon: Kanban },
    { id: 'analytics' as const, label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-300 h-screen">
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeView === item.id
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200 mt-8">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Stats</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Total Tasks</span>
            <span className="font-medium text-gray-900">{totalTasks}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Completed</span>
            <span className="font-medium text-green-600">{completedTasks}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">In Progress</span>
            <span className="font-medium text-blue-600">{inProgressTasks}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Overdue</span>
            <span className="font-medium text-red-600">{overdueTasks}</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;