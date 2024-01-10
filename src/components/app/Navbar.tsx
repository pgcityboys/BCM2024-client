import { FC } from "react";
import { ModeToggle } from "../ModeToggle";
import Image from "next/image";
import { ballista } from "../fonts";
import { NavLinks } from "./NavLinks";

export const Navbar: FC = () => {
  return (
   <div id="nvbar" className="flex flex-col items-center justify-start gap-8 w-[20%] h-full min-h-screen bg-yellow-400 text-center">
    <Image
      src={"/logo.svg"}
      alt="Application icon"
      width={100}
      height={760}
    />
    <h1 className={`text-black ${ballista.className} text-6xl`}> Get Bike </h1>
    <NavLinks/>
    <ModeToggle/>
   </div>
  )
}
