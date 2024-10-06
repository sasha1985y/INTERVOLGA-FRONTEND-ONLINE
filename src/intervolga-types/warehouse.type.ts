import { Dealer } from "./dealer.type.ts"

export type Warehouse = {
    id: number,
    address: string,
    dealer: Dealer,
    geo_lat: string,
    geo_lon: string
}