import { LOGIN_USER, REGISTER_USER } from "@/lib/graphql";
import TodoApiClient from "@/lib/TodoApiClient";
import { RegisterUserResponse, RegisterUserVariables, LoginUserVariables, LoginUserResponse } from "@/types/types";

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


// export async function registerUserReq({
//   username,
//   email,
//   password,
// }: RegisterUserVariables): Promise<RegisterUserResponse> {
//   const response = await fetch("http://localhost:4000/graphql", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       query: REGISTER_USER,
//       variables: {
//         username,
//         email,
//         password,
//       },
//     }),
//   });

//   if (!response.ok) {
//     const errorMessage = `Error creating todo: ${response.status} - ${response.statusText}`;
//     throw new Error(errorMessage);
//   }

//   const result = await response.json();

//   if (result.errors) {
//     throw new Error(
//       `API Error: ${result.errors[0]?.message || "Unknown error"}`
//     );
//   }

//   if (!result.data) {
//     throw new Error("API response does not contain data");
//   }

//   console.log("register", result.data);

//   return result.data;
// }
