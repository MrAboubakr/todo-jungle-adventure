
import React from "react";

interface FilterTabsProps {
  filter: "all" | "active" | "completed";
  setFilter: (filter: "all" | "active" | "completed") => void;
  activeCount: number;
  completedCount: number;
}

const FilterTabs: React.FC<FilterTabsProps> = ({
  filter,
  setFilter,
  activeCount,
  completedCount,
}) => {
  return (
    <div className="flex bg-white dark:bg-gray-800 rounded-xl p-1 shadow-sm mb-6 transition-colors">
      <button
        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
          filter === "all" 
            ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100" 
            : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
        }`}
        onClick={() => setFilter("all")}
      >
        All
      </button>
      <button
        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
          filter === "active" 
            ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100" 
            : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
        }`}
        onClick={() => setFilter("active")}
      >
        Active ({activeCount})
      </button>
      <button
        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
          filter === "completed" 
            ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100" 
            : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
        }`}
        onClick={() => setFilter("completed")}
      >
        Completed ({completedCount})
      </button>
    </div>
  );
};

export default FilterTabs;
