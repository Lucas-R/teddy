import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { formatToBRL } from "@/helpers/formatToBRL";
import type { ClientProps } from "@/schemas/ClientSchema";
import ModalForm from "../ModalForm";
import ModalDelete from "../ModalDelete";
import Title from "../Title";

import plus from "@/assets/icons/plus.png"
import minus from "@/assets/icons/minus.png"
import pen from "@/assets/icons/pen.png"
import trash from "@/assets/icons/trash.png"
import useClient from "@/hooks/useClient";

interface CardProps {
    data: ClientProps,
    select: () => void,
    actions?: boolean 
}

export default function Card({ data, select, actions = true }: CardProps) {
    const { included } = useClient();
    const [isSelected, setIsSelected] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    useEffect(() => {
        setIsSelected(included(data.id))
    }, []);

    function  handleSelect() {
        select();
        setIsSelected(prev => !prev);
    }

    return (
        <>
            <div 
                className="relative z-40 bg-white rounded-sm shadow-sm shadow-black/10 duration-300 hover:scale-105"
            >
                <Link 
                    className="grid grid-rows-1 gap-2.5 pt-[15px] px-4 mb-[11px]"
                    to="/clientes/detalhes/$id" 
                    params={{ id: `${data.id}` }}
                >
                    <Title as="h6" heading="h6" className="text-center">{data.name}</Title>
                    <p className="text-center">Salário: {formatToBRL(data.salary)}</p>
                    <p className="text-center">Empresa: {formatToBRL(data.companyValuation)}</p>   
                </Link>

                <div className={`
                    relative z-50 pb-[15px] px-4 flex items-center
                    ${actions ? "justify-between" : "justify-end"}
                `}>
                   {actions 
                   ? (
                    <>
                        <button 
                            className="p-1 rounded-full hover:bg-emerald-300"
                            onClick={handleSelect}
                        >
                            {isSelected
                                ? <img src={minus} alt="Adicionar cliente aos selecionados" className="w-4 h-4" />
                                : <img src={plus} alt="Adicionar cliente aos selecionados" className="w-4 h-4" />
                            }
                            
                        </button>
                        <button 
                            className="p-1 rounded-full hover:bg-black/30"
                            onClick={() => setUpdateModal(true)}
                        >
                            <img src={pen} alt="Editar cliente" className="w-5 h-5" />
                        </button>
                        <button 
                            className="p-1 rounded-full hover:bg-red-300"
                            onClick={() => setDeleteModal(true)}
                            >
                            
                            <img src={trash} alt="Excluir cliente" className="w-5 h-5" />
                        </button>
                    </>
                   )
                   : (
                        <button 
                            className="p-1 rounded-full hover:bg-emerald-300"
                            onClick={handleSelect}
                        >
                            <img src={minus} alt="Adicionar cliente aos selecionados" className="w-4 h-4" />  
                        </button>
                   )
                   }
                    
                </div>
            </div>
            <ModalForm 
                title="Editar cliente:" 
                openModal={updateModal}
                onClose={() => setUpdateModal(false)}
                method="patch"
                data={data}
            />
            <ModalDelete
                openModal={deleteModal}
                onClose={() => setDeleteModal(false)}
                data={data}
            />
        </>     
    )
}