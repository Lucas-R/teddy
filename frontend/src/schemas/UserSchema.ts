import { z } from "zod"

const BaseUserSchema = z.object({
  name: z.string().min(1),
  salary: z.number().positive(),
  companyValuation: z.number().nonnegative(),
})

export const UserPostSchema = BaseUserSchema;

export const UserPutSchema = BaseUserSchema.partial();

export const UserGetSchema = UserPutSchema.extend({
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type UserGetProps = z.infer<typeof UserGetSchema>
export type UserPutProps = z.infer<typeof UserPutSchema>
export type UserPostProps = z.infer<typeof UserPostSchema>
