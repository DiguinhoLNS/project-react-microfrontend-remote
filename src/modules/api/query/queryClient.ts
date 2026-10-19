import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'
import info from '@/utils/info'
import toast, { getErrorMessage } from '@/utils/toast'
import ApiError from '../errors/ApiError'
import type { TQueryMeta } from './queryMeta'

const MAX_RETRIES = 1

function shouldRetry(failureCount: number, error: Error) {
    if (failureCount >= MAX_RETRIES) return false

    if (error instanceof ApiError) {
        return error.isNetworkError || error.isServerError
    }

    return false
}

function shouldNotifyError(error: Error, meta?: TQueryMeta) {
    if (meta?.silent) return false

    if (error.name === 'AbortError') return false

    return true
}

function makeQueryClient() {
    return new QueryClient({
        queryCache: new QueryCache({
            onError: (error, query) => {
                info.error(`Query ${JSON.stringify(query.queryKey)}`, error)

                if (!shouldNotifyError(error, query.meta)) return

                toast.error(query.meta?.errorMessage ?? getErrorMessage(error), { id: query.queryHash })
            }
        }),
        mutationCache: new MutationCache({
            onError: (error, _variables, _onMutateResult, mutation) => {
                info.error(`Mutation ${JSON.stringify(mutation.options.mutationKey ?? [])}`, error)

                if (!shouldNotifyError(error, mutation.meta)) return

                toast.error(mutation.meta?.errorMessage ?? getErrorMessage(error), { id: mutation.mutationId })
            },
            onSuccess: (_data, _variables, _onMutateResult, mutation) => {
                const successMessage = mutation.meta?.successMessage

                if (!successMessage) return

                toast.success(successMessage, { id: mutation.mutationId })
            }
        }),
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000,
                refetchOnWindowFocus: false,
                retry: shouldRetry
            },
            mutations: {
                retry: false
            }
        }
    })
}

let queryClient: QueryClient | undefined

export default function getQueryClient() {
    queryClient ??= makeQueryClient()

    return queryClient
}
