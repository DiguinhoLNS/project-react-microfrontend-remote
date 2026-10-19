function normalize(value: string) {
    return value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()
}

export default function filterString(source: string, query: string) {
    return normalize(source).includes(normalize(query))
}
