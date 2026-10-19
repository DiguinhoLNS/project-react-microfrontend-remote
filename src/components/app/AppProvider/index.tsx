import { Toaster } from '@/components/ui/sonner'
import AppQueryProvider from '../QueryProvider'

export default function AppProvider({ children }: Readonly<{ children: React.ReactNode }>) {

    return (

        <>
            <AppQueryProvider>
                {children}

                <Toaster
                    position='bottom-right'
                    richColors
                    closeButton
                />
            </AppQueryProvider>
        </>

    )

}
