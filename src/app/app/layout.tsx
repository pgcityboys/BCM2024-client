import { Navbar } from "@/components/app/Navbar"
import { ReactNode } from "react"
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions} from "../api/auth/[...nextauth]/route";
import { isNull } from "util";

const Layout = async ({children} : {
  children: ReactNode
}) => {

  const session = await getServerSession(authOptions)
  if(isNull(session)){
    redirect('/login')
  }

  return (
    <body>
      <div className="flex justify-start items-center"> 
        <Navbar/>
        <main className="flex justify-center items-center flex-col w-full h-full">
          {children}
        </main>
      </div>
    </body>
  )
}


export default Layout;

