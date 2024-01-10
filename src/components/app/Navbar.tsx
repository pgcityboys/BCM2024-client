import { FC } from "react";
import { ModeToggle } from "../ModeToggle";
import Image from "next/image";

export const Navbar: FC = () => {
  return (
   <div id="nvbar" className="flex flex-col items-center justify-start gap-8 w-[20%] h-full min-h-screen bg-yellow-400">
    <Image
      src={"/logo.svg"}
      alt="Application icon"
      width={100}
      height={760}
    />
    <h1> Chuj </h1>
    <ModeToggle/>
   </div>
  )
}
