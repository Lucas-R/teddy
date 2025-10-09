import { createRouter, RouterProvider } from "@tanstack/react-router"
import { AuthProvider } from "@/contexts/auth";
import { useAuth } from "@/hooks/useAuth";
import { routeTree } from "@/routeTree.gen"

const router = createRouter({ 
  routeTree,
  context: {
    auth: undefined!
  },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export default function Router() {
  const auth = useAuth();
  
  return (
    <AuthProvider>
      <RouterProvider router={router} context={{ auth }}/>
    </AuthProvider>
  )
}