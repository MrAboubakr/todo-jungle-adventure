
import React, { useState } from "react";
import { useTodo } from "@/contexts/TodoContext";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import CategorySelector from "./CategorySelector";
import FilterTabs from "./FilterTabs";
import AddCategory from "./AddCategory";

const TodoAppContainer: React.FC = () => {
  const { getRemainingCount, getCompletedCount } = useTodo();
  const [selectedCategory, setSelectedCategory] = useState("default");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const activeCount = getRemainingCount();
  const completedCount = getCompletedCount();

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 h-full w-full max-w-6xl mx-auto p-6">
      <div className="md:col-span-1 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm transition-colors">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-1 text-gray-900 dark:text-gray-100">My Tasks</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {activeCount} tasks remaining
          </p>
        </div>
        
        <CategorySelector
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        
        <AddCategory />
      </div>
      
      <div className="md:col-span-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm transition-colors">
        <AddTodo selectedCategory={selectedCategory} />
        
        <FilterTabs
          filter={filter}
          setFilter={setFilter}
          activeCount={activeCount}
          completedCount={completedCount}
        />
        
        <TodoList category={selectedCategory} filter={filter} />
      </div>
    </div>
  );
};

export default TodoAppContainer;
