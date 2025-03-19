
export enum Priority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high"
}

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  priority: Priority;
  category: string;
}

export interface Category {
  id: string;
  name: string;
  color?: string;
}
