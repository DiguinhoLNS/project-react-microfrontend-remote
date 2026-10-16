import { create } from 'zustand'
import type { IRemoteProps } from '../interfaces/IRemoteContract'

interface IHostState extends IRemoteProps {
    connect: (props: IRemoteProps) => void
    update: (props: Partial<IRemoteProps>) => void
    disconnect: () => void
}

const initialState: IRemoteProps = {
    hostName: undefined,
    theme: 'light',
    user: null,
    onEvent: undefined
}

const useHostStore = create<IHostState>()((set) => ({
    ...initialState,

    connect: (props) => set({ ...initialState, ...props }),
    update: (props) => set(props),
    disconnect: () => set(initialState)
}))

export default useHostStore
