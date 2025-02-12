// todo
export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

// create todo
export interface CreateTodoVariable {
  title: string;
  description: string;
  token: string;
  completed: boolean;
}

export interface CreateTodoResponse {
  title: string;
  description: string;
  completed: boolean;
}

// complete todo
export interface CompleteTodoResponse {
  success: boolean;
  todo: Todo;
}

// Fetch todo by ID
export interface GetTodoByIdVariables {
  id: number;
}

export interface GetTodoResponse {
  getTodoById: Todo;
}

// Edit todo
export interface EditTodoResponse {
  editTodo: {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    updatedAt: string;
  };
}

export interface EditTodoVariables {
  id: number;
  title?: string;
  description?: string;
  completed?: boolean;
  createdAt?: string;
}

// delete todo
export interface DeleteTodoResponse {
  deleteTodo: boolean;
}

export interface DeleteTodoVariables {
  id: number;
}

// Register
export interface RegisterUserVariables {
  email: string;
  password: string;
  username: string;
}

export interface RegisterUserResponse {
  register: {
    id: string;
    email: string;
    username: string;
    password: string;
  };
}

// Login
export interface LoginUserVariables {
  email: string;
  password: string;
}

export interface LoginUserResponse {
  login: string;
}
