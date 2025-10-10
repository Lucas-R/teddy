import { formatToBRL } from "@/helpers/formatToBRL";

import plus from "@/assets/icons/plus.png"
import pen from "@/assets/icons/pen.png"
import trash from "@/assets/icons/trash.png"

export default function Card() {
    return (
        <button className="py-[15px] px-4 bg-white rounded-sm shadow-sm shadow-black/10 duration-300 hover:scale-105">
            <div className="grid grid-rows-1 gap-2.5 mb-[15px]">
                <h4 className="font-bold">Lucas Rodrigues</h4>
                <p>Salário: {formatToBRL(1000)}</p>
                <p>Empresa: {formatToBRL(120000)}</p>   
            </div>
            <div className="flex items-center justify-between">
                <button>
                    <img src={plus} alt="Adicionar cliente aos selecionados" className="w-4 h-4" />
                </button>
                <button>
                    <img src={pen} alt="Editar cliente" className="w-5 h-5" />
                </button>
                <button>
                    <img src={trash} alt="Excluir cliente" className="w-5 h-5" />
                </button>
            </div>
        </button>
    )
}