import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Container from "@/components/layout/Container";
import Menu from "@/components/layout/Menu";

const queryClient = new QueryClient();

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="min-h-screen">
                <Menu />
                <Container>
                    {children}
                </Container>
            </div>
        </QueryClientProvider>
    )
}