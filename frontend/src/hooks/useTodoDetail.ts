import { useState, useEffect } from "react";
import { getTodoById } from "@/services/todoService";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";

export const useTodoDetail = (todoId: number | null) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["getTodoByIds", todoId],
    queryFn: async () => {
      if (todoId === null) {
        throw new Error("Invalid Todo ID");
      }

      const todo = await getTodoById({ id: todoId });
      if (!todo) {
        throw new Error("Todo not found");
      }

      return todo;
    },
    enabled: todoId !== null,
  });

  const todo = data?.getTodoById;

  const formattedDate = todo
    ? moment(todo.createdAt).isValid()
      ? moment(todo.createdAt).format("MMMM DD, YYYY [at] h:mm A")
      : new Date(Number(todo.createdAt)).toLocaleString()
    : "";

  useEffect(() => {
    if (todo && !isEditing) {
      setTitle(todo.title);
      setDescription(todo.description);
    }
  }, [todo, isEditing]);

  const startEditing = () => setIsEditing(true);
  const cancelEdit = () => setIsEditing(false);

  return {
    isLoading,
    error,
    todo,
    title,
    description,
    formattedDate,
    setTitle,
    setDescription,
    startEditing,
    cancelEdit,
  };
};
