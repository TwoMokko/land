'use client'

import styles from "./Equipments.module.scss";
import React from "react";

export function Equipments({ idSection }: { idSection: string }) {
    return <section id={idSection} className="container">
        <div className={styles.equipments}>
            <div className={styles.top}>
                <h2 className={`${styles.title} section-title`}>Комплектации</h2>
                <div>filter</div>
            </div>
        </div>
    </section>
}