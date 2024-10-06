import { Manufacturer } from "./manufacturer.type.ts"

export type Plant = {
    id: number,
    name: string,
    address: string,
    manufacturer: Manufacturer,
    geo_lat: string,
    geo_lon: string
}