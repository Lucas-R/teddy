import { api } from "@/libs/axios";
import type { MutationProps } from "@/schemas/MutationSchema";
import { ClientPostSchema, type ClientPostProps } from "@/schemas/ClientSchema";
import type { FetchProps } from "@/schemas/FetchSchema";

interface createUserProps extends MutationProps, FetchProps {
    payload: ClientPostProps
}

export default async function createUser<T>({ url, method, payload }: createUserProps) {
    const validate = ClientPostSchema.safeParse(payload);
    if (!validate.success) {
        return validate.error;
    } else {
        const data = await api[method]<T>(url, validate.data);
        return data.data;
    }
}