import { gql } from "@apollo/client";

// Register mutation
export const REGISTER_USER = `
  mutation RegisterUser(
    $email: String!
    $password: String!
    $username: String!
  ) {
    register(email: $email, password: $password, username: $username) {
      id
      email
      username
      password
    }
  }
`;

// Login mutation
export const LOGIN_USER = `
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

// Add Todo mutation
export const addTodoMut = `
  mutation addTodo(
    $title: String!
    $description: String!
    $completed: Boolean!
    $token: String!
  ) {
    addTodo(
      title: $title
      description: $description
      completed: $completed
      token: $token
    ) {
      id
      title
      description
      createdAt
    }
  }
`;

// all Todo data
export const GET_USER_TODOS = gql`
  query GetUserTodos($userId: String!) {
    getUserTodos(userId: $userId) {
      id
      title
      description
      completed
      createdAt
    }
  }
`;

// Delete Todo mutation
export const DELETE_TODO = `
  mutation DeleteTodo($id: Int!) {
    deleteTodo(id: $id)
  }
`;

// Edit Todo mutation
export const EDIT_TODO = `
  mutation EditTodo(
    $id: Int!
    $title: String
    $description: String
    $completed: Boolean
  ) {
    editTodo(
      id: $id
      title: $title
      description: $description
      completed: $completed
    ) {
      id
      title
      description
      completed
      updatedAt
    }
  }
`;

// Get Todo by ID mutation
export const GET_TODO_BY_ID = gql`
  query GetTodoById($id: Int!) {
    getTodoById(id: $id) {
      id
      title
      description
      completed
      createdAt
      updatedAt
    }
  }
`;
