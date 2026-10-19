import useHostStore from '@/modules/host/store/hostStore'

export default function usePortalContainer() {
    return useHostStore(state => state.portalContainer) ?? undefined
}
