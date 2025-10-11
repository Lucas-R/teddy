import z from "zod";

export const MethodSchema = z.enum(["get", "post", "patch", "delete"]);
 
export const MutationSchema = z.object({
    payload: z.any().optional(), 
    method: MethodSchema,
});

export type MutationProps = z.infer<typeof MutationSchema>;