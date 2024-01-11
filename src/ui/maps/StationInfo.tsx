import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Location } from "@/lib/types/location"
import { MevoStation } from "@/lib/types/mevoStation"
import { StationVehicles } from "@/lib/types/stationVehicles"
import { FaBicycle, FaParking } from "react-icons/fa"

const StationInfo = ({displayedStation, displayedStationVehicles, waypoints, setRouteSource, setRouteDestination, setWaypoints}: {
    displayedStation: MevoStation,
    displayedStationVehicles: StationVehicles,
    waypoints: Location[],
    setRouteSource: (arg: Location) => void,
    setRouteDestination: (arg: Location) => void,
    setWaypoints: (arg: Location[]) => void
}) => {
  return (
    <Card>
        <CardHeader>
            <CardTitle>Mevo Station: {displayedStation.code}</CardTitle>
            <CardDescription>Address: {displayedStation.address}</CardDescription>
        </CardHeader>
        <CardContent>
            <span className='flex justify-start gap-2'>
                <FaParking/>Parking slots available: {displayedStationVehicles.parking_slots_available}
            </span>
            {displayedStationVehicles.vehicles_avaiable.map((vehicle) =>(
                <span className='flex justify-start gap-2'>
                    <FaBicycle/>{vehicle.vehicle_type_id}: {vehicle.count}
                </span>
            ))}
        </CardContent>
        <CardContent>
            <Button variant='default' onClick={() => setRouteSource(displayedStation)}>Set route source</Button>
        </CardContent>
        <CardContent>
            <Button variant='default' onClick={() => setRouteDestination(displayedStation)}>Set route destination</Button>
        </CardContent>
        <CardContent>
            <Button variant='default' onClick={() => setWaypoints([...waypoints, displayedStation])}>Add waypoint</Button>
        </CardContent>
    </Card>
  )
}

export default StationInfo