import { productCategories } from '../../constants/categories'
import type { TProductCategory } from '../../interfaces/TProductCategory'

export default function formatProductCategory(category: TProductCategory) {
    return productCategories.find(item => item.value === category)?.label ?? category
}
