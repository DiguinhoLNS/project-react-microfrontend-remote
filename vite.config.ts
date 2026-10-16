import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import type { Node, Plugin as PostcssPlugin } from 'postcss'

const REMOTE_CSS_FILE = '/src/styles/remote.css'
const REMOTE_ROOT_SELECTOR = '.mfe-root'

function isInsideRuleOrKeyframes(node: Node) {
    for (let parent = node.parent; parent; parent = parent.parent) {
        if (parent.type === 'rule') return true
        if (parent.type === 'atrule' && 'name' in parent && String(parent.name).endsWith('keyframes')) return true
    }

    return false
}

function scopeSelector(selector: string) {
    if (selector.includes(REMOTE_ROOT_SELECTOR)) return selector
    if (selector === ':root' || selector === ':host') return REMOTE_ROOT_SELECTOR

    return `${REMOTE_ROOT_SELECTOR} ${selector}`
}

function scopeRemoteCss(): PostcssPlugin {
    return {
        postcssPlugin: 'mfe-scope-remote-css',
        Once(root) {
            if (!root.source?.input.file?.includes(REMOTE_CSS_FILE)) return

            root.walkRules(rule => {
                if (isInsideRuleOrKeyframes(rule)) return

                rule.selectors = [...new Set(rule.selectors.map(scopeSelector))]
            })
        }
    }
}

export default defineConfig({
    plugins: [react(), tailwindcss()],
    css: {
        postcss: {
            plugins: [scopeRemoteCss()]
        }
    },
    resolve: {
        tsconfigPaths: true
    }
})
