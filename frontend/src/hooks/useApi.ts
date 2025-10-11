import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { MutationProps } from "@/schemas/MutationSchema";
import type { FetchProps } from "@/schemas/FetchSchema";
import findAllClients from "@/helpers/findAllClients";
import createClient from "@/helpers/clientUser";
import updateClient from "@/helpers/updateClient";
import deleteClient from "@/helpers/deleteClient";

export default function useApi<T = any>({ url, options }: FetchProps) {
    const queryClient = useQueryClient()
    
    const query = useQuery({
        queryKey: [url, options?.params],
        queryFn: async () => await findAllClients<T>({ url, options }),
        enabled: true
    });

    const mutation = useMutation({
        mutationFn: async ({ payload, method }: MutationProps) => {
            switch (method) {
                case 'post':
                    return await createClient({ url, method, payload });
                case 'patch':
                    return await updateClient({ url, method, payload });
                case 'delete':
                    return await deleteClient({ url, method, payload });
                default:
                throw new Error('Método inválido para mutation')
            }
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [url] }),
    })

    return {
        ...query,
        data: query.data,
        mutation
    }
}