import { z } from "zod";

export const loginValidationSchema = z.object({
    email:z.string().trim().email("please enter a valid email"),
    password:z.string().trim().min(5,"password need at least 5 characters")
})