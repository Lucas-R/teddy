import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { FetchProps } from "@/schemas/FetchSchema";
import findAllUsers from "@/helpers/findAllUsers";
import createUser from "@/helpers/createUser";
import updateUser from "@/helpers/updateUser";
import deleteUser from "@/helpers/deleteUser";

export default function useApi<T = any>({ url, method, options }: FetchProps) {
    const queryClient = useQueryClient()
    
    const query = useQuery({
        queryKey: [url, options?.params],
        queryFn: async () => await findAllUsers<T>({ url, method, options }),
        enabled: method === 'get'
    });

    const mutation = useMutation({
        mutationFn: async (payload?: any) => {
            switch (method) {
                case 'post':
                    return await createUser({ url, method, payload });
                case 'patch':
                    return await updateUser({ url, method, payload });
                case 'delete':
                    return await deleteUser({ url, method });
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