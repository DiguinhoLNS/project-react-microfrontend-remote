import useProductsStore from '@/modules/products/store/productsStore'
import { useCreateProductMutation } from '@/modules/products/queries/productsMutations'
import BaseProductModal from '../../base/Modal'

export default function ProductCreateModal() {

    const { openModalCreateProduct, setOpenModalCreateProduct } = useProductsStore()

    const { mutate: createProduct, isPending } = useCreateProductMutation()

    return (

        <>
            <BaseProductModal
                type='create'
                open={openModalCreateProduct}
                setOpen={setOpenModalCreateProduct}
                loading={isPending}
                onSave={values => {
                    createProduct(values, {
                        onSuccess: () => setOpenModalCreateProduct(false)
                    })
                }}
            />
        </>

    )

}
