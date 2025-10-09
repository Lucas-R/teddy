import Menu from '@/components/layout/Menu'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_private')({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
        throw redirect({
            to: '/login',
        })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Menu />
      <Outlet />
    </>
  )
}
