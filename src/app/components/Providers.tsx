'use client'

import React, { FC, ReactNode } from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { MessagesProvider } from '@/context/messages'
import { SpiritAnimalProvider } from '@/context/spirit-animal'

interface ProvidersProps {
  children: ReactNode
}

const Providers: FC<ProvidersProps> = ({children}) => {
    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            <SpiritAnimalProvider>
                <MessagesProvider>
                    {children}
                </MessagesProvider>
            </SpiritAnimalProvider>
        </QueryClientProvider>
    )
}

export default Providers;