'use client'

import { useRouter } from "next/navigation"
import { useEffect } from "react";

interface LayoutChildren{
    children: React.ReactNode,
    header: React.ReactNode,
    footer: React.ReactNode,
}

export default function AuthLayout({header, children, footer} : LayoutChildren){
 const router = useRouter();
 
 useEffect(()=>{
    router.refresh()
 },[])

return(
    <>
    {header}
    {children}
    {footer}
    </>
)
}