import z from "zod";
 
export const LoginSchema = z.object({
  name: z.string().min(1, "Name is required"),
  selected: z.array(z.number()).optional()
});

export type LoginProps = z.infer<typeof LoginSchema>;