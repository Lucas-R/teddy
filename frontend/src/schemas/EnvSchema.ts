import z from "zod";
 
export const EnvSchema = z.object({
  api: z.string()
});

export type EnvProps = z.infer<typeof EnvSchema>;