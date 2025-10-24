'use client'

import { useEffect } from 'react'
import { Fancybox as NativeFancybox } from '@fancyapps/ui'
import '@fancyapps/ui/dist/fancybox/fancybox.css'
// @ts-ignore
import type { OptionsType } from '@fancyapps/ui/types/Fancybox/options'

interface FancyboxProviderProps {
    children: React.ReactNode
}

const options: Partial<OptionsType> = {
    // Настройки Fancybox
    Thumbs: {
        type: 'modern',
    },
    Toolbar: {
        display: {
            left: ['infobar'],
            middle: [],
            right: ['close'],
        },
    },
    Images: {
        zoom: true,
    },
}

export function FancyboxProvider({ children }: FancyboxProviderProps) {
    useEffect(() => {
        NativeFancybox.bind('[data-fancybox]', options)

        return () => {
            NativeFancybox.destroy()
        }
    }, [])

    return <>{children}</>
}