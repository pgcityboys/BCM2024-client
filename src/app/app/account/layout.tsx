'use client';

import { NextAuthProvider } from "@/components/NextAuthProvider";
import { ReactNode } from "react";

const Layout = ({children} : {
  children: ReactNode
}) => {
  return (
    <NextAuthProvider>
      {children}
    </NextAuthProvider>
  )
}

export default Layout
