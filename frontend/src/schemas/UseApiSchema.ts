import z from "zod";

export const MethodSchema = z.enum(["get", "post", "put", "delete"]).optional();
 
export const UseApiSchema = z.object({
  url: z.string(),
    method: MethodSchema
});

export type UseApiProps = z.infer<typeof UseApiSchema>;