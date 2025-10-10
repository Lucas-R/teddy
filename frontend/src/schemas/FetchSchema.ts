import z from "zod";

export const MethodSchema = z.enum(["get", "post", "patch", "delete"]);
 
export const FetchSchema = z.object({
  url: z.string(),
  method: MethodSchema,
  options: z.object({
    params: z.object({
      page: z.number().optional(),
      limit: z.number().optional()
    }).optional()
  }).optional()
});

export type FetchProps = z.infer<typeof FetchSchema>;