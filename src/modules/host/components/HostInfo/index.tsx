import clsx from 'clsx'
import { Moon, Plug, Sun, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import useHostStore from '../../store/hostStore'

export default function HostInfo() {

    const hostName = useHostStore(state => state.hostName)
    const theme = useHostStore(state => state.theme)
    const user = useHostStore(state => state.user)

    return (

        <>
            <div className={clsx('flex flex-wrap items-center gap-2')}>
                <Badge variant='outline'>
                    <Plug />
                    {hostName ?? 'Host desconhecido'}
                </Badge>

                <Badge variant='outline'>
                    {theme === 'dark' ? <Moon /> : <Sun />}
                    {theme}
                </Badge>

                {!!user && (
                    <Badge variant='secondary'>
                        <User />
                        {user.name}
                    </Badge>
                )}
            </div>
        </>

    )

}
