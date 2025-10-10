import { api } from "@/libs/axios";
import type { FetchProps } from "@/schemas/FetchSchema";

interface DeleteClientProps extends FetchProps  {
    payload: { id: number }
}


export default async function deleteUser<T>({ url, method, payload }: DeleteClientProps) {
    const data = await api[method]<T>(`${url}/${payload.id}`);
    return data.data;
}