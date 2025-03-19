
import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useTodo } from "@/contexts/TodoContext";
import { Priority } from "@/types/todo";
import { motion, AnimatePresence } from "framer-motion";

interface AddTodoProps {
  selectedCategory: string;
}

const AddTodo: React.FC<AddTodoProps> = ({ selectedCategory }) => {
  const { addTodo, categories } = useTodo();
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>(Priority.MEDIUM);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    addTodo(title, priority, selectedCategory);
    setTitle("");
    setPriority(Priority.MEDIUM);
    setIsExpanded(false);
  };

  const selectedCategoryName = categories.find(
    (category) => category.id === selectedCategory
  )?.name || "Tasks";

  return (
    <div className="relative mb-8">
      <form onSubmit={handleSubmit} className="glass-morphism rounded-2xl overflow-hidden">
        <div 
          className="flex items-center px-4 py-3 cursor-pointer"
          onClick={() => !isExpanded && setIsExpanded(true)}
        >
          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center mr-3">
            <Plus className="w-4 h-4 text-white" />
          </div>
          <input
            type="text"
            placeholder={`Add a task to ${selectedCategoryName}...`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-transparent border-none outline-none placeholder:text-gray-400 text-sm"
            onFocus={() => setIsExpanded(true)}
          />
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="px-4 py-3 border-t border-gray-100">
                <div className="text-xs font-medium text-gray-500 mb-2">Priority</div>
                <div className="flex space-x-2 mb-4">
                  {Object.values(Priority).map((p) => (
                    <button
                      key={p}
                      type="button"
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                        priority === p
                          ? p === Priority.LOW
                            ? "bg-blue-100 text-blue-700"
                            : p === Priority.MEDIUM
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      }`}
                      onClick={() => setPriority(p)}
                    >
                      {p === Priority.LOW ? "Low" : p === Priority.MEDIUM ? "Medium" : "High"}
                    </button>
                  ))}
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    className="px-3 py-1.5 text-xs text-gray-600 hover:text-gray-900 transition-colors"
                    onClick={() => setIsExpanded(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-medium hover:bg-primary/90 transition-colors"
                    disabled={!title.trim()}
                  >
                    Add Task
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
};

export default AddTodo;
