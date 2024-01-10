import { Navbar } from "@/components/app/Navbar"
import { ReactNode } from "react"

export default function Layout({children} : {
  children: ReactNode
}) {
  
  return (
    <div className="flex justify-start items-center"> 
      <Navbar/>
      <main className="flex justify-center items-center flex-col w-full h-full">
        {children}
      </main>
    </div>
  )
}
