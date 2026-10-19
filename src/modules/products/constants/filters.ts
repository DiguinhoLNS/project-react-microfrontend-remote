import { productCategories } from './categories'
import type { IProductsFilters, TProductCategoryFilter, TProductStatusFilter } from '../interfaces/IProductsFilters'

export const ALL_FILTER = 'ALL'

export const DEFAULT_PRODUCTS_FILTERS: IProductsFilters = {
    search: '',
    category: ALL_FILTER,
    status: ALL_FILTER
}

export const categoryFilterItems: { label: string, value: TProductCategoryFilter }[] = [
    {
        label: 'Todas as categorias',
        value: ALL_FILTER
    },
    ...productCategories
]

export const statusFilterItems: { label: string, value: TProductStatusFilter }[] = [
    {
        label: 'Todos os status',
        value: ALL_FILTER
    },
    {
        label: 'Ativos',
        value: 'ACTIVE'
    },
    {
        label: 'Inativos',
        value: 'INACTIVE'
    }
]
