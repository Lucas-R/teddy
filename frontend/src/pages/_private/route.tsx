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
      <h1> Private </h1>
      <Outlet />
    </>
  )
}
