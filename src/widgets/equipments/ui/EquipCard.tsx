'use client'

import { Equipment } from "@/src/shared/api/types";
import Image from "next/image";
import styles from "./Equipments.module.scss";

interface EquipCardProps {
    equip: Equipment
}

export function EquipCard( { equip }: EquipCardProps ) {

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
        <h3>{equip.name}</h3>
    </article>
}