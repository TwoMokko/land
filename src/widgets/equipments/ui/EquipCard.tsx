'use client'

import { Equipment, SubmitModel } from "@/src/shared/types/types";
import Image from "next/image";
import styles from "./Equipments.module.scss";
import { ModalType, useModal } from "@/src/app/providers/ModalProvider";
import { Button } from "@/src/shared/ui/button/Button";
import { useModels } from "@/src/app/providers/ModelsContext";

interface EquipCardProps {
    equip: Equipment
}

export function EquipCard( { equip }: EquipCardProps ) {
    const { openModal } = useModal();
    const { models } = useModels()

    // вынести в utils?
    const engineVolume = Math.ceil(equip.engine_capacity / 1000 * 10) / 10;
    // поменять данные, чтобы там это было?
    const modelName = models.find(model => model.slug === equip.model)?.name;

    const handleModal = (id: ModalType) => {
        const submitEquip: SubmitModel = {
            brand: equip.brand,
            model: equip.model,
            equipment: equip.name,
        }

        openModal(id, submitEquip);
    }

    return <article className={styles.card}>

        <div className={styles.imageContainer}>
            <div className={styles.brandModelName}>{equip.brand} {modelName}</div>
            <Image
                src={equip.imagePath}
                alt={equip.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw"
                className={styles.image}
            />
        </div>
        <div className={styles.infoWrap}>
            <h3 className={styles.name}>{equip.name}</h3>
            <div className={styles.chars}>
                <div className={styles.charsItem}>
                    <span className={styles.charsTitle}>Двигатель</span>
                    <span className={styles.charsValue}>{engineVolume}</span>
                </div>
                <div className={styles.charsItem}>
                    <span className={styles.charsTitle}>КПП</span>
                    <span className={styles.charsValue}>{equip.kpp}</span>
                </div>
                <div className={styles.charsItem}>
                    <span className={styles.charsTitle}>Мощность</span>
                    <span className={styles.charsValue}>{String(equip.power || '').slice(0, 3)}</span>
                </div>
                <div className={styles.charsItem}>
                    <span className={styles.charsTitle}>Привод</span>
                    <span className={styles.charsValue}>{equip.drive}</span>
                </div>
            </div>
            <div className={styles.btnWrap}>
                <Button onClick={() => handleModal('credit')}>Рассчитать кредит</Button>
                <Button onClick={() => handleModal('order')} variant={'secondary'} withArrow>Получить предложение</Button>
            </div>
        </div>
    </article>
}