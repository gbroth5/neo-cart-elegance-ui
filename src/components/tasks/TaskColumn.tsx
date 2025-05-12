
import { useState } from "react";
import { Status, Task } from "@/types/task";
import TaskCard from "./TaskCard";
import { motion } from "framer-motion";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

interface TaskColumnProps {
  id: Status;
  title: string;
  tasks: Task[];
  onTaskClick: (taskId: string) => void;
}

export default function TaskColumn({ id, title, tasks, onTaskClick }: TaskColumnProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className="kanban-column"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">{title}</h3>
        <span className="bg-primary/20 text-primary-foreground px-2 py-0.5 rounded-full text-xs">
          {tasks.length}
        </span>
      </div>
      
      <SortableContext
        id={id}
        items={tasks.map(task => task.id)}
        strategy={verticalListSortingStrategy}
      >
        <motion.div
          layout
          className="flex flex-col gap-3"
        >
          {tasks.map((task) => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onClick={() => onTaskClick(task.id)}
            />
          ))}
        </motion.div>
      </SortableContext>
      
      {tasks.length === 0 && (
        <div className="h-24 flex items-center justify-center border border-dashed border-muted-foreground/30 rounded-md">
          <p className="text-muted-foreground text-sm">Drop tasks here</p>
        </div>
      )}
      
      {isHovered && tasks.length > 0 && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="mt-4 p-2 border border-dashed border-muted-foreground/30 rounded-md flex items-center justify-center"
        >
          <p className="text-muted-foreground text-sm">+ Drop here</p>
        </motion.div>
      )}
    </div>
  );
}
