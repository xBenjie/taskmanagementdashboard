import { create } from 'zustand';
import { Task, User, Project, TaskStatus, TaskPriority } from '../types';

interface TaskStore {
  // State
  tasks: Task[];
  users: User[];
  currentUser: User | null;
  selectedProject: Project | null;
  
  // Actions
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  moveTask: (taskId: string, newStatus: TaskStatus) => void;
  setCurrentUser: (user: User) => void;
  setSelectedProject: (project: Project) => void;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  // Initial state
  tasks: [
    {
      id: '1',
      title: 'Setup project structure',
      description: 'Initialize the React project with all necessary dependencies',
      status: 'done',
      priority: 'high',
      assigneeId: '1',
      createdBy: '1',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-16'),
      tags: ['frontend', 'setup'],
      comments: [],
    },
    {
      id: '2',
      title: 'Design task management UI',
      description: 'Create wireframes and mockups for the task management interface',
      status: 'in-progress',
      priority: 'medium',
      assigneeId: '2',
      createdBy: '1',
      createdAt: new Date('2024-01-16'),
      updatedAt: new Date('2024-01-17'),
      dueDate: new Date('2024-01-25'),
      tags: ['design', 'ui'],
      comments: [],
    },
    {
      id: '3',
      title: 'Implement drag and drop',
      description: 'Add drag and drop functionality for task management',
      status: 'todo',
      priority: 'high',
      assigneeId: '1',
      createdBy: '2',
      createdAt: new Date('2024-01-17'),
      updatedAt: new Date('2024-01-17'),
      tags: ['frontend', 'interaction'],
      comments: [],
    },
    {
      id: '4',
      title: 'Setup analytics dashboard',
      description: 'Create charts and metrics for project insights',
      status: 'review',
      priority: 'low',
      assigneeId: '2',
      createdBy: '1',
      createdAt: new Date('2024-01-18'),
      updatedAt: new Date('2024-01-19'),
      tags: ['analytics', 'charts'],
      comments: [],
    },
  ],
  
  users: [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'member',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
    },
  ],
  
  currentUser: null,
  selectedProject: null,

  // Actions
  addTask: (taskData) => {
    const newTask: Task = {
      ...taskData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    set((state) => ({ tasks: [...state.tasks, newTask] }));
  },

  updateTask: (taskId, updates) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId
          ? { ...task, ...updates, updatedAt: new Date() }
          : task
      ),
    }));
  },

  deleteTask: (taskId) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    }));
  },

  moveTask: (taskId, newStatus) => {
    get().updateTask(taskId, { status: newStatus });
  },

  setCurrentUser: (user) => set({ currentUser: user }),
  
  setSelectedProject: (project) => set({ selectedProject: project }),
}));