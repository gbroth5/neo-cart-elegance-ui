
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTask } from "@/context/TaskContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Priority, Status, Task } from "@/types/task";
import { motion } from "framer-motion";
import { CheckCircle, Clock, Plus, Tag, Trello } from "lucide-react";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  const { user } = useAuth();
  const { board } = useTask();
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
    high: 0,
  });

  useEffect(() => {
    const tasks = Object.values(board.tasks);
    const completed = tasks.filter(task => task.status === "done").length;
    const inProgress = tasks.filter(task => task.status === "inProgress").length;
    const high = tasks.filter(task => task.priority === "high").length;

    setStats({
      total: tasks.length,
      completed,
      inProgress,
      high,
    });
  }, [board]);

  const getRecentTasks = () => {
    return Object.values(board.tasks)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);
  };

  const recentTasks = getRecentTasks();

  const getPriorityClass = (priority: Priority) => {
    switch (priority) {
      case "high":
        return "bg-red-500/20 text-red-500";
      case "medium":
        return "bg-yellow-500/20 text-yellow-500";
      case "low":
        return "bg-green-500/20 text-green-500";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusClass = (status: Status) => {
    switch (status) {
      case "done":
        return "bg-green-500/20 text-green-500";
      case "inProgress":
        return "bg-blue-500/20 text-blue-500";
      case "review":
        return "bg-purple-500/20 text-purple-500";
      case "todo":
        return "bg-gray-500/20 text-gray-500";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const statCards = [
    {
      title: "Total Tasks",
      value: stats.total,
      description: "All tasks in your board",
      color: "blue",
      icon: Tag,
    },
    {
      title: "In Progress",
      value: stats.inProgress,
      description: "Tasks currently being worked on",
      color: "yellow",
      icon: Clock,
    },
    {
      title: "Completed",
      value: stats.completed,
      description: "Tasks that have been finished",
      color: "green",
      icon: CheckCircle,
    },
    {
      title: "High Priority",
      value: stats.high,
      description: "Tasks that need immediate attention",
      color: "red",
      icon: Tag,
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user?.name}</h1>
          <p className="text-muted-foreground mt-1">
            Here's an overview of your tasks and progress
          </p>
        </div>
        <Button asChild>
          <Link to="/kanban">
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Link>
        </Button>
      </div>

      <motion.div 
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" 
        variants={container}
        initial="hidden"
        animate="show"
      >
        {statCards.map((card) => (
          <motion.div key={card.title} variants={item}>
            <Card className="animate-hover">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{card.title}</CardTitle>
                  <div className={`p-2 rounded-full bg-${card.color}-500/20`}>
                    <card.icon className={`h-5 w-5 text-${card.color}-500`} />
                  </div>
                </div>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{card.value}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Tasks</CardTitle>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/tasks">
                    View All
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTasks.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">
                    No tasks yet. Create your first task!
                  </p>
                ) : (
                  recentTasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between border-b border-border pb-2 last:border-0"
                    >
                      <div className="flex flex-col">
                        <span>{task.title}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(task.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${getPriorityClass(
                            task.priority
                          )}`}
                        >
                          {task.priority}
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${getStatusClass(
                            task.status
                          )}`}
                        >
                          {task.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Quick Actions</CardTitle>
                <Trello className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button asChild className="w-full justify-start">
                  <Link to="/kanban">
                    <Trello className="mr-2 h-4 w-4" />
                    Go to Kanban Board
                  </Link>
                </Button>
                <Button variant="outline" asChild className="w-full justify-start">
                  <Link to="/tasks">
                    <Tag className="mr-2 h-4 w-4" />
                    View All Tasks
                  </Link>
                </Button>
                <Button variant="secondary" asChild className="w-full justify-start">
                  <Link to="/profile">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    View Completed Tasks
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
