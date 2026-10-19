import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppProvider from '@/components/app/AppProvider'
import Products from '@/modules/products/pages/Products'
import useHostStore from '@/modules/host/store/hostStore'
import HostController from '@/modules/host/controllers/hostController'
import { CONTRACT_VERSION } from '@/modules/host/constants/contract'
import type { IRemoteInstance, IRemoteProps } from '@/modules/host/interfaces/IRemoteContract'
import styles from '@/styles/remote.css?inline'

export const contractVersion = CONTRACT_VERSION

export function mount(element: HTMLElement, props: IRemoteProps = {}): IRemoteInstance {
    const { connect, update, disconnect } = useHostStore.getState()

    const removeStyles = HostController.injectStyles(styles)
    const container = HostController.createScopedElement()

    element.replaceChildren(container)

    connect(props)
    HostController.applyTheme([container], props.theme)

    const unsubscribeTheme = useHostStore.subscribe((state, prev) => {
        if (state.theme !== prev.theme) HostController.applyTheme([container], state.theme)
    })

    const root = createRoot(container, { identifierPrefix: 'mfe-products-' })

    root.render(
        <StrictMode>
            <AppProvider>
                <Products />
            </AppProvider>
        </StrictMode>
    )

    return {
        update,
        unmount: () => {
            root.unmount()
            unsubscribeTheme()
            container.remove()
            removeStyles()
            disconnect()
        }
    }
}
