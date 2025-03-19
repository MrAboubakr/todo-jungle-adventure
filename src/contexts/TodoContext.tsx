
import React, { createContext, useContext, useState, useEffect } from "react";
import { Todo, Priority, Category } from "@/types/todo";
import { useToast } from "@/hooks/use-toast";

interface TodoContextType {
  todos: Todo[];
  categories: Category[];
  addTodo: (title: string, priority: Priority, category: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  addCategory: (name: string, color?: string) => void;
  deleteCategory: (id: string) => void;
  getTodosByCategory: (categoryId: string) => Todo[];
  getCompletedCount: () => number;
  getRemainingCount: () => number;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

// Default categories
const defaultCategories: Category[] = [
  { id: "default", name: "Tasks", color: "#3B82F6" },
  { id: "work", name: "Work", color: "#EF4444" },
  { id: "personal", name: "Personal", color: "#10B981" }
];

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      try {
        const parsedTodos = JSON.parse(savedTodos);
        return parsedTodos.map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt)
        }));
      } catch (error) {
        return [];
      }
    }
    return [];
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const savedCategories = localStorage.getItem("categories");
    if (savedCategories) {
      try {
        return JSON.parse(savedCategories);
      } catch (error) {
        return defaultCategories;
      }
    }
    return defaultCategories;
  });

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Save categories to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  const addTodo = (title: string, priority: Priority, category: string) => {
    if (!title.trim()) return;
    
    const newTodo: Todo = {
      id: Math.random().toString(36).substring(2, 9),
      title: title.trim(),
      completed: false,
      createdAt: new Date(),
      priority,
      category
    };
    
    setTodos(prevTodos => [newTodo, ...prevTodos]);
    toast({
      description: "Task added successfully",
      duration: 1500
    });
  };

  const toggleTodo = (id: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    toast({
      description: "Task deleted",
      duration: 1500
    });
  };

  const addCategory = (name: string, color = "#3B82F6") => {
    if (!name.trim()) return;
    
    const newCategory: Category = {
      id: Math.random().toString(36).substring(2, 9),
      name: name.trim(),
      color
    };
    
    setCategories(prevCategories => [...prevCategories, newCategory]);
    toast({
      description: `Category "${name}" added`,
      duration: 1500
    });
  };

  const deleteCategory = (id: string) => {
    // Don't delete if it's the default category
    if (id === "default") {
      toast({
        variant: "destructive",
        description: "Cannot delete default category",
        duration: 2000
      });
      return;
    }
    
    // Move todos from this category to default
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.category === id ? { ...todo, category: "default" } : todo
      )
    );
    
    setCategories(prevCategories => prevCategories.filter(category => category.id !== id));
    toast({
      description: "Category deleted",
      duration: 1500
    });
  };

  const getTodosByCategory = (categoryId: string) => {
    return todos.filter(todo => todo.category === categoryId);
  };

  const getCompletedCount = () => {
    return todos.filter(todo => todo.completed).length;
  };

  const getRemainingCount = () => {
    return todos.filter(todo => !todo.completed).length;
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        categories,
        addTodo,
        toggleTodo,
        deleteTodo,
        addCategory,
        deleteCategory,
        getTodosByCategory,
        getCompletedCount,
        getRemainingCount
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return context;
};
