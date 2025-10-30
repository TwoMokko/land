import { useState, useEffect } from 'react'

export function useDevice() {
    const [isMobile, setIsMobile] = useState(false)
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        const checkDevice = () => {
            setIsMobile(window.innerWidth <= 768)
            setIsReady(true)
        }

        checkDevice()
        window.addEventListener('resize', checkDevice)

        return () => window.removeEventListener('resize', checkDevice)
    }, [])

    return { isMobile, isReady }
}