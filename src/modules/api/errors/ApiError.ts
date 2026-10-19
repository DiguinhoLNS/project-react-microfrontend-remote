export default class ApiError extends Error {

    public readonly status: number

    public readonly errors: string[]

    constructor(message: string, status: number, errors: string[] = []) {
        super(message)
        this.name = 'ApiError'
        this.status = status
        this.errors = errors
    }

    public get isUnauthorized() {
        return this.status === 401
    }

    public get isNotFound() {
        return this.status === 404
    }

    public get isNetworkError() {
        return this.status === 0
    }

    public get isServerError() {
        return this.status >= 500
    }

}
