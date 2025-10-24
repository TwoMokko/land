import { Model } from "@/src/shared/api/types";

export const mockModels: Model[] = [
    { id: 1, name: 'Модель 1', price: 1000, images: [
            '/images/models/1.webp',
            '/images/models/2.webp',
            '/images/models/3.webp',
            '/images/models/4.webp',
            '/images/models/5.webp',
            '/images/models/6.webp',
        ]
    },
    { id: 2, name: 'Модель 2', price: 2000, images: [
            '/images/models/1.webp',
            '/images/models/2.webp',
            '/images/models/3.webp',
            '/images/models/4.webp'
        ]
    },
    { id: 3, name: 'Модель 3', price: 3000, images: [
            '/images/models/1.webp',
            '/images/models/2.webp',
            '/images/models/3.webp',
            '/images/models/4.webp'
        ]
    },
    { id: 4, name: 'Модель 4', price: 4000, images: [
            '/images/models/1.webp',
            '/images/models/2.webp',
            '/images/models/3.webp',
            '/images/models/4.webp'
        ]
    },
    { id: 5, name: 'Модель 5', price: 4000, images: [
            '/images/models/1.webp',
            '/images/models/2.webp',
            '/images/models/3.webp',
            '/images/models/4.webp'
        ]
    },
] as const

// export type MockModel = typeof mockModels[number]