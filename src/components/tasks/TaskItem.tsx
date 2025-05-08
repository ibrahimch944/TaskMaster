"use client";

import type { Task } from "@/types";
import { useTasks } from "@/contexts/TaskContext";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface TaskItemProps {
  task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
  const { deleteTask, clearTaskAnimationFlags } = useTasks();
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (task.isNew && itemRef.current) {
      itemRef.current.classList.add('task-item-enter-active');
      const timer = setTimeout(() => {
        if (itemRef.current) {
          itemRef.current.classList.remove('task-item-enter-active');
        }
        clearTaskAnimationFlags(task.id);
      }, 300); // Animation duration
      return () => clearTimeout(timer);
    }
  }, [task.isNew, task.id, clearTaskAnimationFlags]);
  
  const handleDelete = () => {
    if (itemRef.current) {
        itemRef.current.classList.add('task-item-exit-active');
    }
    // The actual deletion logic (filtering from state) is handled in TaskContext after a timeout
    deleteTask(task.id); 
  };


  return (
    <div
      ref={itemRef}
      className={cn(
        "flex items-center justify-between rounded-lg border bg-card p-4 shadow-sm transition-all duration-300 ease-in-out",
        "overflow-hidden", // Necessary for max-height animation
        { 
          'opacity-0 scale-95 -translate-y-2 max-h-0 !py-0 !my-0 !border-0': task.isFadingOut && !itemRef.current?.classList.contains('task-item-exit-active'),
        }
      )}
      aria-live="polite" // Announces changes for screen readers
    >
      <p className="flex-grow text-foreground break-all">{task.text}</p>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleDelete}
        className="ml-4 text-muted-foreground hover:text-destructive"
        aria-label={`Delete task: ${task.text}`}
      >
        <Trash2 className="h-5 w-5" />
      </Button>
    </div>
  );
}
