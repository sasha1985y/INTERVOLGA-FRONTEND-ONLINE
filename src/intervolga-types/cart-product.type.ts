import { Delivery } from "./delivery.type"

export type CartProduct = {
    id: number,
    cart: number,
    product_name: string,
    product_price: number,
    quantity: number,
    warehouse_address: string,
    warehouse_dealer: string,
    plant_name: null | string,
    plant_address: null | string,
    plant_manufacturer: null | string,
    deliveries: Delivery[]
}