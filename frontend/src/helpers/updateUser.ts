import { api } from "@/libs/axios";
import type { FetchProps } from "@/schemas/FetchSchema";
import { ClientPutSchema, type ClientPutProps } from "@/schemas/ClientSchema";

interface updateUserProps extends FetchProps {
    payload: ClientPutProps
}

export default async function updateUser<T>({ url, method, payload }: updateUserProps) {
    const validate = ClientPutSchema.safeParse(payload);
    if (!validate.success) {
        return validate.error;
    } else {
        const data = await api[method]<T>(url, validate.data);
        return data.data;
    }
}