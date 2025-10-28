import { Product } from './Product';
export interface PurchaseRequest {
    type: string
    address: string | null
    location: string | null
    subtotal: number
    products: PurchaseProducts[]
}

export interface PurchaseProducts {
    uid: string
    quantity: number
}

export interface PurchaseResponse {
    uid: string
    date: string
    type: string
    address: string
    location: string
    subtotal: number
    products: Product[]
}

export type MethodPurchase = "dlv" | "rtr";