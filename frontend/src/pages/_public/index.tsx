import { createFileRoute, redirect } from '@tanstack/react-router'
import Container from '@/components/layout/Container'
import Title from '@/components/ui/Title'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export const Route = createFileRoute('/_public/')({
  validateSearch: (search) => ({
    redirect: (search.redirect as string) || '/',
  }),
  beforeLoad: ({ context, search }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: search.redirect })
    }
  },
  component: Login,
})

function Login() {
  return (
    <header>
      <Container className="max-w-[553px]! h-screen flex flex-col items-center justify-center gap-5">
          <Title as="h1" heading="h1" className="text-center text-2xl lg:text-4xl"> Olá, seja bem-vindo! </Title>
          <Input placeholder="Digite seu nome"/>
          <Button className="w-full">Entrar</Button>
      </Container>
    </header>
  )
}