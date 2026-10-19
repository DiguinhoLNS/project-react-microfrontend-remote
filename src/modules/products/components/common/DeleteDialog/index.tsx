import clsx from 'clsx'
import { Trash2 } from 'lucide-react'
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import useProductsStore from '@/modules/products/store/productsStore'
import ProductsController from '@/modules/products/controllers/productsController'
import { useProductsQuery } from '@/modules/products/queries/productsQueries'
import { useDeleteProductMutation } from '@/modules/products/queries/productsMutations'

export default function ProductDeleteDialog() {

    const { selectedProductId, openModalDeleteProduct, setOpenModalDeleteProduct } = useProductsStore()

    const { data: products } = useProductsQuery()

    const { mutate: deleteProduct, isPending } = useDeleteProductMutation()

    const PRODUCT = ProductsController.findProduct(products, selectedProductId)

    if (!PRODUCT) return null

    return (

        <>
            <AlertDialog
                open={openModalDeleteProduct}
                onOpenChange={setOpenModalDeleteProduct}
            >
                <AlertDialogContent size='sm'>
                    <AlertDialogHeader>
                        <AlertDialogMedia className={clsx('bg-destructive/10 text-destructive')}>
                            <Trash2 />
                        </AlertDialogMedia>

                        <AlertDialogTitle>Excluir produto?</AlertDialogTitle>
                        <AlertDialogDescription>
                            <strong>{PRODUCT.name}</strong> será removido permanentemente da lista.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>

                        <Button
                            variant='destructive'
                            disabled={isPending}
                            onClick={() => {
                                deleteProduct(PRODUCT, {
                                    onSuccess: () => setOpenModalDeleteProduct(false)
                                })
                            }}
                        >
                            {isPending && <Spinner />}
                            Excluir
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>

    )

}
