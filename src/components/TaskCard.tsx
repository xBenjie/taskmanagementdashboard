import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Calendar, MessageCircle, User } from 'lucide-react';
import { Task, TaskPriority } from '../types';
import { useTaskStore } from '../store/taskStore';

interface TaskCardProps {
  task: Task;
}

const priorityColors: Record<TaskPriority, string> = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-orange-100 text-orange-800',
  urgent: 'bg-red-100 text-red-800',
};

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const users = useTaskStore((state) => state.users);
  const assignee = users.find(user => user.id === task.assigneeId);
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: task.id,
    data: {
      type: 'task',
      task,
    },
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`card p-4 cursor-grab hover:shadow-lg transition-shadow ${
        isDragging ? 'opacity-50 rotate-3 scale-105 z-50' : ''
      }`}
      {...attributes}
      {...listeners}
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-gray-900 text-sm leading-tight">
          {task.title}
        </h4>
        <span
          className={`px-2 py-1 text-xs rounded-full ${priorityColors[task.priority]}`}
        >
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {task.description}
        </p>
      )}

      {task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {task.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between text-gray-500 text-sm">
        <div className="flex items-center space-x-3">
          {task.dueDate && (
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>{new Date(task.dueDate).toLocaleDateString()}</span>
            </div>
          )}
          
          {task.comments.length > 0 && (
            <div className="flex items-center space-x-1">
              <MessageCircle className="w-3 h-3" />
              <span>{task.comments.length}</span>
            </div>
          )}
        </div>

        {assignee && (
          <div className="flex items-center space-x-1">
            <div className="w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
              {assignee.avatar ? (
                <img
                  src={assignee.avatar}
                  alt={assignee.name}
                  className="w-5 h-5 rounded-full"
                />
              ) : (
                <User className="w-3 h-3 text-white" />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;