import { Location } from "./location"

export interface MevoStation extends Location {
    code: string,
    park_zone: {
        lat: number,
        lon: number
    }[]
}