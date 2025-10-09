import type { AuthProps } from '@/schemas/AuthSchema';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'

interface RouterContext {
    auth: AuthProps
}

export const Route = createRootRouteWithContext<RouterContext>()({ 
    component: () => {
        <Outlet />
    } 
});