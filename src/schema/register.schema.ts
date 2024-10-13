import { z } from "zod";

export const registerValidationSchema = z.object({
  email: z.string().trim().email("Enter a valid email"),
  password: z.string().trim().min(5, "Password need at least 5 characters"),
  mobileNumber: z.string().min(5, "Enter your number"),
  name: z.string().trim().min(1, "Enter your name"),
  profilePhoto:z.string()
});
