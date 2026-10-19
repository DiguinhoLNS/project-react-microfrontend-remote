import type { TProductCategory } from './TProductCategory'

export type TProductStatusFilter = 'ALL' | 'ACTIVE' | 'INACTIVE'

export type TProductCategoryFilter = 'ALL' | TProductCategory

export interface IProductsFilters {
    search: string
    category: TProductCategoryFilter
    status: TProductStatusFilter
}
