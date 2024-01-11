export interface TierVehicle {
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
