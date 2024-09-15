import { Cart } from "./cart.type"

export type Order = {
    id: number,
    name: string,
    address: string,
    carts: Cart[]
}