import { api } from "@/libs/axios";
import type { FetchProps } from "@/schemas/FetchSchema";
import type { MutationProps } from "@/schemas/MutationSchema";

interface DeleteClientProps extends MutationProps, FetchProps  {
    payload: { id: number }
}


export default async function deleteUser<T>({ url, method, payload }: DeleteClientProps) {
    const data = await api[method]<T>(`${url}/${payload}`);
    return data.data;
}