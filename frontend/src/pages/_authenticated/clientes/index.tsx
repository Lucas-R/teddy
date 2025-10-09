import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/clientes/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/clientes/"!</div>
}
