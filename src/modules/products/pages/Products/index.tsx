import clsx from 'clsx'
import PageHeader from '@/components/page/PageHeader'
import HostInfo from '@/modules/host/components/HostInfo'
import ProductsSummary from './components/Summary'
import ProductsSearchbar from './components/Searchbar'
import ProductsList from './components/List'

export default function Products() {

    return (

        <>
            <div className={clsx('flex flex-col gap-6')}>
                <PageHeader
                    title='Produtos'
                    description='Catálogo servido pelo microfrontend React + Vite.'
                >
                    <HostInfo />
                </PageHeader>

                <ProductsSummary />

                <ProductsSearchbar />

                <ProductsList />
            </div>
        </>

    )

}
