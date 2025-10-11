import { z } from "zod"

const BaseClientSchema = z.object({
  name: z.string().min(1),
  salary: z
    .number({ message: "Aceita apenas números" })
    .positive("O salário deve ser maior que zero"),
  companyValuation: z
    .number({ message: "Aceita apenas números" })
    .positive("O valor da empresa deve ser maior que zero")
})

export const ClientPostPatchSchema = BaseClientSchema.partial().extend({
  id: z.number().optional()
});

export const ClientGetSchema = BaseClientSchema.extend({
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type ClientGetProps = z.infer<typeof ClientGetSchema>
export type ClientPostPatchProps = z.infer<typeof ClientPostPatchSchema>
