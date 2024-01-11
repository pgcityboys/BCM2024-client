import { Checkbox } from "@/components/ui/checkbox"
import { InfoType } from "@/lib/types/InfoType"
import { ShowMarkers } from "@/lib/types/showMarkers"

const LocationsVisibilityCheckBoxes = ({showMarkers, setShowMarkers}:{
  showMarkers: ShowMarkers,
  setShowMarkers: (arg: ShowMarkers) => void
}) => {
  return (
    <div className="flex items-center justify-center gap-8 p-4 m-4">
      <Checkbox 
        id="mevo" 
        checked={showMarkers.showMevo}
        onClick={() => setShowMarkers({...showMarkers, showMevo: !showMarkers.showMevo})}
      />
      <label
        htmlFor="mevo"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Show Mevo Stations
      </label>
      <Checkbox 
        id="tier"
        checked={showMarkers.showTier}
        onClick={() => setShowMarkers({...showMarkers, showTier: !showMarkers.showTier})}
      />
      <label
        htmlFor="tier"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Show Nearby Tiers
      </label>
      <Checkbox 
        id="places" 
        checked={showMarkers.showPlaces}
        onClick={() => setShowMarkers({...showMarkers, showPlaces: !showMarkers.showPlaces})}
      />
      <label
        htmlFor="places"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Show Searched Places
      </label>
    </div>
  )
}

export default LocationsVisibilityCheckBoxes
