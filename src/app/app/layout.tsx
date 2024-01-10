import { ReactNode } from "react"

export default function Layout({children} : {
  children: ReactNode
}) {
  
  return (
    <div className="flex justify-start items-center"> 
       <div id="nvbar" className="flex flex-col items-center justify-start gap-8">
         chuj123
       </div>
      <main>
        {children}
      </main>
    </div>
  )
}
