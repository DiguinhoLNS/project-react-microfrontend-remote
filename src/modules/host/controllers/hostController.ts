import { REMOTE_ROOT_CLASS, REMOTE_STYLE_ID } from '../constants/contract'
import type { TRemoteTheme } from '../interfaces/IRemoteContract'

export default class HostController {

    private static styleUsers = 0

    public static injectStyles(css: string) {
        let style = document.getElementById(REMOTE_STYLE_ID) as HTMLStyleElement | null

        if (!style) {
            style = document.createElement('style')
            style.id = REMOTE_STYLE_ID
            style.textContent = css
            document.head.append(style)
        }

        this.styleUsers++

        return () => {
            this.styleUsers--

            if (this.styleUsers === 0) style.remove()
        }
    }

    public static createScopedElement(...extraClasses: string[]) {
        const element = document.createElement('div')

        element.classList.add(REMOTE_ROOT_CLASS, ...extraClasses)

        return element
    }

    public static applyTheme(elements: HTMLElement[], theme: TRemoteTheme = 'light') {
        for (const element of elements) {
            element.classList.toggle('dark', theme === 'dark')
            element.style.colorScheme = theme
        }
    }

}
