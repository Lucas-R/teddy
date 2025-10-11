import { createFileRoute } from '@tanstack/react-router'
import type { ClientProps } from '@/schemas/ClientSchema';
import { formatToBRL } from '@/helpers/formatToBRL';
import { formatDate } from '@/helpers/formatDate';
import useApi from '@/hooks/useApi';
import Loading from '@/components/layout/Loanding';

export const Route = createFileRoute('/_private/clientes/detalhes/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams();
  const { data, isLoading, isError } = useApi<ClientProps>({ url: `/users/${id}` });

  if (isError || !data) return null;
  
  if(isLoading) return <Loading />

  return (
    <div>
      <p><span className="text-primary">ID:</span> {data.id}</p>
      <p><span className="text-primary">Nome:</span> {data.name}</p>
      <p><span className="text-primary">Salário:</span> {formatToBRL(data.salary)}</p>
      <p><span className="text-primary">Avaliação:</span> {formatToBRL(data.companyValuation)}</p>
      <p><span className="text-primary">Criado em:</span> {formatDate(data.createdAt)}</p>
      <p><span className="text-primary">Atualizado em:</span> {formatDate(data.updatedAt)}</p>
    </div>
  )
}
