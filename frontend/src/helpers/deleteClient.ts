import { api } from "@/libs/axios";
import type { FetchProps } from "@/schemas/FetchSchema";
import type { MutationProps } from "@/schemas/MutationSchema";

interface DeleteClientProps extends MutationProps, FetchProps  {}


export default async function deleteClient<T>({ url, method, payload }: DeleteClientProps) {
    const data = await api[method]<T>(`${url}/${payload.id}`);
    return data.data;
}