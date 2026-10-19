import clsx from 'clsx'
import { useFormikContext } from 'formik'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { IProductForm } from '@/modules/products/interfaces/IProductForm'
import { productCategories } from '@/modules/products/constants/categories'

export default function BaseProductFormFields() {

    const { values, errors, touched, submitCount, handleChange, handleBlur, setFieldValue, setFieldTouched } = useFormikContext<IProductForm>()

    const getError = (field: keyof IProductForm) => (touched[field] || submitCount > 0) ? errors[field] : undefined

    return (

        <>
            <FieldGroup className={clsx('gap-5')}>
                <Field data-invalid={!!getError('name')}>
                    <FieldLabel htmlFor='product-name'>Nome</FieldLabel>

                    <Input
                        id='product-name'
                        name='name'
                        placeholder='Ex.: Teclado mecânico'
                        autoComplete='off'
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={!!getError('name')}
                    />

                    <FieldError>{getError('name')}</FieldError>
                </Field>

                <Field data-invalid={!!getError('category')}>
                    <FieldLabel htmlFor='product-category'>Categoria</FieldLabel>

                    <Select
                        value={values.category}
                        onValueChange={value => setFieldValue('category', value)}
                        onOpenChange={open => !open && setFieldTouched('category', true)}
                    >
                        <SelectTrigger
                            id='product-category'
                            className={clsx('w-full')}
                            aria-invalid={!!getError('category')}
                        >
                            <SelectValue placeholder='Selecione uma categoria' />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectGroup>
                                {productCategories.map(item => (
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

                    <FieldError>{getError('category')}</FieldError>
                </Field>

                <div className={clsx('grid grid-cols-2 gap-4')}>
                    <Field data-invalid={!!getError('price')}>
                        <FieldLabel htmlFor='product-price'>Preço (R$)</FieldLabel>

                        <Input
                            id='product-price'
                            name='price'
                            type='number'
                            inputMode='decimal'
                            min={0}
                            step='0.01'
                            placeholder='0,00'
                            value={values.price}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            aria-invalid={!!getError('price')}
                        />

                        <FieldError>{getError('price')}</FieldError>
                    </Field>

                    <Field data-invalid={!!getError('stock')}>
                        <FieldLabel htmlFor='product-stock'>Estoque</FieldLabel>

                        <Input
                            id='product-stock'
                            name='stock'
                            type='number'
                            inputMode='numeric'
                            min={0}
                            step='1'
                            placeholder='0'
                            value={values.stock}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            aria-invalid={!!getError('stock')}
                        />

                        <FieldError>{getError('stock')}</FieldError>
                    </Field>
                </div>

                <Field data-invalid={!!getError('description')}>
                    <FieldLabel htmlFor='product-description'>Descrição</FieldLabel>

                    <Textarea
                        id='product-description'
                        name='description'
                        placeholder='Opcional'
                        rows={3}
                        className={clsx('resize-none')}
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={!!getError('description')}
                    />

                    {getError('description') ? (
                        <FieldError>{getError('description')}</FieldError>
                    ) : (
                        <FieldDescription>{values.description.length}/200 caracteres</FieldDescription>
                    )}
                </Field>

                <Field orientation='horizontal'>
                    <Switch
                        id='product-active'
                        checked={values.active}
                        onCheckedChange={checked => setFieldValue('active', checked)}
                    />

                    <FieldLabel htmlFor='product-active'>Produto ativo</FieldLabel>
                </Field>
            </FieldGroup>
        </>

    )

}
