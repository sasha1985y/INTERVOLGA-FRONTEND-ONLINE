import { CartProduct } from "./cart-product.type";

export type Cart = {
    id: number,
    created_at: string,
    general_cost: number,
    cart_products: CartProduct[]
}