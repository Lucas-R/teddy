import { createFileRoute } from '@tanstack/react-router'
import Loading from '@/components/layout/Loanding';
import useApi from '@/hooks/useApi';
import type { ClientGetProps } from '@/schemas/ClientSchema';

export const Route = createFileRoute('/_private/clientes/detalhes/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams();
  const { data, isLoading } = useApi<ClientGetProps>({ url: `/users/${id}` });

  if(isLoading) return <Loading />

  return (
    <div>
      {data?.id}
      {data?.name}
      {data?.salary}
      {data?.companyValuation}
      {data?.updatedAt}
      {data?.createdAt}
    </div>
  )
}
