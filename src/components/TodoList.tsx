
import React from "react";
import { useTodo } from "@/contexts/TodoContext";
import Task from "./Task";
import { Todo } from "@/types/todo";
import { motion, AnimatePresence } from "framer-motion";

interface TodoListProps {
  category: string;
  filter: "all" | "active" | "completed";
}

const TodoList: React.FC<TodoListProps> = ({ category, filter }) => {
  const { getTodosByCategory } = useTodo();
  
  const todos = getTodosByCategory(category);
  
  const filteredTodos = todos.filter((todo: Todo) => {
    if (filter === "all") return true;
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });
  
  // Sort by priority (high to low) and then by creation date (newest first)
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    const priorityA = priorityOrder[a.priority];
    const priorityB = priorityOrder[b.priority];
    
    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }
    
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  if (sortedTodos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            No tasks found
          </h3>
          <p className="text-sm text-gray-500">
            {filter === "all" 
              ? "Add a new task to get started" 
              : filter === "active" 
                ? "No active tasks" 
                : "No completed tasks"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-1">
      <AnimatePresence>
        {sortedTodos.map((todo) => (
          <motion.div
            key={todo.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Task todo={todo} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TodoList;
