import { createFileRoute } from '@tanstack/react-router'
import Container from '@/components/layout/Container'

export const Route = createFileRoute('/_private/_home/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Container>
      <div>Hello "/_authenticated/home/"!</div>
    </Container>
  )
}
