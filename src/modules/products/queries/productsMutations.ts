import { useMutation, useQueryClient } from '@tanstack/react-query'
import emitHostEvent from '@/modules/host/utils/emitHostEvent'
import ProductsService from '../services/productsService'
import { productsKeys } from './productsQueries'
import type { IProduct } from '../interfaces/IProduct'
import type { IProductDataCreate, IProductDataUpdate } from '../interfaces/IProductData'

export function useCreateProductMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: [...productsKeys.all, 'create'],
        mutationFn: (data: IProductDataCreate) => ProductsService.createProduct(data),
        meta: { successMessage: 'Produto criado.' },
        onSuccess: (product) => {
            queryClient.invalidateQueries({ queryKey: productsKeys.all })

            emitHostEvent({ type: 'product:created', payload: { id: product.id, name: product.name } })
        }
    })
}

export function useUpdateProductMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: [...productsKeys.all, 'update'],
        mutationFn: ({ id, data }: { id: string, data: IProductDataUpdate }) => ProductsService.updateProduct(id, data),
        meta: { successMessage: 'Produto atualizado.' },
        onSuccess: (product) => {
            queryClient.invalidateQueries({ queryKey: productsKeys.all })

            emitHostEvent({ type: 'product:updated', payload: { id: product.id, name: product.name } })
        }
    })
}

export function useDeleteProductMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: [...productsKeys.all, 'delete'],
        mutationFn: (product: IProduct) => ProductsService.deleteProduct(product.id),
        meta: { successMessage: 'Produto excluído.' },
        onSuccess: (_data, product) => {
            queryClient.invalidateQueries({ queryKey: productsKeys.all })

            emitHostEvent({ type: 'product:deleted', payload: { id: product.id, name: product.name } })
        }
    })
}
