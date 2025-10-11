import { api } from "@/libs/axios";
import type { FetchProps } from "@/schemas/FetchSchema";

export default async function findAllUsers<T>({ url, options }: FetchProps) {
    const data = await api.get<T>(url, options);
    return data.data;
}