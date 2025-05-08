"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, Zap } from "lucide-react";

export default function Header() {
  const { isAuthenticated, username, logout } = useAuth();

  return (
    <header className="border-b border-border/60 bg-card shadow-sm">
      <div className="container mx-auto flex max-w-5xl items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Zap className="h-7 w-7 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight text-foreground">TaskMaster</h1>
        </div>
        {isAuthenticated && username && (
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Welcome, <span className="font-medium text-foreground">{username}</span>!
            </span>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
