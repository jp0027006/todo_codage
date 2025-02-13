import { GET_USER_TODOS } from "@/lib/graphql";
import TodoApiClient from "@/lib/TodoApiClient";
import {
  Todo,
  CreateTodoVariable,
  EditTodoVariables,
  GetTodoByIdVariables,
} from "@/types/types";
import { print } from "graphql";

const apiClient = new TodoApiClient();
export interface GetUserTodosResponse {
  data: {
    getUserTodos: Todo[];
  };
}

export async function getTodo(token: string | null) {
  if (!token) {
    console.log("No token provided");
    return undefined;
  }
  try {
    const queryString = print(GET_USER_TODOS);
    const response = await fetch("http://localhost:5000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authentication: token ? `${token}` : "",
      },
      body: JSON.stringify({
        query: queryString,
        variables: {
          userId: token,
        },
      }),
    });

    if (!response.ok) {
      const errorMessage = `Error fetching todos: ${response.status} - ${response.statusText}`;
      console.log(errorMessage);
      return undefined;
    }

    const data: GetUserTodosResponse = await response.json();
    return data?.data?.getUserTodos;
  } catch (error) {
    console.log("Error sending request to get todos", error);
    return undefined;
  }
}
export async function createTodo({
  title,
  description,
  token,
  completed,
}: CreateTodoVariable) {
  if (!token) {
    throw new Error("No token provided");
  }
  try {
    const newTodo = await apiClient.createTodo({
      title,
      description,
      completed,
      token,
    });
    return newTodo;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error creating todo: ${error.message}`);
    } else {
      throw new Error("Unexpected error occurred while creating todo.");
    }
  }
}

export async function deleteTodo({ id }: { id: number }) {
  try {
    const result = await apiClient.deleteTodo({
      id,
    });

    return result;
  } catch (error) {
    console.error("Error deleting todo", error);
    throw error;
  }
}

export async function completeTodo({ id, completed }: EditTodoVariables) {
  const isCompleted = completed ?? false;

  try {
    const updatedTodo = await apiClient.completeTodo({
      id,
      completed: isCompleted,
    });

    return {
      success: true,
      todo: updatedTodo,
    };
  } catch (error) {
    console.log("Error completing todo", error);
    return null;
  }
}

// Function to get todo by it's id
export async function getTodoById({ id }: GetTodoByIdVariables) {
  try {
    const todo = await apiClient.getTodoById({ id });
    return todo;
  } catch (error) {
    console.log("Error fetching todo by ID", error);
    return undefined;
  }
}

// Function to update todo
export async function updateTodo({
  id,
  title,
  description,
  completed,
}: EditTodoVariables) {
  try {
    const result = await apiClient.updateTodo({
      id,
      title,
      description,
      completed,
    });

    return result;
  } catch (error) {
    console.error("Error updating todo", error);
    throw new Error("Error updating todo");
  }
}
