import TodoApiClient from "@/lib/TodoApiClient";
import { RegisterUserVariables, LoginUserVariables } from "@/types/types";

const apiClient = new TodoApiClient();

export const loginUserRequest = async ({
  email,
  password,
}: LoginUserVariables)=> {
  try {
    const result = apiClient.loginUser({
      email,
      password
    });
    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error during login: ${error.message}`);
    } else {
      throw new Error("Unexpected error occurred while logging in.");
    }
  }
};

export const registerUserReq = async ({
  username,
  email,
  password,
}: RegisterUserVariables)=> {
  try {
    const result = apiClient.registerUser({
      username,
      email,
      password
    });
    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error during login: ${error.message}`);
    } else {
      throw new Error("Unexpected error occurred while logging in.");
    }
  }
};
