import clsx from 'clsx'
import { Search } from 'lucide-react'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import useProductsStore from '@/modules/products/store/productsStore'
import { categoryFilterItems, statusFilterItems } from '@/modules/products/constants/filters'
import type { TProductCategoryFilter, TProductStatusFilter } from '@/modules/products/interfaces/IProductsFilters'

export default function ProductsSearchbar() {

    const { filters, setFilters } = useProductsStore()

    return (

        <>
            <div className={clsx('flex flex-col gap-3 sm:flex-row')}>
                <InputGroup className={clsx('sm:max-w-sm')}>
                    <InputGroupAddon>
                        <Search />
                    </InputGroupAddon>

                    <InputGroupInput
                        type='search'
                        placeholder='Buscar por nome ou descrição'
                        aria-label='Buscar produtos'
                        value={filters.search}
                        onChange={event => setFilters({ search: event.target.value })}
                    />
                </InputGroup>

                <Select
                    value={filters.category}
                    onValueChange={value => setFilters({ category: value as TProductCategoryFilter })}
                >
                    <SelectTrigger
                        className={clsx('w-full sm:w-48')}
                        aria-label='Filtrar por categoria'
                    >
                        <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectGroup>
                            {categoryFilterItems.map(item => (
                                <SelectItem
                                    key={item.value}
                                    value={item.value}
                                >
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Select
                    value={filters.status}
                    onValueChange={value => setFilters({ status: value as TProductStatusFilter })}
                >
                    <SelectTrigger
                        className={clsx('w-full sm:w-40')}
                        aria-label='Filtrar por status'
                    >
                        <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectGroup>
                            {statusFilterItems.map(item => (
                                <SelectItem
                                    key={item.value}
                                    value={item.value}
                                >
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </>

    )

}
