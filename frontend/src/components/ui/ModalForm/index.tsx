import { useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ClientPostPatchSchema, type ClientPostPatchProps } from "@/schemas/ClientSchema"
import Container from "@/components/layout/Container"
import Loading from "@/components/layout/Loanding"
import useApi from "@/hooks/useApi"
import Title from "../Title"
import Input from "../Input"
import Button from "../Button"

import x from "@/assets/icons/x.png"

interface ModalFormProps {
    openModal: boolean,
    onClose: () => void
    title: string,
    method: "post" | "patch",
    data?: ClientPostPatchProps
}

export default function ModalForm({ openModal, onClose, title, method, data }: ModalFormProps) {
    const [isLoading, setIsLoding] = useState(false);
    const { mutation } = useApi({ url: "/users" });
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ClientPostPatchProps>({
        resolver: zodResolver(ClientPostPatchSchema),
        defaultValues: {
            id: data?.id || undefined,
            name: data?.name || "",
            salary: data?.salary || undefined,
            companyValuation: data?.companyValuation || undefined,
        }
    });
    const onSubmit: SubmitHandler<ClientPostPatchProps> = async (data) => {
        setIsLoding(true);

        try {
            const response: any = await mutation.mutateAsync({ payload: data, method });
            const { createdAt, updatedAt, ...rest } = response;
            reset(method === "patch" ? rest : {});
        } catch (error) {
            console.log(error);
        } finally {
            onClose();
            setIsLoding(false);
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
                    <Title as="h6" heading="h6" className="mb-[15px]">{title}</Title>
                    <button className="duration-500 hover:rotate-90" onClick={onClose}>
                        <img 
                            src={x} 
                            alt="Fechar model de criação de novo cliente" 
                            className="w-3 h-3"
                        />
                    </button>
                </div>
                
                <form className="flex flex-col gap-2.5" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Input variant="md" placeholder="Digite o nome:" {...register("name")}/>
                        {errors.name && <p className="text-xs text-red-500">This field is required*</p>}
                    </div>
                    <div>
                        <Input 
                            variant="md" 
                            placeholder="Digite o salário:" 
                            pattern="[0-9]*"
                            inputMode="numeric"
                            {...register("salary", { valueAsNumber: true })}
                        />
                        {errors.salary && <p className="text-xs text-red-500">{errors.salary.message}*</p>}
                    </div>
                    <div>
                        <Input 
                            variant="md" 
                            placeholder="Digite o valor da empresa:"
                            pattern="[0-9]*"
                            inputMode="numeric"
                            {...register("companyValuation", { valueAsNumber: true })}
                        />
                        {errors.companyValuation && <p className="text-xs text-red-500">{errors.companyValuation.message}*</p>}
                    </div>
                    <Button size="md" type="submit">
                        {method === "patch" ? "Editar cliente" : "Criar cliente"}
                    </Button>
                </form>
            </div>
        </Container>
    )
}