import useHostStore from '../../store/hostStore'
import type { TRemoteEvent } from '../../interfaces/IRemoteContract'

export default function emitHostEvent(event: TRemoteEvent) {
    const { onEvent } = useHostStore.getState()

    onEvent?.(event)
}
