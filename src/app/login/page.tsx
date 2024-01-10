'use client'
import { ballista } from "@/components/fonts";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";

export default function Page() {

  let {status} = useSession()
  const router = useRouter()

  if(status==='authenticated') {
    router.push('/app')
  }

  return (
    <main className="flex flex-col justify-start items-center gap-12">
      <h1 className={`${ballista.className} text-6xl my-8`}> Get Bike </h1>
      <span id="summary" className="w-[50%] text-center">
         <strong> Get Bike </strong> <br/> is a state-of-the-art application allowing you to easily find and book the most convenient routes using Lime, Mevo and other providers of publicly available vehicles.
      </span>
      <span>
        <Button onClick={() => signIn('google', {callbackUrl: '/app'})}> Log In with Google </Button>
      </span>
    </main>
  )
}
