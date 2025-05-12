
import { useState } from "react";
import { Task } from "@/types/task";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Clock, Tag } from "lucide-react";
import { motion } from "framer-motion";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { format } from "date-fns";

interface TaskCardProps {
  task: Task;
  onClick: () => void;
}

export default function TaskCard({ task, onClick }: TaskCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  const priorityClass = 
    task.priority === "high" 
      ? "priority-high" 
      : task.priority === "medium" 
        ? "priority-medium" 
        : "priority-low";
  
  const formattedDate = task.dueDate 
    ? format(new Date(task.dueDate), "MMM dd") 
    : null;

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      className={`task-card animate-hover ${priorityClass}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      {...attributes}
      {...listeners}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-sm">{task.title}</h3>
        <div className="text-xs px-2 py-1 rounded bg-background/80">
          {task.priority}
        </div>
      </div>
      
      <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
        {task.description}
      </p>
      
      <div className="flex items-center justify-between mt-2">
        {task.tags && task.tags.length > 0 && (
          <div className="flex gap-1 flex-wrap">
            {task.tags.slice(0, 2).map((tag) => (
              <span 
                key={tag}
                className="px-2 py-0.5 text-xs rounded-full bg-primary/20 flex items-center gap-1"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
            {task.tags.length > 2 && (
              <span className="text-xs text-muted-foreground">
                +{task.tags.length - 2}
              </span>
            )}
          </div>
        )}
        
        {formattedDate && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <CalendarIcon className="w-3 h-3" />
            <span>{formattedDate}</span>
          </div>
        )}
      </div>
      
      {isHovered && (
        <motion.div 
          className="mt-3 flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Button 
            size="sm" 
            variant="secondary" 
            className="text-xs h-7"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            Edit
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}
