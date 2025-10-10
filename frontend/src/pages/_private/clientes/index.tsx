import { createFileRoute } from '@tanstack/react-router'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

import chevronDown from '@/assets/icons/chevron-down.png'

export const Route = createFileRoute('/_private/clientes/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm md:text-lg">
          <strong>16</strong> clientes encontrados:
        </p>

        <div className="flex items-center gap-2">
          <p className="text-sm md:text-lg">Clientes por página:</p>
          <button className="flex items-center justify-center gap-1 text-xs py-1 px-2 rounded-sm border-2 border-border">
            16
            <img 
              src={chevronDown} 
              alt="Escolha quantos mostrar por pagina"
              className="w-4 h-4" 
            />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-5 lg:grid-cols-4 mb-5">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>

      <div className="flex flex-col gap-5">
        <Button theme="outline"> Criar cliente </Button>

        <div className="flex items-center justify-center">
          <span className="block w-9 h-9"></span>
          <span className="block w-9 h-9"></span>
          <span className="block w-9 h-9"></span>
          <span className="block w-9 h-9"></span>
          <button className="w-9 h-9 bg-primary text-white rounded-sm">1</button>
          <button className="w-9 h-9 rounded-sm">2</button>
          <button className="w-9 h-9 rounded-sm">3</button>
          <button className="w-9 h-9 rounded-sm">4</button>
          <button className="w-9 h-9 rounded-sm">5</button>
        </div>
      </div>
    </div>
  )
}
