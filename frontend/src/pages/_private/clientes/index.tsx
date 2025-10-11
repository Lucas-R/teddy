import { useEffect, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import useApi from '@/hooks/useApi'
import type { ClientProps } from '@/schemas/ClientSchema'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Loading from '@/components/layout/Loanding'
import ModalForm from '@/components/ui/ModalForm'


export const Route = createFileRoute('/_private/clientes/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [createModal, setCreateModal] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(16);
  const [totalPages, setTotalPages] = useState<number[]>([]);
  const [clients, setClients] = useState<ClientProps[]>([]);
  const { data, isLoading } = useApi({ 
    url: "/users", 
    options: {
      params: {
        page,
        limit
      }
    }
  });

  useEffect(() => {
    if(data) {
      const pages = Array.from({ length: data.totalPages }, (_, i) => i + 1);
      setClients(data.clients);
      setTotal(data.clients.length);
      setPage(data.currentPage)
      setTotalPages(pages)
    }
  }, [data]);

  if(isLoading) return <Loading />

  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm md:text-lg">
            <strong>{total}</strong> clientes encontrados:
          </p>

          <div className="flex items-center gap-2">
            <p className="text-sm md:text-lg">Clientes por página:</p>
            <select
              id="client"
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="flex items-center justify-center gap-1 text-xs py-1 px-2 rounded-sm border-2 border-border"
              >
              <option value="1">1</option>
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="16">16</option>
              <option value="32">32</option>
            </select>
            {/* <button 
              className="flex items-center justify-center gap-1 text-xs py-1 px-2 rounded-sm border-2 border-border"
              >
              16
              <img 
              src={chevronDown} 
              alt="Escolha quantos mostrar por pagina"
              className="w-4 h-4" 
              />
              </button> */}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-5 lg:grid-cols-4 mb-5">
          {!!clients && clients.map((client) => (
            <Card key={client.id} data={client}/>
          ))
        }
        </div>

        <div className="flex flex-col gap-5">
          <Button theme="outline" onClick={() => setCreateModal(true)}> Criar cliente </Button>

          <div className="flex items-center justify-center">
            {totalPages.map(p => (
              <button 
              key={p}
              className={`w-9 h-9 rounded-sm ${page === p && "bg-primary text-white"}`}
              onClick={() => setPage(p)}
              >{p}</button>
            ))}
          </div>
        </div>
      </div>
      <ModalForm 
        title="Criar cliente:" 
        openModal={createModal}
        onClose={() => setCreateModal(false)}
        method="post"
      />
    </>
  )
}
