"use client";

import { useTasks } from "@/contexts/TaskContext";
import TaskItem from "./TaskItem";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ListChecks } from "lucide-react";

export default function TaskList() {
  const { tasks } = useTasks();

  if (tasks.filter(task => !task.isFadingOut).length === 0) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">Your Tasks</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-muted-foreground py-10">
          <ListChecks className="mx-auto mb-4 h-12 w-12 text-primary/50" />
          <p className="text-lg font-medium">No tasks yet!</p>
          <p>Add a task above to get started.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">Your Tasks</CardTitle>
        <CardDescription>Here's what you need to do.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
