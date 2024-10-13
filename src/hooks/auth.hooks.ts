import { useMutation, useQuery } from "@tanstack/react-query";
import { loginUser, registerUser, userUpdatedData } from "../services/authService";
import { toast } from "sonner";

interface LoginDataType {
  email: string;
  password: string;
}

export const useUserRegistration = () => {
    return useMutation({
      mutationKey: ["USER_REGISTRATION"],
      mutationFn: async (userData) => await registerUser(userData),
      onSuccess: () => {
        toast.success("Registration successful")
        },
      onError: (error) => {
       toast.error("something is wrong")
      },
     
    });
  };
  
export const useUserLogin = () => {
    return useMutation({
      mutationKey: ["USER_LOGIN"],
      mutationFn: async (userData:LoginDataType) => await loginUser(userData),
      onSuccess: () => {
        toast.success("User login successfully")
        },
      onError: (error) => {
       toast.error("something is wrong")
      },
     
    });
  };
  

  export const useGetUser = () => {
    return useQuery({
        queryKey: ["GET_USER"],
        queryFn: async () => await userUpdatedData(),
    });
};