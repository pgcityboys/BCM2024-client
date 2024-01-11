export interface TierVehicles {
    data: {
        id: string,
        batteryLevel: number,
        addrcurrentRangeMetersess: number,
        coordinates: {
            lat: number,
            lon: number
        }
    }[]
}