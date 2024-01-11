import { lepsze_mapy } from "@/ui/maps/jsontest"
import axios from "axios"
import { useState } from "react"

export type Coordinates = {
  lat: number,
  lng: number
}

const getRouteInfo = async (start: Coordinates, end: Coordinates, waypoints?: Coordinates[]): Promise<google.maps.LatLngLiteral[]> => {
  let url = `http://localhost:8081/api/trace/path?origin=${start.lat},${start.lng}&destination=${end.lat},${end.lng}&mode=walking`
  if(!!waypoints) {
    const waypointUrl = "&waypoints=" + waypoints.map((waypoint) => `${waypoint.lat},${waypoint.lng}`)
    url = url + waypointUrl;
  }
  let res = await axios.get(url)
  return res.data as google.maps.LatLngLiteral[]
}

export const useRoute = (): [google.maps.LatLngLiteral[], (arg: Coordinates, arg2: Coordinates, arg3: Coordinates[]) => void] => {
  let [route, setRoute] = useState<google.maps.LatLngLiteral[]>([])

  const fetchRoutes = (start: Coordinates, end: Coordinates, waypoints: Coordinates[]) => {
    getRouteInfo(start, end, waypoints)
      .then((res) => {
        setRoute(res)
      })
  }

  return [route, fetchRoutes]
}
