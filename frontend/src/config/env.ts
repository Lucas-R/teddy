import type { EnvProps } from "@/schemas/EnvSchema";

export const env: EnvProps = {
    api: import.meta.env.VITE_API_URL
}