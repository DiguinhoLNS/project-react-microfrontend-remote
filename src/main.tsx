import { mount } from './remote-entry'
import type { TRemoteTheme } from '@/modules/host/interfaces/IRemoteContract'
import '@/styles/standalone.css'

const colorScheme = window.matchMedia('(prefers-color-scheme: dark)')

const getTheme = (): TRemoteTheme => colorScheme.matches ? 'dark' : 'light'

const instance = mount(document.getElementById('root')!, {
    hostName: 'Standalone',
    theme: getTheme(),
    user: null,
    onEvent: event => console.info('[remote:event]', event)
})

colorScheme.addEventListener('change', () => instance.update({ theme: getTheme() }))
