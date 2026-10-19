import { create } from 'zustand'
import type { IRemoteProps } from '../interfaces/IRemoteContract'

interface IHostState extends IRemoteProps {
    portalContainer: HTMLElement | null

    connect: (props: IRemoteProps, portalContainer: HTMLElement) => void
    update: (props: Partial<IRemoteProps>) => void
    disconnect: () => void
}

const initialState: Omit<IHostState, 'connect' | 'update' | 'disconnect'> = {
    hostName: undefined,
    theme: 'light',
    user: null,
    onEvent: undefined,
    portalContainer: null
}

const useHostStore = create<IHostState>()((set) => ({
    ...initialState,

    connect: (props, portalContainer) => set({ ...initialState, ...props, portalContainer }),
    update: (props) => set(props),
    disconnect: () => set(initialState)
}))

export default useHostStore
