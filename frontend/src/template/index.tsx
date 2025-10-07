import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Outlet } from "@tanstack/react-router";

const queryClient = new QueryClient()

export default function Template() {
    return (
        <QueryClientProvider client={queryClient}>
            <Outlet />
        </QueryClientProvider>
    )
}