import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_private/clientes/selecionados/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/clientes/selecionados/"!</div>
}
