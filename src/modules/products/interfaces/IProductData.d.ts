import type { IProduct } from './IProduct'

export type IProductDataCreate = Omit<IProduct, 'id' | 'createdAt' | 'updatedAt'>

export type IProductDataUpdate = Partial<IProductDataCreate>
