import { api } from "@/libs/axios";
import type { MutationProps } from "@/schemas/MutationSchema";
import { ClientPostPatchSchema, type ClientPostPatchProps } from "@/schemas/ClientSchema";
import type { FetchProps } from "@/schemas/FetchSchema";

interface updateClientProps extends MutationProps, FetchProps {
    payload: ClientPostPatchProps
}

export default async function updateClient<T>({ url, method, payload }: updateClientProps) {
    const validate = ClientPostPatchSchema.safeParse(payload);
    if (!validate.success) {
        return validate.error;
    } else {
        const data = await api[method]<T>(`${url}/${payload.id}`, validate.data);
        return data.data;
    }
}