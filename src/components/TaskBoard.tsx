import React, { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import TaskCard from './TaskCard';
import AddTaskModal from './AddTaskModal';
import { useTaskStore } from '../store/taskStore';
import { TaskStatus } from '../types';
import { Plus } from 'lucide-react';

const TaskColumn: React.FC<{ status: TaskStatus; title: string; color: string }> = ({
  status,
  title,
  color,
}) => {
  const tasks = useTaskStore((state) => 
    state.tasks.filter((task) => task.status === status)
  );

  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  return (
    <div className={`bg-gray-200 rounded-lg p-4 min-h-[500px] transition-colors ${
      isOver ? 'bg-blue-50 ring-2 ring-blue-400' : ''
    }`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${color}`}></div>
          <h3 className="font-semibold text-gray-800">{title}</h3>
          <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs">
            {tasks.length}
          </span>
        </div>
      </div>

      <div ref={setNodeRef} className="space-y-3 min-h-[400px]">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        {tasks.length === 0 && (
          <div className="text-gray-400 text-center py-8 text-sm">
            Drop tasks here
          </div>
        )}
      </div>
    </div>
  );
};

const TaskBoard: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const columns = [
    { status: 'todo' as TaskStatus, title: 'To Do', color: 'bg-gray-400' },
    { status: 'in-progress' as TaskStatus, title: 'In Progress', color: 'bg-blue-400' },
    { status: 'review' as TaskStatus, title: 'Review', color: 'bg-yellow-400' },
    { status: 'done' as TaskStatus, title: 'Done', color: 'bg-green-400' },
  ];

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Task Board</h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="btn btn-primary flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Task</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {columns.map((column) => (
          <TaskColumn
            key={column.status}
            status={column.status}
            title={column.title}
            color={column.color}
          />
        ))}
      </div>

      <AddTaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};

export default TaskBoard;