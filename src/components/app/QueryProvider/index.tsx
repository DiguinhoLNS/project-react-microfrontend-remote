import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import getQueryClient from '@/modules/api/query/queryClient'

export default function AppQueryProvider({ children }: Readonly<{ children: React.ReactNode }>) {

    const queryClient = getQueryClient()

    return (

        <>
            <QueryClientProvider client={queryClient}>
                {children}

                {import.meta.env.DEV && <ReactQueryDevtools buttonPosition='bottom-left' />}
            </QueryClientProvider>
        </>

    )

}
