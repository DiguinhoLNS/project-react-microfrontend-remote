import { create } from 'zustand'
import type { IProductsFilters } from '../interfaces/IProductsFilters'
import { DEFAULT_PRODUCTS_FILTERS } from '../constants/filters'

interface IProductsState {
    filters: IProductsFilters
    setFilters: (filters: Partial<IProductsFilters>) => void
    clearFilters: () => void

    selectedProductId: string | null
    setSelectedProductId: (id: string | null) => void

    openModalCreateProduct: boolean
    setOpenModalCreateProduct: (open: boolean) => void
    openModalUpdateProduct: boolean
    setOpenModalUpdateProduct: (open: boolean) => void
    openModalDeleteProduct: boolean
    setOpenModalDeleteProduct: (open: boolean) => void
}

const useProductsStore = create<IProductsState>()((set) => ({
    filters: DEFAULT_PRODUCTS_FILTERS,
    setFilters: (filters) => set(state => ({ filters: { ...state.filters, ...filters } })),
    clearFilters: () => set({ filters: DEFAULT_PRODUCTS_FILTERS }),

    selectedProductId: null,
    setSelectedProductId: (id) => set({ selectedProductId: id }),

    openModalCreateProduct: false,
    setOpenModalCreateProduct: (open) => set({ openModalCreateProduct: open }),
    openModalUpdateProduct: false,
    setOpenModalUpdateProduct: (open) => set({ openModalUpdateProduct: open }),
    openModalDeleteProduct: false,
    setOpenModalDeleteProduct: (open) => set({ openModalDeleteProduct: open })
}))

export default useProductsStore
