"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getTodo } from "@/services/todoService";
import Cookies from "js-cookie";
import TodoList from "./TodoList";
import Header from "@/components/Header";
import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useEditTodoMutation,
} from "@/hooks/useTodoMutations";
import AddButton from "@/components/Button";
import { Todo } from "@/types/types";

const AddTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userTodos, setUserTodos] = useState<Todo[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sessionid = Cookies.get("token");

  const { data, isLoading, error } = useQuery({
    queryKey: ["getUserTodos"],
    queryFn: () => getTodo({ token: sessionid as string }),
    enabled: !!sessionid,
  });

  useEffect(() => {
    console.log("Fetched todos:", data);
    console.log("Query error:", error);
    if (data) {
      setUserTodos(data);
    }
  }, [data, error]);

  const { mutate: addTodo } = useAddTodoMutation();
  const { mutate: deleteTodo } = useDeleteTodoMutation();
  const { mutate: toggleTodoCompletion } = useEditTodoMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!sessionid) {
      toast.error("No session token found.");
      return;
    }

    setIsSubmitting(true);
    try {
      addTodo({
        token: sessionid,
        title,
        description,
        completed: false,
      });
      setTitle("");
      setDescription("");
    } catch (error) {
      toast.error("Failed to add todo");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (id: number) => {
    if (sessionid) {
      deleteTodo({
        id,
      });
    }
  };

  const handleToggleCompleted = (id: number, completed: boolean) => {
    if (sessionid) {
      toggleTodoCompletion({
        id,
        completed,
      });
      setUserTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, completed } : todo
        )
      );
    }
  };

  return (
    <>
      <Header />
      <div className="flex justify-center items-center px-4 sm:px-6 lg:px-8 my-4">
        <div className="max-w-md w-full bg-white border border-gray-200 p-5 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
            Add new todo
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="w-full max-w-md mx-auto space-x-3">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
                disabled={isSubmitting}
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 shadow-sm"
              />
            </div>
            <div className="w-full max-w-md mx-auto space-x-3 mt-2">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                required
                rows={4}
                disabled={isSubmitting}
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 shadow-sm"
              />
            </div>
            <div className="flex items-center justify-center w-full mt-2">
              <AddButton
                onClick={handleSubmit}
                disabled={isSubmitting || !title || !description}
                className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 cursor-pointer"
              >
                {isSubmitting ? "Adding..." : "Add Todo"}
              </AddButton>
            </div>
          </form>
        </div>
      </div>

      {/* Loading and Error State */}
      {isLoading ? (
        <div className="text-center">Loading todos...</div>
      ) : error ? (
        <div className="text-center text-red-500">Error loading todos</div>
      ) : (
        <div className="mx-20 mb-10">
          <TodoList
            userTodos={userTodos}
            onDelete={handleDelete}
            onToggleCompleted={handleToggleCompleted}
          />
        </div>
      )}
    </>
  );
};

export default AddTodo;
