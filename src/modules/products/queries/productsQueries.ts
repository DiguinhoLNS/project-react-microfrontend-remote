import { queryOptions, useQuery } from '@tanstack/react-query'
import ProductsController from '../controllers/productsController'

export const productsKeys = {
    all: ['products'] as const,
    list: () => [...productsKeys.all, 'list'] as const
}

export const productsQueries = {
    list: () => queryOptions({
        queryKey: productsKeys.list(),
        queryFn: ({ signal }) => ProductsController.getProducts({ signal })
    })
}

export function useProductsQuery() {
    return useQuery(productsQueries.list())
}
