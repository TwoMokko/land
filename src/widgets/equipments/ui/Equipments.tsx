'use client'

import React, {useEffect, useState} from "react";
import styles from "./Equipments.module.scss";

import { Equipment } from "@/src/shared/api/types";
import { getEquipments } from "@/src/shared/api/equipments";
import { EquipCard } from "@/src/widgets/equipments/ui/EquipCard";

export function Equipments({ idSection }: { idSection: string }) {
    const [equipments, setEquipments] = useState<Equipment[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadEquipments = async () => {
            try {
                setIsLoading(true);
                const equipments = await getEquipments();
                setEquipments(equipments);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Ошибка загрузки комплектаций')
            } finally {
                setIsLoading(false);
            }
        }

        loadEquipments();
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


    return <section id={idSection}>
        <div className={styles.equipments}>
            <div className={`${styles.top} container`} >
                <h2 className={`${styles.title} section-title`}>Комплектации</h2>
                <div>filter</div>
            </div>

            <div className={styles.cardWrap}>
                {equipments.map(equip => (
                    <EquipCard key={equip.id} equip={equip} />
                ))}
            </div>
        </div>
    </section>
}