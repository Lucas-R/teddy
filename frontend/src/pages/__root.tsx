import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import type { AuthProps } from '@/schemas/AuthSchema';

interface RouterContext {
    auth: AuthProps
}

export const Route = createRootRouteWithContext<RouterContext>()({ 
    component: () => (
        <Outlet />
    )
});