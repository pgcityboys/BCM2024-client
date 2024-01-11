import Image from "next/image";
import moneyLogo from '../../../public/money.svg'
import { getMoney } from "@/lib/app/money";

export default async function Money() {

  const {money} = await getMoney();

  return (
    <div className="bg-yellow-500 text-black rounded-xl w-72 h-40 p-8 flex flex-col justify-center">
        <h1 className="text-xl pb-2"> You spent: </h1> 
        <span className="flex justify-start gap-4 items-center"> 
          <Image src={moneyLogo} alt="money icon"className="size-12"/>
          <h2> {money} PLN</h2>
        </span>
    </div>
  )
}
