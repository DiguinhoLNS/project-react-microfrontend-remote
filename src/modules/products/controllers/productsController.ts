import emitHostEvent from '@/modules/host/utils/emitHostEvent'
import filterString from '@/utils/filterString'
import ProductsService from '../services/productsService'
import { ALL_FILTER } from '../constants/filters'
import type { IRequestOptions } from '@/modules/api/interfaces/IRequestOptions'
import type { IProduct } from '../interfaces/IProduct'
import type { IProductsFilters } from '../interfaces/IProductsFilters'
import type { IProductsSummary } from '../interfaces/IProductsSummary'

export default class ProductsController {

    public static async getProducts(options?: IRequestOptions) {
        const products = await ProductsService.getProducts(options)

        emitHostEvent({ type: 'products:loaded', payload: { total: products.length } })

        return products
    }

    public static filterProducts(products: IProduct[] = [], filters: IProductsFilters) {
        const search = filters.search.trim()

        return products.filter(product => {
            if (search && !filterString(product.name, search) && !filterString(product.description, search)) return false

            if (filters.category !== ALL_FILTER && product.category !== filters.category) return false

            if (filters.status === 'ACTIVE' && !product.active) return false

            if (filters.status === 'INACTIVE' && product.active) return false

            return true
        })
    }

    public static hasFilters(filters: IProductsFilters) {
        return !!filters.search.trim() || filters.category !== ALL_FILTER || filters.status !== ALL_FILTER
    }

    public static getProductsSummary(products: IProduct[] = []): IProductsSummary {
        return {
            total: products.length,
            active: products.filter(product => product.active).length,
            outOfStock: products.filter(product => product.stock === 0).length,
            stockValue: products.reduce((total, product) => total + product.stock * product.price, 0)
        }
    }

}
