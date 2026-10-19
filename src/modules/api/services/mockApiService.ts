import sleep from '@/utils/sleep'
import Storage from '@/utils/storage'
import ApiError from '../errors/ApiError'
import type { IMockEntity } from '../interfaces/IMockEntity'
import type { IRequestOptions } from '../interfaces/IRequestOptions'

type TMockDatabase = Record<string, IMockEntity[]>

export default class MockApiService {

    protected seeds: TMockDatabase = {}

    protected storageKey: string

    protected latency: [min: number, max: number]

    constructor(storageKey: string, latency: [min: number, max: number] = [300, 800]) {
        this.storageKey = storageKey
        this.latency = latency
    }

    public registerCollection<T extends IMockEntity>(name: string, seed: T[]) {
        this.seeds[name] = seed
    }

    public async get<T>(endpoint: string, options?: IRequestOptions): Promise<T> {
        await this.wait(options)

        const { collection, id } = this.parseEndpoint(endpoint)
        const items = this.read(collection)

        if (!id) return this.clone(items as T)

        return this.clone(this.find(collection, items, id) as T)
    }

    public async post<T, K = unknown>(endpoint: string, body?: K, options?: IRequestOptions): Promise<T> {
        await this.wait(options)

        const { collection } = this.parseEndpoint(endpoint)
        const now = new Date().toISOString()

        const item = {
            ...body,
            id: crypto.randomUUID(),
            createdAt: now,
            updatedAt: now
        } as IMockEntity

        this.write(collection, [item, ...this.read(collection)])

        return this.clone(item as T)
    }

    public async patch<T, K = unknown>(endpoint: string, body?: K, options?: IRequestOptions): Promise<T> {
        await this.wait(options)

        const { collection, id } = this.parseEndpoint(endpoint)
        const items = this.read(collection)
        const current = this.find(collection, items, id)

        const updated: IMockEntity = {
            ...current,
            ...body,
            id: current.id,
            createdAt: current.createdAt,
            updatedAt: new Date().toISOString()
        }

        this.write(collection, items.map(item => item.id === current.id ? updated : item))

        return this.clone(updated as T)
    }

    public async delete<T = null>(endpoint: string, options?: IRequestOptions): Promise<T> {
        await this.wait(options)

        const { collection, id } = this.parseEndpoint(endpoint)
        const items = this.read(collection)
        const current = this.find(collection, items, id)

        this.write(collection, items.filter(item => item.id !== current.id))

        return null as T
    }

    public reset() {
        Storage.removeItem(this.storageKey)
    }

    protected parseEndpoint(endpoint: string) {
        const [collection, id] = endpoint.replace(/^\/+|\/+$/g, '').split('/')

        if (!(collection in this.seeds)) {
            throw new ApiError(`Recurso "${collection}" não existe na API mock.`, 404)
        }

        return { collection, id: id as string | undefined }
    }

    protected find(collection: string, items: IMockEntity[], id?: string) {
        const item = items.find(entity => entity.id === id)

        if (!item) throw new ApiError(`Registro "${id}" não encontrado em ${collection}.`, 404)

        return item
    }

    protected read(collection: string) {
        const database = Storage.getItem<TMockDatabase>(this.storageKey) ?? {}

        return database[collection] ?? structuredClone(this.seeds[collection])
    }

    protected write(collection: string, items: IMockEntity[]) {
        const database = Storage.getItem<TMockDatabase>(this.storageKey) ?? {}

        Storage.setItem(this.storageKey, { ...database, [collection]: items })
    }

    protected wait(options?: IRequestOptions) {
        const [min, max] = this.latency

        return sleep(min + Math.random() * (max - min), options?.signal)
    }

    protected clone<T>(data: T): T {
        return structuredClone(data)
    }

}
