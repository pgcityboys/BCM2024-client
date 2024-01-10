export interface StationVehicles {
    parking_slots_available: number,
    vehicles_avaiable: {
        count: number,
        vehicle_type_id: string
      }[]
}