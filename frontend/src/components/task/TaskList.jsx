import { ClipboardCheck, Search } from "lucide-react";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import TaskCard from "./TaskCard";

const TaskList = ({ tasks, isLoading, onEdit, onStatusChange }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTasks = tasks.filter(task=>{
    const matchesTitle = task.title.toLowerCase().includes(searchTerm.toLowerCase()) || (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesTitle;
  })

    const getTaskStats = () => {

        const AllTasksByStatus = {
            pending: tasks.filter(task => task.status === 'pending').length,
            inProgress: tasks.filter(task => task.status === 'in progress').length,
            completed: tasks.filter(task => task.status === 'completed').length
        }

        const categorizedTasks = {
            all: filteredTasks,
            pending: filteredTasks.filter(task => task.status === 'pending'),
            inProgress: filteredTasks.filter(task => task.status === 'in progress'),
            completed: filteredTasks.filter(task => task.status === 'completed')
        }

        const stats = {
            total: tasks.length,
            pending: AllTasksByStatus.pending,
            inProgress: AllTasksByStatus.inProgress,
            completed: AllTasksByStatus.completed
        }

        const total = tasks.length;

        return { total, stats, categorizedTasks };
    }


    const { stats, categorizedTasks } = getTaskStats();

  // Task grid component
  const TaskGrid = ({ tasks, emptyMessage }) => {
    if (tasks.length == 0) {
      return (
        <div className="text-center py-12">
          <div className="mx-auto max-w-md">
            <ClipboardCheck className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-sm font-medium text-foreground">
              No tasks found
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">{emptyMessage}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {
          tasks.map(task => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={onEdit}
              onStatusChange={onStatusChange}
              isLoading={isLoading}
            />
          ))
        }
      </div>
    )
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card p-4 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">Total</p>
            <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>

        <div className="bg-card p-4 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">Pending</p>
            <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
          </div>
          <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
        </div>

        <div className="bg-card p-4 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              In Progress
            </p>
            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
          </div>
          <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
        </div>

        <div className="bg-card p-4 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              Completed
            </p>
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
          </div>
          <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
        </div>
      </div>

      {/* search input */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2  h-4 w-4 text-muted-foreground transform -translate-y-1/2" />

          <Input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="tasks" className="w-full">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="all">
            All
            <Badge variant="secondary">{stats.total}</Badge>
          </TabsTrigger>
          <TabsTrigger value="pending">
            Pending
            <Badge variant="secondary">{stats.pending}</Badge>
          </TabsTrigger>
          <TabsTrigger value="in progress">
            In progress
            <Badge variant="secondary">{stats.inProgress}</Badge>
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed
            <Badge variant="secondary">{stats.completed}</Badge>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <TaskGrid
            tasks={categorizedTasks.all}
            emptyMessage={"No tasks found"}
          />
        </TabsContent>
        <TabsContent value="pending">
          <TaskGrid
            tasks={categorizedTasks.pending}
            emptyMessage={"No pending tasks found"}
          />
        </TabsContent>
        <TabsContent value="in progress">
          <TaskGrid
            tasks={categorizedTasks.inProgress}
            emptyMessage={"No in progress tasks found"}
          />
        </TabsContent>
        <TabsContent value="completed">
          <TaskGrid
            tasks={categorizedTasks.completed}
            emptyMessage={"No completed tasks found"}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaskList;
