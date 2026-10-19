import { toast as sonner } from 'sonner'
import ApiError from '@/modules/api/errors/ApiError'
import type { ExternalToast } from 'sonner'

export type TToastOptions = ExternalToast

export const DEFAULT_ERROR_MESSAGE = 'Não foi possível concluir a requisição.'

export function getErrorMessage(error: unknown, fallback: string = DEFAULT_ERROR_MESSAGE) {
    if (error instanceof ApiError) {
        if (error.isNetworkError) return 'Falha de conexão. Verifique sua internet e tente novamente.'

        if (error.isServerError) return 'Erro no servidor. Tente novamente em alguns instantes.'
    }

    if (error instanceof Error && error.message) return error.message

    return fallback
}

const toast = {
    success: (message: string, options?: TToastOptions) => sonner.success(message, options),

    error: (message: string, options?: TToastOptions) => sonner.error(message, options),

    warning: (message: string, options?: TToastOptions) => sonner.warning(message, options),

    info: (message: string, options?: TToastOptions) => sonner.info(message, options),

    fromError: (error: unknown, { fallback, ...options }: TToastOptions & { fallback?: string } = {}) => {
        return sonner.error(getErrorMessage(error, fallback), options)
    },

    promise: sonner.promise,

    dismiss: sonner.dismiss
}

export default toast
