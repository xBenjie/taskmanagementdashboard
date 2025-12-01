import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import Header from './components/Header';
import TaskBoard from './components/TaskBoard';
import Sidebar from './components/Sidebar';
import Analytics from './components/Analytics';
import { useTaskStore } from './store/taskStore';
import { TaskStatus } from './types';

const queryClient = new QueryClient();

function App() {
  const { moveTask, setCurrentUser, users } = useTaskStore();
  const [activeView, setActiveView] = React.useState<'board' | 'analytics'>('board');

  useEffect(() => {
    // Set the first user as current user for demo
    if (users.length > 0) {
      setCurrentUser(users[0]);
    }
  }, [users, setCurrentUser]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as TaskStatus;
    
    // Only move if dropping on a different column
    const draggedTask = active.data.current?.task;
    if (draggedTask && draggedTask.status !== newStatus) {
      moveTask(taskId, newStatus);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="flex">
          <Sidebar activeView={activeView} onViewChange={setActiveView} />
          <main className="flex-1 p-6 max-w-none">
            <DndContext onDragEnd={handleDragEnd}>
              {activeView === 'board' ? <TaskBoard /> : <Analytics />}
            </DndContext>
          </main>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;