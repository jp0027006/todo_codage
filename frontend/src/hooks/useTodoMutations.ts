import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createTodo, deleteTodo, completeTodo, updateTodo } from "@/services/todoService";
import { loginUserRequest, registerUserReq } from "@/services/userService";
import { queryClient } from "@/components/tanStackProvider";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";


const handleError = (error: any, action: string) => {
  toast.error(`${action} failed: ${error?.message || "Unknown error"}`);
};


const generateMutationOptions = (mutationType: string, invalidateQueryKey: string) => {
  return {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [invalidateQueryKey] });
      toast.success(`${mutationType} successfully!`);
    },
    onError: (error: any) => handleError(error, mutationType),
  };
};


export const useAddTodoMutation = () => {
  return useMutation({
    mutationFn: createTodo,

    ...generateMutationOptions("Todo added", "getUserTodos"),
  });
};


export const useDeleteTodoMutation = () => {
  return useMutation({
    mutationFn: deleteTodo,
    ...generateMutationOptions("Todo deleted", "getUserTodos"),
  });
};

export const useEditTodoMutation = () => {
  return useMutation({
    mutationFn: completeTodo,
    ...generateMutationOptions("Todo edited", "getUserTodos"),
  });
};


export const useUpdateTodoMutation = () => {
  return useMutation({
    mutationFn: updateTodo,
    ...generateMutationOptions("Todo updated", "getTodoByIds"),
  });
};


export const useRegisterUserMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: registerUserReq,
    onSuccess: () => {
      toast.success("User registered successfully!");
      router.push("/login");
    },
    onError: (error: any) => handleError(error, "User registration"),
  });
};


export const useLoginUserMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: loginUserRequest,
    onSuccess: (token: string) => {
      Cookies.set('token', token, { expires: 7, secure: true });
      toast.success("Login successful!");
      router.push("/");
    },
    onError: (error: any) => toast.error("Login failed! Please check your credentials."),
  });
};
