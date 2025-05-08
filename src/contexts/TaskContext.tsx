"use client";

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { Task } from '@/types';
import { useToast } from "@/hooks/use-toast";

interface TaskContextType {
  tasks: Task[];
  addTask: (text: string) => void;
  deleteTask: (id: string) => void;
  clearTaskAnimationFlags: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { toast } = useToast();

  const addTask = useCallback((text: string) => {
    if (!text.trim()) {
      toast({
        title: "Cannot Add Task",
        description: "Task text cannot be empty.",
        variant: "destructive",
      });
      return;
    }
    const newTask: Task = { id: crypto.randomUUID(), text, isNew: true };
    setTasks(prevTasks => [newTask, ...prevTasks]);
    toast({
      title: "Task Added",
      description: `"${text}" has been added to your list.`,
    });
  }, [toast]);

  const deleteTask = useCallback((id: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, isFadingOut: true } : task
      )
    );

    // Actual removal after animation
    setTimeout(() => {
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
      // Find the task text for the toast message before it's fully removed
      const deletedTask = tasks.find(task => task.id === id);
      if (deletedTask) {
        toast({
          title: "Task Deleted",
          description: `"${deletedTask.text}" has been removed.`,
        });
      }
    }, 300); // Corresponds to animation duration
  }, [tasks, toast]); // Added tasks to dependency array for correct toast message

  const clearTaskAnimationFlags = useCallback((id: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, isNew: undefined } : task
      )
    );
  }, []);


  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, clearTaskAnimationFlags }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
}
