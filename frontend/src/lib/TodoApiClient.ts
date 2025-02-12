import { ApolloClient, InMemoryCache, ApolloLink, gql } from "@apollo/client";
import {
  CreateTodoVariable,
  EditTodoVariables,
  DeleteTodoVariables,
  DeleteTodoResponse,
  CreateTodoResponse,
  CompleteTodoResponse,
  GetTodoResponse,
  GetTodoByIdVariables,
  LoginUserVariables,
  LoginUserResponse,
  RegisterUserResponse,
  RegisterUserVariables,
} from "@/types/types";
import {
  addTodoMut,
  DELETE_TODO,
  EDIT_TODO,
  GET_TODO_BY_ID,
  GET_USER_TODOS,
  LOGIN_USER,
  REGISTER_USER,
} from "./graphql";

class TodoApiClient {
  private client: ApolloClient<any>;
  private token: string | undefined;

  constructor(token?: string) {
    this.token = token;
    this.client = new ApolloClient({
      uri: "http://localhost:4000/graphql",
      cache: new InMemoryCache(),
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
  }

  // Function to dynamically update the token
  setToken(token: string | undefined) {
    this.token = token;
    if (this.client) {
      this.client.setLink(
        this.client.link.concat(
          new ApolloLink((operation, forward) => {
            if (this.token) {
              operation.setContext({
                headers: {
                  Authorization: `Bearer ${this.token}`,
                },
              });
            }
            return forward(operation);
          })
        )
      );
    }
  }
  private async request(query: any, variables: any = {}) {
    try {
      const result = await this.client.mutate({
        mutation: query,
        variables,
      });

      if (result.errors) {
        throw new Error(result.errors[0]?.message || "Unknown error");
      }
      return result.data;
    } catch (error) {
      throw new Error(`API request failed`);
    }
  }

  // Fetch all todos for a user
  async getUserTodos() {
    const data = await this.request(GET_USER_TODOS, { userId: this.token });
    return data?.getUserTodos;
  }

  // Create a new todo
  async createTodo({
    title,
    description,
    completed,
    token,
  }: CreateTodoVariable): Promise<CreateTodoResponse> {
    try {
      const { data } = await this.client.mutate({
        mutation: gql`
          ${addTodoMut}
        `,
        variables: { title, description, completed, token },
      });
      return data.addTodo;
    } catch (error) {
      throw new Error("Failed to create todo.");
    }
  }

  // Delete a todo
  async deleteTodo({ id }: DeleteTodoVariables): Promise<DeleteTodoResponse> {
    try {
      const { data } = await this.client.mutate({
        mutation: gql`
          ${DELETE_TODO}
        `,
        variables: { id },
      });
      return data.deleteTodo;
    } catch (error) {
      throw new Error("Failed to delete todo.");
    }
  }

  // Mark todo as completed or not
  async completeTodo({
    id,
    completed,
  }: {
    id: number;
    completed: boolean;
  }): Promise<CompleteTodoResponse | null> {
    try {
      const { data } = await this.client.mutate({
        mutation: gql`
          ${EDIT_TODO}
        `,
        variables: { id, completed },
      });
      return data.editTodo;
    } catch (error) {
      throw new Error("Failed to update todo.");
    }
  }

  // Get a todo by its ID
  async getTodoById({
    id,
  }: GetTodoByIdVariables): Promise<GetTodoResponse | undefined> {
    const data = await this.request(GET_TODO_BY_ID, { id });
    return data;
  }

  // Update a todo
  async updateTodo({ id, title, description, completed }: EditTodoVariables) {
    try {
      const { data } = await this.client.mutate({
        mutation: gql`
          ${EDIT_TODO}
        `,
        variables: { id, title, description, completed },
      });
      return data.editTodo;
    } catch (error) {
      throw new Error("Failed to update todo.");
    }
  }

  async loginUser({
    email,
    password,
  }: LoginUserVariables): Promise<LoginUserResponse> {
    try {
      const { data, errors } = await this.client.mutate({
        mutation: gql`${LOGIN_USER}`,
        variables: { email, password },
      });
  
      if (errors) {
        throw new Error(errors[0]?.message || "GraphQL errors occurred");
      }
  
      if (!data?.login) {
        throw new Error("Login failed");
      }
  
      return data.login;
    } catch (error) {
      throw new Error(`API request failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  async registerUser({
    username,
    email,
    password,
  }: RegisterUserVariables): Promise<RegisterUserResponse> {
    try {
      const { data, errors } = await this.client.mutate({
        mutation: gql`${REGISTER_USER}`,
        variables: { username, email, password },
      });
  
      if (errors) {
        throw new Error(errors[0]?.message || "GraphQL errors occurred");
      }
  
      if (!data?.register) {
        throw new Error("Register failed");
      }
  
      return data.register;
    } catch (error) {
      throw new Error(`API request failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }
  
}


export default TodoApiClient;
