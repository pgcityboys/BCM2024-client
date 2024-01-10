'use client';
import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "../ui/button"
import { DropShadow } from "../ui/drop-shadow";

export const NavLinks = () => {

  const links = [
    {name: "Home", href: '/app'},
    {name: "Route", href: '/app/map'},
    {name: "My Account", href: "/app/account"}
  ]

  const pathname = usePathname()

  return (
    <div className="flex flex-col items-center justify-start">
      {links.map((link) => {
        return(
          <DropShadow key={link.name}>
            <Button role="link" variant="link"
            className="mx-4">
              <Link
                href={link.href}
                key={link.name}
                className={clsx(
                  "text-black",
                  {
                    "text-violet-700" : pathname === link.href,
                  }
                )}
              >
              <p> {link.name} </p>
              </Link>
            </Button>
          </DropShadow>
        )
      })}
    </div>
  )
}
