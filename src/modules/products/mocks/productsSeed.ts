import type { IProduct } from '../interfaces/IProduct'

const CREATED_AT = '2026-10-01T12:00:00.000Z'

function product(data: Omit<IProduct, 'createdAt' | 'updatedAt'>): IProduct {
    return { ...data, createdAt: CREATED_AT, updatedAt: CREATED_AT }
}

export const productsSeed: IProduct[] = [
    product({
        id: 'b6f1c1a2-0001-4c1e-9a1a-000000000001',
        name: 'Fone de ouvido Bluetooth',
        description: 'Cancelamento de ruído ativo e 30h de bateria.',
        category: 'ELECTRONICS',
        price: 399.9,
        stock: 42,
        active: true
    }),
    product({
        id: 'b6f1c1a2-0002-4c1e-9a1a-000000000002',
        name: 'Teclado mecânico',
        description: 'Switches marrons, layout ABNT2.',
        category: 'ELECTRONICS',
        price: 549,
        stock: 18,
        active: true
    }),
    product({
        id: 'b6f1c1a2-0003-4c1e-9a1a-000000000003',
        name: 'Clean Architecture',
        description: 'Robert C. Martin.',
        category: 'BOOKS',
        price: 119.9,
        stock: 25,
        active: true
    }),
    product({
        id: 'b6f1c1a2-0004-4c1e-9a1a-000000000004',
        name: 'Refactoring',
        description: 'Martin Fowler, 2ª edição.',
        category: 'BOOKS',
        price: 189,
        stock: 0,
        active: false
    }),
    product({
        id: 'b6f1c1a2-0005-4c1e-9a1a-000000000005',
        name: 'Luminária de mesa',
        description: 'LED com 3 temperaturas de cor.',
        category: 'HOME',
        price: 159.9,
        stock: 31,
        active: true
    }),
    product({
        id: 'b6f1c1a2-0006-4c1e-9a1a-000000000006',
        name: 'Cafeteira italiana',
        description: 'Alumínio, 6 xícaras.',
        category: 'HOME',
        price: 129.5,
        stock: 12,
        active: true
    }),
    product({
        id: 'b6f1c1a2-0007-4c1e-9a1a-000000000007',
        name: 'Tênis de corrida',
        description: 'Amortecimento responsivo, tamanho 42.',
        category: 'SPORTS',
        price: 699.9,
        stock: 7,
        active: true
    }),
    product({
        id: 'b6f1c1a2-0008-4c1e-9a1a-000000000008',
        name: 'Garrafa térmica 1L',
        description: 'Mantém a temperatura por 24h.',
        category: 'SPORTS',
        price: 89.9,
        stock: 54,
        active: true
    })
]
