import { ModelImages } from "@/src/shared/api/types";

export const modelImagesConfig: Record<string, ModelImages> = {
    'model1': {
        'red': ['1.webp', '2.webp', '3.webp', '4.webp', '5.webp'],
        'grey': ['1.webp', '2.webp', '3.webp', '4.webp'],
        'blue': ['1.webp', '2.webp', '3.webp', '4.webp'],
        'black': ['1.webp', '2.webp', '3.webp'],
    },
    'model2': {
        'green': ['1.webp', '2.webp', '3.webp', '4.webp'],
        'blue': ['1.webp', '2.webp', '3.webp'],
        'red': ['1.webp', '2.webp'],
    },
    'model3': {
        'green': ['1.webp', '2.webp', '3.webp', '4.webp'],
        'blue': ['1.webp', '2.webp', '3.webp'],
        'red': ['1.webp', '2.webp'],
    },
    'model4': {
        'green': ['1.webp', '2.webp', '3.webp', '4.webp'],
        'blue': ['1.webp', '2.webp', '3.webp'],
    },
    'model5': {
        'green': ['1.webp', '2.webp', '3.webp', '4.webp'],
        'blue': ['1.webp', '2.webp', '3.webp'],
    },
};

// Маппинг названий цветов для красивого отображения
export const colorNames: Record<string, string> = {
    'red': 'Красный',
    'grey': 'Серый',
    'gray': 'Серый',
    'white': 'Белый',
    'blue': 'Синий',
    'black': 'Черный',
    'silver': 'Серебристый',
    'default': 'Основной'
};