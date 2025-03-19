
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
    <div className="flex bg-white rounded-xl p-1 shadow-sm mb-6">
      <button
        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
          filter === "all" ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:text-gray-700"
        }`}
        onClick={() => setFilter("all")}
      >
        All
      </button>
      <button
        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
          filter === "active" ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:text-gray-700"
        }`}
        onClick={() => setFilter("active")}
      >
        Active ({activeCount})
      </button>
      <button
        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
          filter === "completed" ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:text-gray-700"
        }`}
        onClick={() => setFilter("completed")}
      >
        Completed ({completedCount})
      </button>
    </div>
  );
};

export default FilterTabs;
