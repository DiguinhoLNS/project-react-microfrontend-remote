import clsx from 'clsx'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import PageHeader from '@/components/page/PageHeader'
import HostInfo from '@/modules/host/components/HostInfo'

export default function Products() {

    return (

        <>
            <div className={clsx('flex flex-col gap-6')}>
                <PageHeader
                    title='Produtos'
                    description='Microfrontend React + Vite carregado em runtime.'
                />

                <HostInfo />

                <Card>
                    <CardHeader>
                        <CardTitle>Contrato conectado</CardTitle>
                        <CardDescription>
                            As props acima chegam do host via mount/update. A listagem de produtos entra nos próximos passos.
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        </>

    )

}
