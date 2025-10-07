import { api } from "@/libs/axios";

export default async function getUsers<T>(url: string) {
    const data = await api.get<T>(url);
    return data;
}