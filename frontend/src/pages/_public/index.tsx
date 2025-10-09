import { createFileRoute, redirect } from '@tanstack/react-router'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema, type LoginProps } from '@/schemas/LoginSchema'
import Container from '@/components/layout/Container'
import Title from '@/components/ui/Title'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useAuth } from '@/hooks/useAuth'

export const Route = createFileRoute('/_public/')({
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: "/clientes" })
    }
  },
  component: Login,
})

function Login() {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>({
    resolver: zodResolver(LoginSchema),
  });
  const onSubmit: SubmitHandler<LoginProps> = (data) => {
    login(data);
  }

  return (
    <header>
      <Container className="h-screen flex flex-col items-center justify-center gap-5">
          <Title as="h1" heading="h1" className="text-center text-2xl lg:text-4xl"> Olá, seja bem-vindo! </Title>
          <form 
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-[553px] flex flex-col items-center justify-center gap-5"
            >
            <div className="w-full">
              <Input placeholder="Digite seu nome" {...register("name")}/>
              {errors.name && <p className="text-xs text-red-500">This field is required*</p>}
            </div>
            <Button className="w-full" type="submit">Entrar</Button>
          </form>
      </Container>
    </header>
  )
}