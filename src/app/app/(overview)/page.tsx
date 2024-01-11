import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CO2 from "@/components/app/CO2";
import Money from "@/components/app/Money";
import { CO2Skeleton } from "@/components/skeletons/CO2Skeleton";
import { MoneySkeleton } from "@/components/skeletons/MoneySkeleton";
import { SessionBecauseTypescriptSucksBalls } from "@/lib/types/session";
import { getServerSession } from "next-auth";
import { Suspense } from "react";

export default async function Page(){

  const session = await getServerSession(authOptions) as SessionBecauseTypescriptSucksBalls

  return ( 
    <main className="text-center flex flex-col justify-center gap-8 items-start">
      <h1 className="text-center text-5xl"> Welcome, {session.user?.name} </h1>
      <div id="info-cards" className="flex flex-col gap-4 w-full">
        <span className="w-full my-4 flex gap-4"> 
          <Suspense fallback={<CO2Skeleton/>}>
            <CO2/>
          </Suspense>
          <Suspense fallback={<MoneySkeleton/>}>
            <Money/>
          </Suspense>
        </span>
        <span className="w-full"> </span>
      </div>
    </main>
  )
}



