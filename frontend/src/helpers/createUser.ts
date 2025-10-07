import { api } from "@/libs/axios";
import type { FetchProps } from "@/schemas/FetchSchema";
import { UserPostSchema, type UserPostProps } from "@/schemas/UserSchema";

interface createUserProps extends FetchProps {
    payload: UserPostProps
}

export default async function createUser<T>({ url, method, payload }: createUserProps) {
    const validate = UserPostSchema.safeParse(payload);
    if (!validate.success) {
        return validate.error;
    } else {
        const data = await api[method]<T>(url, validate.data);
        return data.data;
    }
}