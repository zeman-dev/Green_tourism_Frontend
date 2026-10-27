'use client'

import { useRouter } from "next/navigation"
import { startTransition, useEffect, useState } from "react";

interface LayoutChildren{
    children: React.ReactNode,
}

export default function AuthLayout({  children }: LayoutChildren) {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
 
    useEffect(() => {
        router.refresh();
        startTransition(() => {
            setLoading(false);
        });
    }, [router]);

    return (
        <>
            {loading ? <div>Loading...</div> : children}
        </>
    );
}