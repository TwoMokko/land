import { Model } from "@/src/shared/api/types";

export const mockModels: Model[] = [
    { id: 1, name: 'Модель 1', slug: 'model1', price: 1000,
        colors: [
            'red',
            'grey',
            'blue',
            'black'
        ]
    },
    { id: 2, name: 'Модель 2', slug: 'model2', price: 2000,
        colors: [
            'green',
            'blue',
            'red',
        ]
    },
    { id: 3, name: 'Модель 3', slug: 'model3', price: 3000,
        colors: [
            'green',
            'blue',
            'red',
        ]
    },
    { id: 4, name: 'Модель 4', slug: 'model4', price: 4000,
        colors: [
            'green',
            'blue'
        ]
    },
    { id: 5, name: 'Модель 5', slug: 'model5', price: 4000,
        colors: [
            'green',
            'blue'
        ]
    },
] as const

// export type MockModel = typeof mockModels[number]