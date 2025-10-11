import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { formatToBRL } from "@/helpers/formatToBRL";
import type { ClientGetProps } from "@/schemas/ClientSchema";
import useApi from "@/hooks/useApi";
import ModalForm from "../ModalForm";

import plus from "@/assets/icons/plus.png"
import pen from "@/assets/icons/pen.png"
import trash from "@/assets/icons/trash.png"
import Loading from "@/components/layout/Loanding";
import Title from "../Title";

interface CardProps {
    data: ClientGetProps
}

export default function Card({ data }: CardProps) {
    const [updateModal, setUpdateModal] = useState(false);
    const [isLoading, setIsLoding] = useState(false);
    const { mutation } = useApi({ url: '/users' });

    async function handleDelete(id: number) {
        setIsLoding(true);

        try {
            await mutation.mutateAsync({ payload: { id }, method: "delete" });
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoding(false);
        }
    }

    if (isLoading) return <Loading />

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

                <div className="relative z-50 pb-[15px] px-4 flex items-center justify-between">
                    <button 
                        className="p-1 rounded-full hover:bg-emerald-300"
                    >
                        <img src={plus} alt="Adicionar cliente aos selecionados" className="w-4 h-4" />
                    </button>
                    <button 
                        className="p-1 rounded-full hover:bg-black/30"
                        onClick={() => setUpdateModal(true)}
                    >
                        <img src={pen} alt="Editar cliente" className="w-5 h-5" />
                    </button>
                    <button 
                        className="p-1 rounded-full hover:bg-red-300"
                        onClick={() => handleDelete(data.id)}
                        >
                        
                        <img src={trash} alt="Excluir cliente" className="w-5 h-5" />
                    </button>
                </div>
            </div>
            <ModalForm 
                title="Editar cliente:" 
                openModal={updateModal}
                onClose={() => setUpdateModal(false)}
                method="patch"
                data={data}
            />
        </>
    )
}