'use client';

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Page(){

  const {data} = useSession()

  return (
    <main className="flex flex-col gap-8 text-center"> 
      <h2 className="text-4xl"> Hi, {data?.user?.name}</h2>
      <Image
        src={data?.user?.image || ""}
        alt="user profile picture"
        width={300}
        height={300}
        className="rounded-full"
      />
      <Button variant='destructive' onClick={() => signOut()}> Sign out </Button>
    </main>
  )
}
