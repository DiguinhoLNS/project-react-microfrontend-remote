import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import clsx from 'clsx'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import '@/styles/standalone.css'
import '@/styles/remote.css'

const IS_DARK = window.matchMedia('(prefers-color-scheme: dark)').matches

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <div className={clsx('mfe-root', IS_DARK && 'dark')}>
            <main className={clsx('flex flex-col gap-6 w-full max-w-3xl mx-auto p-6')}>
                <div className={clsx('flex flex-col gap-1')}>
                    <h1 className={clsx('font-heading text-2xl font-semibold tracking-tight')}>
                        Microfrontend Remote
                    </h1>

                    <p className={clsx('text-muted-foreground')}>
                        React 19 + Vite + shadcn/ui (radix-nova) com CSS escopado em .mfe-root
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Componentes</CardTitle>
                        <CardDescription>Tokens do shadcn definidos em .mfe-root e .mfe-root.dark</CardDescription>
                    </CardHeader>

                    <CardContent className={clsx('flex flex-wrap items-center gap-2')}>
                        <Button>Default</Button>
                        <Button variant='secondary'>Secondary</Button>
                        <Button variant='outline'>Outline</Button>
                        <Button variant='destructive'>Destructive</Button>
                        <Badge variant='secondary'>{IS_DARK ? 'dark' : 'light'}</Badge>
                    </CardContent>
                </Card>
            </main>
        </div>
    </StrictMode>
)
