
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Board, Status, Task, Priority } from "@/types/task";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

// Mock initial data for demo purposes
const mockTasks: { [key: string]: Task } = {
  "task-1": {
    id: "task-1",
    title: "Create new design system",
    description: "Implement the new design system for our product",
    priority: "high",
    status: "todo",
    createdAt: new Date().toISOString(),
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ["design", "ui"],
  },
  "task-2": {
    id: "task-2",
    title: "API Integration",
    description: "Integrate the new API endpoints with the frontend",
    priority: "medium",
    status: "inProgress",
    createdAt: new Date().toISOString(),
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ["backend", "api"],
  },
  "task-3": {
    id: "task-3",
    title: "Fix login bug",
    description: "Users cannot login using social providers",
    priority: "high",
    status: "inProgress",
    createdAt: new Date().toISOString(),
    tags: ["bug", "auth"],
  },
  "task-4": {
    id: "task-4",
    title: "Write documentation",
    description: "Create comprehensive documentation for devs",
    priority: "low",
    status: "todo",
    createdAt: new Date().toISOString(),
    tags: ["docs"],
  },
  "task-5": {
    id: "task-5",
    title: "Update dependencies",
    description: "Update all npm packages to latest versions",
    priority: "medium",
    status: "done",
    createdAt: new Date().toISOString(),
    tags: ["maintenance"],
  },
  "task-6": {
    id: "task-6",
    title: "Code review",
    description: "Review PR for new feature implementation",
    priority: "medium",
    status: "review",
    createdAt: new Date().toISOString(),
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ["review"],
  }
};

const initialBoard: Board = {
  columns: {
    todo: {
      id: "todo",
      title: "To Do",
      taskIds: ["task-1", "task-4"],
    },
    inProgress: {
      id: "inProgress",
      title: "In Progress",
      taskIds: ["task-2", "task-3"],
    },
    review: {
      id: "review",
      title: "Review",
      taskIds: ["task-6"],
    },
    done: {
      id: "done",
      title: "Done",
      taskIds: ["task-5"],
    },
  },
  tasks: mockTasks,
};

interface TaskContextType {
  board: Board;
  addTask: (task: Omit<Task, "id" | "createdAt">) => void;
  updateTask: (task: Task) => void;
  deleteTask: (taskId: string) => void;
  moveTask: (taskId: string, source: Status, destination: Status) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [board, setBoard] = useState<Board>(initialBoard);

  useEffect(() => {
    // In a real app, you'd fetch this data from your API
    // For now, we'll use the mocked data
    setBoard(initialBoard);
  }, []);

  const addTask = (task: Omit<Task, "id" | "createdAt">) => {
    const newTaskId = uuidv4();
    const newTask: Task = {
      ...task,
      id: newTaskId,
      createdAt: new Date().toISOString(),
    };

    setBoard((prev) => {
      const newBoard = { ...prev };
      newBoard.tasks[newTaskId] = newTask;
      newBoard.columns[task.status].taskIds.push(newTaskId);
      return newBoard;
    });

    toast.success("Task created successfully!");
  };

  const updateTask = (task: Task) => {
    setBoard((prev) => {
      const oldStatus = Object.keys(prev.columns).find((columnId) =>
        prev.columns[columnId as Status].taskIds.includes(task.id)
      ) as Status;

      // If status changed, need to move between columns
      if (oldStatus !== task.status) {
        const newBoard = { ...prev };
        
        // Remove from old column
        newBoard.columns[oldStatus].taskIds = newBoard.columns[oldStatus].taskIds.filter(
          (id) => id !== task.id
        );
        
        // Add to new column
        newBoard.columns[task.status].taskIds.push(task.id);
        
        // Update task
        newBoard.tasks[task.id] = task;
        
        return newBoard;
      }

      // If status didn't change, just update the task
      return {
        ...prev,
        tasks: {
          ...prev.tasks,
          [task.id]: task,
        },
      };
    });

    toast.success("Task updated successfully!");
  };

  const deleteTask = (taskId: string) => {
    setBoard((prev) => {
      const newBoard = { ...prev };
      const status = Object.keys(prev.columns).find((columnId) =>
        prev.columns[columnId as Status].taskIds.includes(taskId)
      ) as Status;

      // Remove task from column
      newBoard.columns[status].taskIds = newBoard.columns[status].taskIds.filter(
        (id) => id !== taskId
      );

      // Remove task from tasks
      delete newBoard.tasks[taskId];

      return newBoard;
    });

    toast.success("Task deleted successfully!");
  };

  const moveTask = (taskId: string, source: Status, destination: Status) => {
    setBoard((prev) => {
      const newBoard = { ...prev };
      
      // Remove from source column
      newBoard.columns[source].taskIds = newBoard.columns[source].taskIds.filter(
        (id) => id !== taskId
      );
      
      // Add to destination column
      newBoard.columns[destination].taskIds.push(taskId);
      
      // Update task status
      newBoard.tasks[taskId] = {
        ...newBoard.tasks[taskId],
        status: destination,
      };
      
      return newBoard;
    });
  };

  return (
    <TaskContext.Provider value={{ board, addTask, updateTask, deleteTask, moveTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  
  if (context === undefined) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  
  return context;
};
