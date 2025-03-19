
import React from "react";
import { TodoProvider } from "@/contexts/TodoContext";
import TodoAppContainer from "./TodoAppContainer";
import { motion } from "framer-motion";

const TodoApp: React.FC = () => {
  return (
    <TodoProvider>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50"
      >
        <div className="container mx-auto py-8">
          <TodoAppContainer />
        </div>
      </motion.div>
    </TodoProvider>
  );
};

export default TodoApp;
