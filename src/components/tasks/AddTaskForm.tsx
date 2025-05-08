"use client";

import { useState } from "react";
import { useTasks } from "@/contexts/TaskContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AddTaskForm() {
  const [taskText, setTaskText] = useState("");
  const { addTask } = useTasks();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskText.trim()) {
      addTask(taskText);
      setTaskText("");
    }
  };

  return (
    <Card className="mb-6 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">Add a New Task</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <Input
            type="text"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder="What needs to be done?"
            className="flex-grow"
            aria-label="New task description"
          />
          <Button type="submit" aria-label="Add task">
            <PlusCircle className="mr-2 h-5 w-5" />
            Add Task
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
