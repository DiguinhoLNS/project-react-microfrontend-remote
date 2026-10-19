import * as yup from 'yup'
import type { IProduct } from '../../../interfaces/IProduct'
import type { IProductDataCreate } from '../../../interfaces/IProductData'
import type { IProductForm } from '../../../interfaces/IProductForm'
import { productCategories } from '../../../constants/categories'

export const productFormSchema = yup.object({
    name: yup
        .string()
        .trim()
        .required('O nome é obrigatório')
        .max(80, 'Use no máximo 80 caracteres'),

    description: yup
        .string()
        .max(200, 'Use no máximo 200 caracteres'),

    category: yup
        .string()
        .oneOf(productCategories.map(item => item.value), 'Selecione uma categoria')
        .required('Selecione uma categoria'),

    price: yup
        .number()
        .typeError('Informe um preço válido')
        .required('O preço é obrigatório')
        .min(0, 'O preço não pode ser negativo'),

    stock: yup
        .number()
        .typeError('Informe uma quantidade válida')
        .required('O estoque é obrigatório')
        .integer('Use um número inteiro')
        .min(0, 'O estoque não pode ser negativo'),

    active: yup.boolean()
})

export function productToForm(product?: IProduct | null): IProductForm {
    return {
        name: product?.name ?? '',
        description: product?.description ?? '',
        category: product?.category ?? '',
        price: product?.price ?? '',
        stock: product?.stock ?? '',
        active: product?.active ?? true
    }
}

export function formToProductData(values: IProductForm): IProductDataCreate {
    return {
        name: values.name.trim(),
        description: values.description.trim(),
        category: values.category as IProductDataCreate['category'],
        price: Number(values.price),
        stock: Number(values.stock),
        active: values.active
    }
}
