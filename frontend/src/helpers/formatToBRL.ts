export function formatToBRL(value: number | undefined) {
    if(!value) return "R$ -";
    
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
}