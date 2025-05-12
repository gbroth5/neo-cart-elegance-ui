
export type Priority = 'low' | 'medium' | 'high';

export type Status = 'todo' | 'inProgress' | 'review' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  dueDate?: string;
  createdAt: string;
  assignedTo?: string;
  tags?: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Column {
  id: Status;
  title: string;
  taskIds: string[];
}

export interface Board {
  columns: {
    [key in Status]: Column;
  };
  tasks: {
    [key: string]: Task;
  };
}
