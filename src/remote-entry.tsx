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
    const portalContainer = HostController.createScopedElement('mfe-portal')

    element.replaceChildren(container)
    document.body.append(portalContainer)

    connect(props, portalContainer)
    HostController.applyTheme([container, portalContainer], props.theme)

    const unsubscribeTheme = useHostStore.subscribe((state, prev) => {
        if (state.theme !== prev.theme) HostController.applyTheme([container, portalContainer], state.theme)
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
            portalContainer.remove()
            removeStyles()
            disconnect()
        }
    }
}
