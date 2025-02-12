"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useTodoDetail } from "@/hooks/useTodoDetail";
import TodoEditForm from "./TodoEditForm";
import { useUpdateTodoMutation } from "@/hooks/useTodoMutations";

const TodoView = () => {
  const params = useParams();
  const router = useRouter();
  const todoData = params && params.todoId ? Number(params.todoId) : null;

  const [isEditing, setIsEditing] = useState(false);

  const {
    isLoading,
    error,
    todo,
    title,
    description,
    formattedDate,
    setTitle,
    setDescription,
    cancelEdit,
  } = useTodoDetail(todoData);

  const { mutate: updateTodoMutation } = useUpdateTodoMutation();

  const handleUpdate = async () => {
    if (!title || !description || !todoData) {
      console.error("Title and Description are required.");
      return;
    }

    try {
      updateTodoMutation({
        id: todoData,
        title,
        description,
      });
      setIsEditing(false);
      cancelEdit();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  useEffect(() => {
    if (!todoData) {
      console.error("Todo ID is required");
    }
  }, [todoData]);

  if (isLoading)
    return <p className="text-center text-lg text-gray-600">Loading...</p>;
  if (error)
    return (
      <p className="text-center text-lg text-red-600">Error: {error.message}</p>
    );

  if (!todo) {
    return <p className="text-center text-lg text-gray-600">Todo not found.</p>;
  }

  return (
    <div className="flex flex-col items-center">
      {isEditing ? (
        <TodoEditForm
          title={title}
          description={description}
          setTitle={setTitle}
          setDescription={setDescription}
          handleUpdate={handleUpdate}
        />
      ) : (
        <div className="flex justify-center items-center">
          <div className="w-[500px] p-6 bg-white border border-gray-200 shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 ">
              Title: {title}
            </h2>
            <span className="text-sm text-gray-400">{formattedDate}</span>
            <p className="text-gray-800 mb-2">Description: {description}</p>
            <p className="text-gray-800">
              Status:{" "}
              <span
                className={`inline-block px-2 py-1 text-sm rounded-md ${
                  todo.completed
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {todo.completed ? "Completed" : "Pending"}
              </span>
            </p>
            <div className="flex justify-center mt-5">
              <button
                onClick={() => router.push("/")}
                className="px-4 py-2 mr-2 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 rounded-lg"
              >
                Go back
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg mr-2"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoView;
