import z from "zod";
 
export const LoginSchema = z.object({
  name: z.string().min(1, "Name is required")
});

export type LoginProps = z.infer<typeof LoginSchema>;