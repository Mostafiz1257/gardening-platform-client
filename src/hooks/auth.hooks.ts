import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  loginUser,
  registerUser,
  userUpdatedData,
} from "../services/authService";

interface LoginDataType {
  email: string;
  password: string;
}

export const useUserRegistration = () => {
  return useMutation({
    mutationKey: ["USER_REGISTRATION"],
    // eslint-disable-next-line prettier/prettier
    mutationFn: async (userData:any) => await registerUser(userData),
    onSuccess: () => {
      toast.success("Registration successful");
    },
    onError: (error) => {
      toast.error("something is wrong");
    },
  });
};

export const useUserLogin = () => {
  return useMutation({
    mutationKey: ["USER_LOGIN"],
    mutationFn: async (userData: LoginDataType) => await loginUser(userData),
    onSuccess: () => {
      toast.success("User login successfully");
    },
    onError: (error) => {
      toast.error("something is wrong");
    },
  });
};

export const useGetUser = () => {
  return useQuery({
    queryKey: ["GET_USER"],
    queryFn: async () => await userUpdatedData(),
  });
};
