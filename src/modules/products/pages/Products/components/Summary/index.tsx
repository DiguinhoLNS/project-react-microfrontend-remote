import clsx from 'clsx'
import { CircleCheck, Package, PackageX, Wallet } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import ProductsController from '@/modules/products/controllers/productsController'
import { useProductsQuery } from '@/modules/products/queries/productsQueries'
import formatCurrency from '@/utils/formatCurrency'

export default function ProductsSummary() {

    const { data: products, isPending } = useProductsQuery()

    const SUMMARY = ProductsController.getProductsSummary(products)

    const ITEMS = [
        { label: 'Produtos', value: String(SUMMARY.total), icon: Package },
        { label: 'Ativos', value: String(SUMMARY.active), icon: CircleCheck },
        { label: 'Sem estoque', value: String(SUMMARY.outOfStock), icon: PackageX },
        { label: 'Valor em estoque', value: formatCurrency(SUMMARY.stockValue), icon: Wallet }
    ]

    return (

        <>
            <div className={clsx('grid grid-cols-2 gap-4 lg:grid-cols-4')}>
                {ITEMS.map(item => (
                    <Card
                        key={item.label}
                        size='sm'
                    >
                        <CardHeader>
                            <CardDescription>{item.label}</CardDescription>

                            <CardTitle className={clsx('text-xl font-semibold tabular-nums')}>
                                {isPending ? <Skeleton className={clsx('h-7 w-20')} /> : item.value}
                            </CardTitle>

                            <CardAction>
                                <item.icon className={clsx('size-4 text-muted-foreground')} />
                            </CardAction>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </>

    )

}
