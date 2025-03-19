
import React, { useState } from "react";
import { Check, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { Todo, Priority } from "@/types/todo";
import { useTodo } from "@/contexts/TodoContext";

interface TaskProps {
  todo: Todo;
}

const Task: React.FC<TaskProps> = ({ todo }) => {
  const { toggleTodo, deleteTodo } = useTodo();
  const [isHovering, setIsHovering] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  
  const handleDelete = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      deleteTodo(todo.id);
    }, 300);
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case Priority.LOW:
        return "bg-todo-low";
      case Priority.MEDIUM:
        return "bg-todo-medium";
      case Priority.HIGH:
        return "bg-todo-high";
      default:
        return "bg-todo-low";
    }
  };

  const getPriorityLabel = (priority: Priority) => {
    switch (priority) {
      case Priority.LOW:
        return "Low";
      case Priority.MEDIUM:
        return "Medium";
      case Priority.HIGH:
        return "High";
      default:
        return "Low";
    }
  };

  return (
    <div
      className={cn(
        "relative group w-full rounded-xl px-4 py-3 mb-3 task-transition glass-morphism",
        getPriorityColor(todo.priority),
        todo.completed && "bg-todo-complete opacity-70",
        isHovering && "scale-[1.01] shadow-md",
        isLeaving && "scale-[0.99]",
        isFadingOut && "opacity-0 transform translate-x-4"
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setIsLeaving(true);
        setTimeout(() => setIsLeaving(false), 300);
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 w-full">
          <div
            className={cn(
              "checkbox-container",
              todo.completed && "checked"
            )}
            onClick={() => toggleTodo(todo.id)}
          >
            <Check className={cn("checkbox-mark w-3 h-3", todo.completed ? "animate-check-mark" : "scale-0")} />
          </div>
          <div className="flex flex-col w-full">
            <div className="flex justify-between items-center w-full">
              <span 
                className={cn(
                  "font-medium text-sm transition-all duration-300",
                  todo.completed && "line-through text-gray-400"
                )}
              >
                {todo.title}
              </span>
              <div className="flex items-center">
                <span
                  className={cn(
                    "text-xs px-2 py-0.5 rounded-full transition-opacity",
                    !isHovering && "opacity-70",
                    todo.priority === Priority.LOW && "bg-blue-100 text-blue-700",
                    todo.priority === Priority.MEDIUM && "bg-yellow-100 text-yellow-700",
                    todo.priority === Priority.HIGH && "bg-red-100 text-red-700",
                  )}
                >
                  {getPriorityLabel(todo.priority)}
                </span>
                
                <button
                  onClick={handleDelete}
                  className={cn(
                    "ml-2 text-gray-400 hover:text-red-500 transition-all duration-200",
                    !isHovering && "opacity-0",
                    isHovering && "opacity-100"
                  )}
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="text-xs text-gray-500 mt-1">
              {new Date(todo.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
