export interface Product {
    uid: string
    name: string
    description: string
    price: number
    image: string
    category: Category
}

export interface Category {
    uid: string
    name: string
}

export interface ProductCart extends Product {
    quantity: number
}