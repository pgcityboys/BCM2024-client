import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Location } from "@/lib/types/location"

const PlaceInfo = ({displayedPlace, waypoints, setRouteSource, setRouteDestination, setWaypoints}: {
    displayedPlace: Location,
    waypoints: Location[],
    setRouteSource: (arg: Location) => void,
    setRouteDestination: (arg: Location) => void,
    setWaypoints: (arg: Location[]) => void
}) => {
  return (
    <Card>
        <CardHeader>
            <CardTitle>Place: {displayedPlace.name? displayedPlace.name : 'unknown'}</CardTitle>
            <CardDescription>Address: {displayedPlace.address}</CardDescription>
        </CardHeader>
        <CardContent>
            <Button variant='default' onClick={() => setRouteSource(displayedPlace)}>Set route source</Button>
        </CardContent>
        <CardContent>
            <Button variant='default' onClick={() => setRouteDestination(displayedPlace)}>Set route destination</Button>
        </CardContent>
        <CardContent>
            <Button variant='default' onClick={() => setWaypoints([...waypoints, displayedPlace])}>Add waypoint</Button>
        </CardContent>
    </Card>
  )
}

export default PlaceInfo