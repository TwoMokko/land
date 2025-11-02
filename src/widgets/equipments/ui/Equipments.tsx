'use client'

import React from "react";
import styles from "./Equipments.module.scss";

import { EquipCard } from "@/src/widgets/equipments/ui/EquipCard";
import Select from "react-select";
import { Button } from "@/src/shared/ui/button/Button";
import { useEquipments } from "@/src/shared/lib/hooks/useEquipments";
import { customSelectStyles } from "@/src/shared/config/model-select-styles";

export function Equipments({ idSection, titleSection }: { idSection: string, titleSection: string }) {
    const {
        displayedEquipments,
        isLoading,
        error,
        selectedModel,
        selectedEquipment,
        modelOptions,
        equipmentOptions,
        showMoreVisible,
        handleModelChange,
        handleEquipmentChange,
        handleShowMore
    } = useEquipments();


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
                <h2 className={`${styles.title} section-title`}>{titleSection}</h2>
                <div className={styles.filters}>
                    <Select
                        options={modelOptions}
                        value={selectedModel}
                        onChange={handleModelChange}
                        placeholder="Модель"
                        className={styles.select}
                        styles={customSelectStyles}
                        isClearable
                    />
                    <Select
                        options={equipmentOptions}
                        value={selectedEquipment}
                        onChange={handleEquipmentChange}
                        placeholder="Комплектация"
                        className={styles.select}
                        styles={customSelectStyles}
                        isClearable
                    />
                </div>
            </div>

            <div className={styles.cardWrap}>
                {displayedEquipments.map(equip => (
                    <EquipCard key={equip.id} equip={equip}/>
                ))}
            </div>

            { showMoreVisible && (
                <div className={`${styles.showMoreWrap} container`}>
                    <Button onClick={handleShowMore} variant='secondary'>
                        Показать ещё
                    </Button>
                </div>
            )}
        </div>
    </section>
}