'use client'

import { useRouter } from "next/navigation"
import { startTransition, useEffect, useState } from "react";

interface LayoutChildren{
    children: React.ReactNode,
    header: React.ReactNode,
    footer: React.ReactNode,
}

export default function AuthLayout({ header, children, footer }: LayoutChildren) {
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
            {header}
            {loading ? <div>Loading...</div> : children}
            {footer}
        </>
    );
}