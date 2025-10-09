import z from "zod";
import { LoginSchema } from "./LoginSchema";
 
export const AuthSchema = z.object({
    isAuthenticated: z.boolean(),
    user: LoginSchema,
    login: z.function(),
    logout: z.function()
});

export type AuthProps = z.infer<typeof AuthSchema>;