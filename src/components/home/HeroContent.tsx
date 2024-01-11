import { useRouter } from "next/navigation"
import { ballista } from "../fonts"
import { Button } from "../ui/button"
import { DropShadow } from "../ui/drop-shadow"

export const HeroContent = () => {

  const router = useRouter()

  return (
    <div className="relative w-screen h-screen hero-content">
      <div className="top-hero absolute h-screen w-screen bg-yellow-400 grid items-center justify-center">
        <h2 id="t1" className={`absolute top-4 left-4 text-black text-6xl ${ballista.className}`}> One place </h2>
        <h2 id="t2" className={`text-black text-6xl ${ballista.className}`}> for all your </h2>
        <h2 id="t3" className={`text-black text-6xl absolute right-4 bottom-4 ${ballista.className}`}> transportation related needs </h2>
        <h2 id="t4" className="absolute left-9 -rotate-12 text-black text-4xl"> scroll </h2>
        <h2 id="t5" className="absolute right-9 rotate-12 text-black text-4xl"> down </h2>
      </div>
      <div className="bottom-hero absolute h-screen w-screen flex flex-col items-center justify-center">
        <h1 className="try-text text-6xl text-violet-400 opacity-0"> Try <strong className={`${ballista.className}`}> GetBike </strong> today </h1>
        <div id="button-combo" className="opacity-0">
          <DropShadow>
            <Button variant='default' size='lg' onClick={() => router.push('/app')}> Get started </Button>
          </DropShadow>
        </div>
      </div>
    </div>
  )
}
