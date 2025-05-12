
import { useState } from "react";
import { useTask } from "@/context/TaskContext";
import { Status, Task } from "@/types/task";
import TaskColumn from "@/components/tasks/TaskColumn";
import TaskDialog from "@/components/tasks/TaskDialog";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { DndContext, DragEndEvent, DragOverEvent, DragStartEvent, PointerSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { Plus } from "lucide-react";

export default function KanbanPage() {
  const { board, addTask, updateTask, deleteTask, moveTask } = useTask();
  
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );
  
  const handleTaskClick = (taskId: string) => {
    setSelectedTask(board.tasks[taskId]);
    setIsDialogOpen(true);
  };
  
  const handleAddClick = () => {
    setSelectedTask(null);
    setIsDialogOpen(true);
  };
  
  const handleSaveTask = (taskData: Omit<Task, "id" | "createdAt"> | Task) => {
    if ("id" in taskData) {
      updateTask(taskData as Task);
    } else {
      addTask(taskData);
    }
  };
  
  const handleDeleteTask = () => {
    if (selectedTask) {
      deleteTask(selectedTask.id);
      setIsDialogOpen(false);
      setSelectedTask(null);
    }
  };
  
  const handleDragStart = (event: DragStartEvent) => {
    setActiveTaskId(event.active.id as string);
  };
  
  const handleDragOver = (event: DragOverEvent) => {
    // Optional: Add visual cues during drag over
  };
  
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over || active.id === over.id) {
      setActiveTaskId(null);
      return;
    }
    
    const activeTaskId = active.id as string;
    const task = board.tasks[activeTaskId];
    
    // Check if dropped onto a column
    if (over.id === "todo" || over.id === "inProgress" || over.id === "review" || over.id === "done") {
      moveTask(activeTaskId, task.status, over.id as Status);
    }
    
    setActiveTaskId(null);
  };
  
  // Prepare columns and their tasks
  const columns = Object.values(board.columns).map((column) => {
    const columnTasks = column.taskIds.map((taskId) => board.tasks[taskId]);
    return {
      ...column,
      tasks: columnTasks,
    };
  });
  
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Kanban Board</h1>
          <p className="text-muted-foreground mt-1">
            Drag and drop tasks to manage your workflow
          </p>
        </div>
        <Button onClick={handleAddClick}>
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>
      
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {columns.map((column) => (
            <motion.div
              key={column.id}
              variants={item}
            >
              <TaskColumn
                id={column.id}
                title={column.title}
                tasks={column.tasks}
                onTaskClick={handleTaskClick}
              />
            </motion.div>
          ))}
        </motion.div>
      </DndContext>
      
      <TaskDialog
        task={selectedTask || undefined}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={handleSaveTask}
        onDelete={selectedTask ? handleDeleteTask : undefined}
      />
    </div>
  );
}
