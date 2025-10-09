import z from "zod";
 
export const LoginSchema = z.object({
  name: z.string()
}).nullable();

export type LoginProps = z.infer<typeof LoginSchema>;