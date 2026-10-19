export type TQueryMeta = {
    errorMessage?: string
    silent?: boolean
}

export type TMutationMeta = TQueryMeta & {
    successMessage?: string
}

declare module '@tanstack/react-query' {
    interface Register {
        queryMeta: TQueryMeta
        mutationMeta: TMutationMeta
    }
}
