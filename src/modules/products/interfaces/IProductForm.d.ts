import type { TProductCategory } from './TProductCategory'

export interface IProductForm {
    name: string
    description: string
    category: TProductCategory | ''
    price: number | ''
    stock: number | ''
    active: boolean
}
