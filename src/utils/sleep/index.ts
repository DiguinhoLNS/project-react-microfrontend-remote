export default function sleep(ms: number, signal?: AbortSignal): Promise<void> {
    return new Promise((resolve, reject) => {
        if (signal?.aborted) return reject(signal.reason)

        const timeout = setTimeout(resolve, ms)

        signal?.addEventListener('abort', () => {
            clearTimeout(timeout)
            reject(signal.reason)
        }, { once: true })
    })
}
