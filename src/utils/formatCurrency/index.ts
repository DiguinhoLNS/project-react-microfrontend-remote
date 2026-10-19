const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
})

export default function formatCurrency(value: number) {
    return currencyFormatter.format(value)
}
