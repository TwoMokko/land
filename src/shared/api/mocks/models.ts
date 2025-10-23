import { Model } from "@/src/shared/api/types";

export const mockModels: Model[] = [
    { id: 1, name: 'Модель 1', price: 1000, images: [
            '/images/1.webp',
            '/images/2.webp',
            '/images/3.webp',
            '/images/4.webp'
        ]
    },
    { id: 2, name: 'Модель 2', price: 2000, images: [
            '/images/1.webp',
            '/images/2.webp',
            '/images/3.webp',
            '/images/4.webp'
        ]
    },
    { id: 3, name: 'Модель 3', price: 3000, images: [
            '/images/1.webp',
            '/images/2.webp',
            '/images/3.webp',
            '/images/4.webp'
        ]
    },
    { id: 4, name: 'Модель 4', price: 4000, images: [
            '/images/1.webp',
            '/images/2.webp',
            '/images/3.webp',
            '/images/4.webp'
        ]
    },
] as const

// export type MockModel = typeof mockModels[number]