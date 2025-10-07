import z from "zod";

export const MethodSchema = z.enum(["get", "post", "patch", "delete"]);
 
export const FetchSchema = z.object({
  url: z.string(),
  method: MethodSchema
});

export type FetchProps = z.infer<typeof FetchSchema>;