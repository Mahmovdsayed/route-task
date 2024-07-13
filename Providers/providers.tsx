// app/providers.tsx
'use client'

import LoadingScreen from '@/components/layout/LoadingScreen';
import { NextUIProvider } from '@nextui-org/react'
import { useEffect, useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    return <>
        {loading ? <LoadingScreen /> :
            <NextUIProvider>
                {children}
            </NextUIProvider >
        }

    </>
}