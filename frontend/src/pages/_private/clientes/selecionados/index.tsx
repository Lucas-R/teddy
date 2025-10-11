import { useEffect, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router'
import useClient from '@/hooks/useClient'
import type { ClientProps } from '@/schemas/ClientSchema';
import { api } from '@/libs/axios';
import Card from '@/components/ui/Card';

export const Route = createFileRoute('/_private/clientes/selecionados/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [selected, setSelected] = useState<ClientProps[]>([]);
  const { remove, selectedList } = useClient();

  async function handleList() {
    const data = await Promise.all(
      selectedList.map(async id => {
        try {
          const response = await api.get(`/users/${id}`);
          return response.data as ClientProps;
        } catch (error) {
          console.log(`Erro ao buscar cliente ${id}:`, error);
          return null;
        }
      })
    );

    setSelected(data.filter(item => item !== null));
  }
  
  useEffect(() => {
    handleList();
  }, [selectedList]);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-5 lg:grid-cols-4 mb-5">
      {selected.map((client) => (
          <Card 
            key={client.id} 
            data={client}
            select={() => remove(client.id)}
          />
        ))
      } 
    </div>
  )
}
