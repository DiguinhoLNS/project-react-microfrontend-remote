import useProductsStore from '@/modules/products/store/productsStore'
import ProductsController from '@/modules/products/controllers/productsController'
import { useProductsQuery } from '@/modules/products/queries/productsQueries'
import { useUpdateProductMutation } from '@/modules/products/queries/productsMutations'
import BaseProductModal from '../../base/Modal'

export default function ProductUpdateModal() {

    const { selectedProductId, openModalUpdateProduct, setOpenModalUpdateProduct } = useProductsStore()

    const { data: products } = useProductsQuery()

    const { mutate: updateProduct, isPending } = useUpdateProductMutation()

    const PRODUCT = ProductsController.findProduct(products, selectedProductId)

    if (!PRODUCT) return null

    return (

        <>
            <BaseProductModal
                type='update'
                data={PRODUCT}
                open={openModalUpdateProduct}
                setOpen={setOpenModalUpdateProduct}
                loading={isPending}
                onSave={values => {
                    updateProduct({ id: PRODUCT.id, data: values }, {
                        onSuccess: () => setOpenModalUpdateProduct(false)
                    })
                }}
            />
        </>

    )

}
