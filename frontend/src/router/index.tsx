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

function InnerRouter() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }}/>;
}

export default function Router() {
  return (
    <AuthProvider>
      <InnerRouter />
    </AuthProvider>
  )
}