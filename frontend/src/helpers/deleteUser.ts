import { api } from "@/libs/axios";
import type { FetchProps } from "@/schemas/FetchSchema";

export default async function deleteUser<T>({ url, method }: FetchProps) {
    const data = await api[method]<T>(url);
    return data.data;
}