import { useState } from "react"
import { type ClientProps } from "@/schemas/ClientSchema"
import Container from "@/components/layout/Container"
import Loading from "@/components/layout/Loanding"
import useApi from "@/hooks/useApi"
import Title from "../Title"
import Button from "../Button"

import x from "@/assets/icons/x.png"
import useClient from "@/hooks/useClient"

interface ModalFormProps {
    openModal: boolean,
    onClose: () => void
    data: ClientProps
}

export default function ModalDelete({ openModal, onClose, data }: ModalFormProps) {
    const { included, remove } = useClient();
    const [isLoading, setIsLoding] = useState(false);
    const { mutation } = useApi({ url: "/users" });

    async function handleDelete() {
        setIsLoding(true);

        try {
            await mutation.mutateAsync({ payload: { id: data.id }, method: "delete" });
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoding(false);
            if(included(data.id)) remove(data.id);
        }
    }

    if (isLoading) return <Loading />

    return (
        <Container size="full" className={`
            fixed top-0 left-0 z-50 flex items-center justify-center w-full h-screen bg-black/30 duration-500
            ${openModal ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}>
            <div className="w-full max-w-[400px] bg-white rounded-sm p-5">
                <div className="flex items-center justify-between">
                    <Title as="h6" heading="h6" className="mb-[15px]">Excluir cliente:</Title>
                    <button className="duration-500 hover:rotate-90" onClick={onClose}>
                        <img 
                            src={x} 
                            alt="Fechar model de criação de novo cliente" 
                            className="w-3 h-3"
                        />
                    </button>
                </div>
                
                <div className="flex flex-col gap-2.5">
                    <p>Você está prestes a excluir o cliente: <strong>{data.name}</strong></p>
                    <Button size="md" onClick={handleDelete}>
                        Excluir cliente
                    </Button>
                </div>
            </div>
        </Container>
    )
}