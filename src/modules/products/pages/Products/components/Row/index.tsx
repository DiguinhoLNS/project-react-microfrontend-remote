import clsx from 'clsx'
import { Badge } from '@/components/ui/badge'
import { TableCell, TableRow } from '@/components/ui/table'
import type { IProduct } from '@/modules/products/interfaces/IProduct'
import formatProductCategory from '@/modules/products/utils/formatProductCategory'
import formatCurrency from '@/utils/formatCurrency'

interface ProductRowProps {
    data: IProduct
}

export default function ProductRow({ data }: ProductRowProps) {

    return (

        <>
            <TableRow>
                <TableCell className={clsx('max-w-72 whitespace-normal')}>
                    <p className={clsx('font-medium')}>
                        {data.name}
                    </p>

                    {!!data.description && (
                        <p className={clsx('line-clamp-1 text-xs text-muted-foreground')}>
                            {data.description}
                        </p>
                    )}
                </TableCell>

                <TableCell>
                    <Badge variant='outline'>
                        {formatProductCategory(data.category)}
                    </Badge>
                </TableCell>

                <TableCell className={clsx('text-right tabular-nums')}>
                    {formatCurrency(data.price)}
                </TableCell>

                <TableCell
                    className={clsx(
                        'text-right tabular-nums',
                        data.stock === 0 && 'font-medium text-destructive'
                    )}
                >
                    {data.stock}
                </TableCell>

                <TableCell>
                    <Badge variant={data.active ? 'secondary' : 'outline'}>
                        {data.active ? 'Ativo' : 'Inativo'}
                    </Badge>
                </TableCell>
            </TableRow>
        </>

    )

}
