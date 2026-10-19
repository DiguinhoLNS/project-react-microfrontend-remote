export default class Storage {

    public static setItem<T>(key: string, value: T): void {
        localStorage.setItem(key, JSON.stringify(value))
    }

    public static getItem<T>(key: string): T | null {
        const data = localStorage.getItem(key)

        if (!data) return null

        return JSON.parse(data) as T
    }

    public static removeItem(key: string): void {
        localStorage.removeItem(key)
    }

}
