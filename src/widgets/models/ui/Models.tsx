'use client'

import React, { useEffect, useState } from 'react';
import styles from './Models.module.scss';

import { Model } from "@/src/shared/types/types";
import { getModels } from "@/src/shared/api";
import { ModelCard } from "@/src/widgets/models/ui/ModelCard";
import {Button} from "@/src/shared/ui/button/Button";


export function Models({ idSection }: { idSection: string }) {
    const [models, setModels] = useState<Model[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // логика для показать ещё
    const [displayedModels, setDisplayedModels] = useState<Model[]>([]);
    const [itemsPerPage] = useState<number>(3);
    const [visibleCount, setVisibleCount] = useState<number>(3);
    const [showMoreVisible, setShowMoreVisible] = useState<boolean>(true);

    useEffect(() => {
        const displayed = models.slice(0, visibleCount);
        setDisplayedModels(displayed);
        setShowMoreVisible(visibleCount < models.length);
    }, [models, visibleCount]);

    const handleShowMore = (): void => {
        setVisibleCount(prevCount => prevCount + itemsPerPage);
    };

    useEffect(() => {
        const loadModels = async () => {
            try {
                setIsLoading(true);
                const models = await getModels();
                setModels(models);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Ошибка загрузки моделей');
            } finally {
                setIsLoading(false);
            }
        }

        loadModels();
    }, [])


    if (isLoading) {
        return (
            <div className={styles.loading}>Загрузка моделей...</div>
        )
    }

    if (error) {
        return (
            <div className={styles.error}>{error}</div>
        )
    }

    return (
        <section id={idSection} className="container">
            <div className={styles.models}>
                <h2 className={`${styles.title} section-title`}>Модельный ряд </h2>

                <div className={styles.cardWrap}>
                    {displayedModels.map(model => (
                        <ModelCard key={model.id} model={model} />
                    ))}
                </div>

                { showMoreVisible && (
                    <div className={styles.showMoreWrap}>
                        <Button onClick={handleShowMore} variant='secondary'>
                            Показать ещё
                        </Button>
                    </div>
                )}
            </div>
        </section>
    )
}