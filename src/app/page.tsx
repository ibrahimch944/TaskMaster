"use client";

import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/auth/LoginForm';
import AddTaskForm from '@/components/tasks/AddTaskForm';
import TaskList from '@/components/tasks/TaskList';
import Header from '@/components/layout/Header';

function AppContent() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-muted/30 p-4">
        <LoginForm />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="container mx-auto max-w-2xl flex-grow p-6"> {/* Increased padding for main content area */}
        <AddTaskForm />
        <TaskList />
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground border-t border-border/60">
        TaskMaster &copy; {new Date().getFullYear()} - Your Simple Task Manager
      </footer>
    </div>
  );
}

export default function Home() {
  // AuthProvider and TaskProvider are in RootLayout
  return <AppContent />;
}
