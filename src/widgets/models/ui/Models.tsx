'use client'

import React, { useEffect, useState } from 'react';
import styles from './Models.module.scss';

import { Model } from "@/src/shared/api/types";
import { getModels } from "@/src/shared/api";
import { ModelCard } from "@/src/widgets/models/ui/ModelCard";


export function Models({ idSection }: { idSection: string }) {
    const [models, setModels] = useState<Model[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadModels = async () => {
            try {
                setIsLoading(true);
                const models = await getModels();
                setModels(models);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Ошибка загрузки');
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
                    {models.map(model => (
                        <ModelCard key={model.id} model={model} />
                    ))}
                </div>
            </div>
        </section>
    )
}