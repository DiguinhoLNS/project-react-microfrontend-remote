import clsx from 'clsx'
import { CloudAlert, PackageSearch, RotateCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import useProductsStore from '@/modules/products/store/productsStore'
import ProductsController from '@/modules/products/controllers/productsController'
import { useProductsQuery } from '@/modules/products/queries/productsQueries'
import ProductsListSkeleton from '../ListSkeleton'
import ProductRow from '../Row'

export default function ProductsList() {

    const { filters, clearFilters, setOpenModalCreateProduct } = useProductsStore()

    const { data: products, isPending, isError, isFetching, refetch } = useProductsQuery()

    const DATA = ProductsController.filterProducts(products, filters)

    const HAS_FILTERS = ProductsController.hasFilters(filters)

    return (

        <>
            <Card>
                <CardHeader>
                    <CardTitle>Catálogo</CardTitle>

                    <CardDescription>
                        {isPending ? 'Carregando produtos...' : `${DATA.length} de ${products?.length ?? 0} produtos`}
                    </CardDescription>

                    <CardAction>
                        {isFetching && !isPending && <Spinner className={clsx('text-muted-foreground')} />}
                    </CardAction>
                </CardHeader>

                <CardContent className={clsx('px-0')}>
                    {isError && !products ? (
                        <Empty>
                            <EmptyHeader>
                                <EmptyMedia variant='icon'>
                                    <CloudAlert />
                                </EmptyMedia>

                                <EmptyTitle>Não foi possível carregar os produtos</EmptyTitle>
                                <EmptyDescription>Verifique sua conexão e tente novamente.</EmptyDescription>
                            </EmptyHeader>

                            <EmptyContent>
                                <Button
                                    variant='outline'
                                    onClick={() => refetch()}
                                >
                                    <RotateCw />
                                    Tentar novamente
                                </Button>
                            </EmptyContent>
                        </Empty>
                    ) : !isPending && DATA.length === 0 ? (
                        <Empty>
                            <EmptyHeader>
                                <EmptyMedia variant='icon'>
                                    <PackageSearch />
                                </EmptyMedia>

                                <EmptyTitle>{HAS_FILTERS ? 'Nenhum produto encontrado' : 'Nenhum produto cadastrado'}</EmptyTitle>
                                <EmptyDescription>
                                    {HAS_FILTERS
                                        ? 'Ajuste a busca ou os filtros para ver outros resultados.'
                                        : 'Cadastre o primeiro produto para começar.'}
                                </EmptyDescription>
                            </EmptyHeader>

                            <EmptyContent>
                                {HAS_FILTERS ? (
                                    <Button
                                        variant='outline'
                                        onClick={clearFilters}
                                    >
                                        Limpar filtros
                                    </Button>
                                ) : (
                                    <Button onClick={() => setOpenModalCreateProduct(true)}>
                                        Novo produto
                                    </Button>
                                )}
                            </EmptyContent>
                        </Empty>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Produto</TableHead>
                                    <TableHead>Categoria</TableHead>
                                    <TableHead className={clsx('text-right')}>Preço</TableHead>
                                    <TableHead className={clsx('text-right')}>Estoque</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className={clsx('text-right')}>Ações</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {isPending && <ProductsListSkeleton />}

                                {DATA.map(item => (
                                    <ProductRow
                                        key={item.id}
                                        data={item}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </>

    )

}
