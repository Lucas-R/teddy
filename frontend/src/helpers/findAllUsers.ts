import { api } from "@/libs/axios";
import type { FetchProps } from "@/schemas/FetchSchema";

export default async function findAllUsers<T>({ url, method, options }: FetchProps) {
    const data = await api[method]<T>(url, options);
    return data.data;
}