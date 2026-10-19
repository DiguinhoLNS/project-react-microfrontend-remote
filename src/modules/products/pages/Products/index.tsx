import clsx from 'clsx'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import PageHeader from '@/components/page/PageHeader'
import HostInfo from '@/modules/host/components/HostInfo'
import useProductsStore from '@/modules/products/store/productsStore'
import ProductCreateModal from '@/modules/products/components/common/CreateModal'
import ProductUpdateModal from '@/modules/products/components/common/UpdateModal'
import ProductDeleteDialog from '@/modules/products/components/common/DeleteDialog'
import ProductsList from './components/List'
import ProductsSummary from './components/Summary'
import ProductsSearchbar from './components/Searchbar'

export default function Products() {

    const { setOpenModalCreateProduct } = useProductsStore()

    return (

        <>
            <div className={clsx('flex flex-col gap-6')}>
                <PageHeader
                    title='Produtos'
                    description='Catálogo servido pelo microfrontend React + Vite.'
                >
                    <HostInfo />

                    <Button onClick={() => setOpenModalCreateProduct(true)}>
                        <Plus />
                        Novo produto
                    </Button>
                </PageHeader>

                <ProductsSummary />

                <ProductsSearchbar />

                <ProductsList />
            </div>

            <ProductCreateModal />
            <ProductUpdateModal />
            <ProductDeleteDialog />
        </>

    )

}
