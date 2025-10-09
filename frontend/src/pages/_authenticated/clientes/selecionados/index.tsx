import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/clientes/selecionados/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/clientes/selecionados/"!</div>
}
