
import React from "react";
import { useTodo } from "@/contexts/TodoContext";
import { Category } from "@/types/todo";

interface CategorySelectorProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const { categories, getTodosByCategory } = useTodo();

  return (
    <div className="w-full mb-6">
      <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
        Categories
      </h2>
      <div className="space-y-1">
        {categories.map((category: Category) => {
          const todoCount = getTodosByCategory(category.id).length;
          
          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`w-full text-left px-4 py-2.5 rounded-lg transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-white shadow-sm font-medium"
                  : "hover:bg-white/50"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-3"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-sm">{category.name}</span>
                </div>
                <div className="text-xs bg-gray-100 text-gray-600 rounded-full px-2 py-0.5">
                  {todoCount}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategorySelector;
