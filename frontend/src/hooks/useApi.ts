import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { MutationProps } from "@/schemas/MutationSchema";
import type { FetchProps } from "@/schemas/FetchSchema";
import findAllUsers from "@/helpers/findAllUsers";
import createUser from "@/helpers/createUser";
import updateUser from "@/helpers/updateUser";
import deleteUser from "@/helpers/deleteUser";

export default function useApi<T = any>({ url, options }: FetchProps) {
    const queryClient = useQueryClient()
    
    const query = useQuery({
        queryKey: [url, options?.params],
        queryFn: async () => await findAllUsers<T>({ url, options }),
        enabled: true
    });

    const mutation = useMutation({
        mutationFn: async ({ payload, method }: MutationProps) => {
            switch (method) {
                case 'post':
                    return await createUser({ url, method, payload });
                case 'patch':
                    return await updateUser({ url, method, payload });
                case 'delete':
                    return await deleteUser({ url, method, payload });
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