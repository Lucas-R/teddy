import { useQuery } from "@tanstack/react-query";
import type { UseApiProps } from "@/schemas/UseApiSchema";
import getUsers from "@/helpers/getUsers";

export default function useApi<T = any>({ url }: UseApiProps) {
    const query = useQuery({
        queryKey: [url],
        queryFn: async () => await getUsers<T>(url)
    })

    return { query }
}