import clsx from 'clsx'
import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'

interface ProductsListSkeletonProps {
    rows?: number
}

export default function ProductsListSkeleton({ rows = 5 }: ProductsListSkeletonProps) {

    return (

        <>
            {Array.from({ length: rows }, (_, index) => (
                <TableRow key={index}>
                    <TableCell>
                        <Skeleton className={clsx('h-4 w-40')} />
                        <Skeleton className={clsx('mt-1.5 h-3 w-56')} />
                    </TableCell>

                    <TableCell>
                        <Skeleton className={clsx('h-5 w-20 rounded-full')} />
                    </TableCell>

                    <TableCell>
                        <Skeleton className={clsx('ml-auto h-4 w-16')} />
                    </TableCell>

                    <TableCell>
                        <Skeleton className={clsx('ml-auto h-4 w-8')} />
                    </TableCell>

                    <TableCell>
                        <Skeleton className={clsx('h-5 w-14 rounded-full')} />
                    </TableCell>
                </TableRow>
            ))}
        </>

    )

}
