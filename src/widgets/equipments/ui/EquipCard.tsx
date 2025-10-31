'use client'

import { Equipment, SubmitModel } from "@/src/shared/types/types";
import Image from "next/image";
import styles from "./Equipments.module.scss";
import { ModalType, useModal } from "@/src/app/providers/ModalProvider";
import { Button } from "@/src/shared/ui/button/Button";

interface EquipCardProps {
    equip: Equipment
}

export function EquipCard( { equip }: EquipCardProps ) {
    const { openModal } = useModal();
    const handleModal = (id: ModalType) => {
        const submitEquip: SubmitModel = {
            brand: 'SWM',
            model: equip.model,
            equipment: equip.name,
        }

        openModal(id, submitEquip);
    }

    return <article className={styles.card}>

        <div className={styles.imageContainer}>
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
                list
            </div>
            <div className={styles.btnWrap}>
                <Button onClick={() => handleModal('credit')}>Рассчитать кредит</Button>
                <Button onClick={() => handleModal('order')} variant={'secondary'} withArrow>Получить предложение</Button>
            </div>
        </div>
    </article>
}