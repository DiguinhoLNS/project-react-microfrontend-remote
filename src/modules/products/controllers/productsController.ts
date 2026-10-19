import emitHostEvent from '@/modules/host/utils/emitHostEvent'
import ProductsService from '../services/productsService'
import type { IRequestOptions } from '@/modules/api/interfaces/IRequestOptions'

export default class ProductsController {

    public static async getProducts(options?: IRequestOptions) {
        const products = await ProductsService.getProducts(options)

        emitHostEvent({ type: 'products:loaded', payload: { total: products.length } })

        return products
    }

}
