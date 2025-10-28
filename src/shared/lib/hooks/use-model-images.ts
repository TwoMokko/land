import { useState, useMemo, useCallback } from 'react';
import { modelImagesConfig, colorNames } from '../config/model-images';
import { ColorSlug } from "@/src/shared/api/types";

interface UseModelImagesProps {
    modelSlug: string;
    colors?: ColorSlug[] | string[];
}

export function useModelImages({ modelSlug, colors = [] }: UseModelImagesProps) {
    // Стабильное определение доступных цветов
    const availableColors = useMemo((): ColorSlug[] => {
        if (colors && colors.length > 0) {
            return colors as ColorSlug[];
        }

        const configColors = Object.keys(modelImagesConfig[modelSlug] || {});
        return configColors.length > 0 ? configColors : ['default'];
    }, [modelSlug, colors]);

    // Стабильное начальное состояние - всегда первый цвет
    const [selectedColor, setSelectedColor] = useState<ColorSlug>(
        availableColors[0] || 'default'
    );

    const currentImages = useMemo(() => {
        return modelImagesConfig[modelSlug]?.[selectedColor] || [];
    }, [modelSlug, selectedColor]);

    // useCallback для стабильных функций
    const getImagePath = useCallback((image: string): string => {
        return `/images/models/${modelSlug}/${selectedColor}/${image}`;
    }, [modelSlug, selectedColor]);

    const getColorName = useCallback((colorSlug: ColorSlug): string => {
        return colorNames[colorSlug] || colorSlug;
    }, []);

    return {
        selectedColor,
        setSelectedColor,
        currentImages,
        availableColors,
        getImagePath,
        getColorName,
        hasMultipleColors: availableColors.length > 1,
        hasImages: currentImages.length > 0
    };
}