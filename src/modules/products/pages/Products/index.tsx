import clsx from 'clsx'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import PageHeader from '@/components/page/PageHeader'
import HostInfo from '@/modules/host/components/HostInfo'
import { useProductsQuery } from '../../queries/productsQueries'

export default function Products() {

    const { data: products, isPending, isError, error } = useProductsQuery()

    return (

        <>
            <div className={clsx('flex flex-col gap-6')}>
                <PageHeader
                    title='Produtos'
                    description='Microfrontend React + Vite carregado em runtime.'
                />

                <HostInfo />

                <Card>
                    <CardHeader>
                        <CardTitle>API mock</CardTitle>

                        {isPending && <Skeleton className={clsx('h-5 w-48')} />}

                        {isError && <CardDescription>{error.message}</CardDescription>}

                        {!!products && (
                            <CardDescription>
                                {products.length} produtos carregados via React Query.
                            </CardDescription>
                        )}
                    </CardHeader>
                </Card>
            </div>
        </>

    )

}
