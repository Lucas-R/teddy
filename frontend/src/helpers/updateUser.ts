import { api } from "@/libs/axios";
import type { FetchProps } from "@/schemas/FetchSchema";
import { UserPutSchema, type UserPutProps } from "@/schemas/UserSchema";

interface updateUserProps extends FetchProps {
    payload: UserPutProps
}

export default async function updateUser<T>({ url, method, payload }: updateUserProps) {
    const validate = UserPutSchema.safeParse(payload);
    if (!validate.success) {
        return validate.error;
    } else {
        const data = await api[method]<T>(url, validate.data);
        return data.data;
    }
}