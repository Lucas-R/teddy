import * as z from "zod"; 
import { LoginSchema } from "./LoginSchema";
 
export const AuthSchema = z.object({
    isAuthenticated: z.boolean(),
    user: LoginSchema.nullable(),
    login: z.function({
        input: [z.object({ name: z.string()})],
        output: z.promise(z.void()),
    }),
    logout: z.function({
        input: [],
        output: z.void(),
    })
});

export type AuthProps = z.infer<typeof AuthSchema>;