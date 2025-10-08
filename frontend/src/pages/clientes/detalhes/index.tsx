import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/clientes/detalhes/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/clientes/detalhes/"!</div>
}
