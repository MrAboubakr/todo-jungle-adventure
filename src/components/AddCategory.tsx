
import React, { useState } from "react";
import { PlusCircle, X } from "lucide-react";
import { useTodo } from "@/contexts/TodoContext";
import { motion, AnimatePresence } from "framer-motion";

const categoryColors = [
  "#3B82F6", // blue
  "#EF4444", // red
  "#10B981", // green
  "#F59E0B", // yellow
  "#8B5CF6", // purple
  "#EC4899", // pink
  "#6366F1", // indigo
  "#14B8A6", // teal
];

const AddCategory: React.FC = () => {
  const { addCategory } = useTodo();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [selectedColor, setSelectedColor] = useState(categoryColors[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    addCategory(name, selectedColor);
    setName("");
    setSelectedColor(categoryColors[0]);
    setIsOpen(false);
  };

  return (
    <div className="mb-6">
      <button
        className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
        onClick={() => setIsOpen(true)}
      >
        <PlusCircle className="w-4 h-4 mr-1" />
        Add Category
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Add Category</h3>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    placeholder="Enter category name"
                    autoFocus
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Color
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {categoryColors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        style={{ backgroundColor: color }}
                        className={`w-8 h-8 rounded-full transition-all ${
                          selectedColor === color
                            ? "ring-2 ring-offset-2 ring-gray-400 scale-110"
                            : "hover:scale-110"
                        }`}
                        onClick={() => setSelectedColor(color)}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors mr-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                    disabled={!name.trim()}
                  >
                    Add Category
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddCategory;
