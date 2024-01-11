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
import { FaHome, FaLocationArrow, FaSearchLocation } from "react-icons/fa"

const RoutePoints = ({routeDestination, waypoints, routeSource, resetRoute}: {
    routeDestination: Location | undefined,
    waypoints: Location[],
    routeSource: Location | undefined,
    resetRoute: () => void
}) => {
  return (
    <Card>
        <CardHeader>
            <CardTitle>Root: </CardTitle>
            <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
            <Button variant='default' onClick={resetRoute}>Reset route</Button>
        </CardContent>
        <CardContent>
            {routeSource && <span className='flex justify-start gap-2'><FaHome/>{routeSource.address}</span>}
        </CardContent>
        <CardContent>
            {waypoints.map((station) =>(
                <span className='flex justify-start gap-2'><FaLocationArrow/>{station.address}</span>
            ))}
        </CardContent>
        <CardContent>
            {routeDestination && <span className='flex justify-start gap-2'><FaSearchLocation/>{routeDestination.address}</span>}
        </CardContent>
    </Card>
  )
}

export default RoutePoints
