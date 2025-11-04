'use client'

import { YaMap } from "@/src/widgets/contact/ui/YaMap";
import styles from './Contacts.module.scss';

export function Contacts({ idSection, titleSection }: { idSection: string, titleSection: string }) {
    return (
        <section id={idSection} className='container'>
            <div className={styles.contacts}>
                <h2 className={`${styles.title} section-title`}>{titleSection}</h2>
                <div className={styles.contactsWrap}>
                    <div className={styles.info}>

                    </div>
                    <YaMap
                        address="МКАД, 44-й километр, 1Вс2"
                        height="500px"
                    />
                </div>
            </div>
        </section>
    );
}