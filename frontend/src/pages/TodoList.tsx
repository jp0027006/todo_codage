import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TodoCard from "@/components/TodoCard";

const TodoList = ({
  userTodos,
  onDelete,
  onToggleCompleted,
}: {
  userTodos: {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    createdAt: string;
  }[];
  onDelete: (id: number) => void;
  onToggleCompleted: (id: number, completed: boolean) => void;
}) => {
  const router = useRouter();

  const [todos, setTodos] = useState(userTodos);

  useEffect(() => {
    setTodos(userTodos);
  }, [userTodos]);

  const handleViewClick = (todo: { id: number; title: string; description: string }) => {
    router.push(`/todos/${todo.id}`);
  };

  const handleDelete = (id: number) => {
    onDelete(id);
  };

  const handleToggleCompleted = (id: number, completed: boolean) => {
    onToggleCompleted(id, completed);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 p-4">
      {todos?.length === 0 ? (
        <div className="text-center text-gray-500 col-span-4">No todos found</div>
      ) : (
        todos?.map((todo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            onDelete={handleDelete}
            onToggleCompleted={handleToggleCompleted}
            onViewClick={handleViewClick}
          />
        ))
      )}
    </div>
  );
};

export default TodoList;
