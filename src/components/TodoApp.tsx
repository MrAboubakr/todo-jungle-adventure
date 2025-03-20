
import React from "react";
import { TodoProvider } from "@/contexts/TodoContext";
import TodoAppContainer from "./TodoAppContainer";
import { motion } from "framer-motion";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ThemeToggle from "./ThemeToggle";

const TodoApp: React.FC = () => {
  return (
    <ThemeProvider>
      <TodoProvider>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300"
        >
          <div className="container mx-auto py-8 relative">
            <div className="absolute top-4 right-4">
              <ThemeToggle />
            </div>
            <TodoAppContainer />
          </div>
        </motion.div>
      </TodoProvider>
    </ThemeProvider>
  );
};

export default TodoApp;
