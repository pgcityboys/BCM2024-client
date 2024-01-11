import { getEco } from "@/lib/app/eco"
import Image from "next/image";
import leafLogo from '../../../public/leaf.svg'

export default async function CO2() {

  const {co2} = await getEco();

  return (
    <div className="bg-yellow-500 text-black rounded-xl w-100 h-40 p-8 flex flex-col justify-center">
        <h1 className="text-xl pb-2"> You managed to save: </h1> 
        <span className="flex justify-start gap-4 items-center"> 
          <Image src={leafLogo} alt="leaf icon"className="size-12"/>
          <h2> {co2} kg of CO2</h2>
        </span>
    </div>
  )
}
