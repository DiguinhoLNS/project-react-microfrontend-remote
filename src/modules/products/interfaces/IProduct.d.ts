import type { TProductCategory } from './TProductCategory'

export interface IProduct {
    id:          string;
    name:        string;
    description: string;
    category:    TProductCategory;
    price:       number;
    stock:       number;
    active:      boolean;
    createdAt:   string;
    updatedAt:   string;
}
