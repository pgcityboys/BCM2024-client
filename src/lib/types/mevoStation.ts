export interface MevoStation {
    id: string,
    code: string,
    address: string,
    coordinates: {
        lat: number,
        lon: number
    },
    park_zone: {
        lat: number,
        lon: number
    }[]
}