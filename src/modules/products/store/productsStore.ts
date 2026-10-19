import { create } from 'zustand'
import type { IProductsFilters } from '../interfaces/IProductsFilters'
import { DEFAULT_PRODUCTS_FILTERS } from '../constants/filters'

interface IProductsState {
    filters: IProductsFilters
    setFilters: (filters: Partial<IProductsFilters>) => void
    clearFilters: () => void
}

const useProductsStore = create<IProductsState>()((set) => ({
    filters: DEFAULT_PRODUCTS_FILTERS,
    setFilters: (filters) => set(state => ({ filters: { ...state.filters, ...filters } })),
    clearFilters: () => set({ filters: DEFAULT_PRODUCTS_FILTERS })
}))

export default useProductsStore
