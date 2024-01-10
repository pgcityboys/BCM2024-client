import { ModeToggle } from "@/components/ModeToggle"
import { Navbar } from "@/components/app/Navbar"
import { ReactNode } from "react"

export default function Layout({children} : {
  children: ReactNode
}) {
  
  return (
    <div className="flex justify-start items-center"> 
      <Navbar/>
      <main>
        {children}
      </main>
    </div>
  )
}
