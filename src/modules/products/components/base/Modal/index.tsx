import clsx from 'clsx'
import { Form, Formik } from 'formik'
import { PackagePlus, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import type { IProduct } from '@/modules/products/interfaces/IProduct'
import type { IProductDataCreate } from '@/modules/products/interfaces/IProductData'
import BaseProductFormFields from '../Form/components/Fields'
import { formToProductData, productFormSchema, productToForm } from '../Form/form'

interface BaseProductModalProps {
    type: 'create' | 'update'
    open: boolean
    setOpen: (open: boolean) => void
    loading: boolean
    data?: IProduct | null
    onSave: (values: IProductDataCreate) => void
}

export default function BaseProductModal({ type, open, setOpen, loading, data, onSave }: BaseProductModalProps) {

    const IS_CREATE = type === 'create'

    return (

        <>
            <Dialog
                open={open}
                onOpenChange={setOpen}
            >
                <DialogContent className={clsx('sm:max-w-lg')}>
                    <Formik
                        initialValues={productToForm(data)}
                        validationSchema={productFormSchema}
                        onSubmit={values => onSave(formToProductData(values))}
                    >
                        <Form
                            noValidate
                            className={clsx('flex flex-col gap-6')}
                        >
                            <DialogHeader>
                                <DialogTitle>{IS_CREATE ? 'Novo produto' : 'Editar produto'}</DialogTitle>
                                <DialogDescription>
                                    {IS_CREATE
                                        ? 'Preencha os dados para cadastrar um produto.'
                                        : 'Altere os dados e salve para atualizar o produto.'}
                                </DialogDescription>
                            </DialogHeader>

                            <BaseProductFormFields />

                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button
                                        variant='outline'
                                        disabled={loading}
                                    >
                                        Cancelar
                                    </Button>
                                </DialogClose>

                                <Button
                                    type='submit'
                                    disabled={loading}
                                >
                                    {loading ? <Spinner /> : IS_CREATE ? <PackagePlus /> : <Save />}
                                    {IS_CREATE ? 'Criar produto' : 'Salvar alterações'}
                                </Button>
                            </DialogFooter>
                        </Form>
                    </Formik>
                </DialogContent>
            </Dialog>
        </>

    )

}
