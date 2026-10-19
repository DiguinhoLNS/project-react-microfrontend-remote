import { apiMock } from '@/modules/api'
import { productsSeed } from '../mocks/productsSeed'
import type { IRequestOptions } from '@/modules/api/interfaces/IRequestOptions'
import type { IProduct } from '../interfaces/IProduct'
import type { IProductDataCreate, IProductDataUpdate } from '../interfaces/IProductData'

apiMock.registerCollection('products', productsSeed)

export default class ProductsService {

    public static async getProducts(options?: IRequestOptions) {
        return await apiMock.get<IProduct[]>('products', options)
    }

    public static async createProduct(data: IProductDataCreate) {
        return await apiMock.post<IProduct, IProductDataCreate>('products', data)
    }

    public static async updateProduct(id: string, data: IProductDataUpdate) {
        return await apiMock.patch<IProduct, IProductDataUpdate>(`products/${id}`, data)
    }

    public static async deleteProduct(id: string) {
        return await apiMock.delete(`products/${id}`)
    }

}
