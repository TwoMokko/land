'use client'

import styles from './Trade.module.scss';
import Image from "next/image";
import { FormData } from "@/src/shared/api/types";
import { useDevice } from "@/src/shared/lib/hooks/useDevice";
import React, { useState } from "react";
import { useSubmit } from "@/src/shared/lib/hooks/useSubmit";
import { Button } from "@/src/shared/ui/button/Button";
import { MdDone } from "react-icons/md";
import Link from "next/link";

export function Trade({ idSection }: { idSection: string }) {
    const { isMobile, isReady } = useDevice();
    const { handleSubmit, isLoading } = useSubmit();
    const [isAgreed, setIsAgreed] = useState(true);
    const [formData, setFormData] = useState<FormData>({
        name: 'переписать, чтобы было необязательным',
        phone: '',
    });

    const submit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!isAgreed) {
            alert('Пожалуйста, согласитесь с обработкой персональных данных');
            return;
        }

        await handleSubmit(formData);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }


    const imageSrc = !isReady ? '/images/zag.webp' :
        isMobile ? '/images/trade/trade-mob.png' :
            '/images/trade/trade-desk.png'

    return (
        <section id={idSection} className={styles.trade}>
            <div className={styles.imgWrap}>
                <Image
                    src={imageSrc}
                    alt='hero'
                    fill
                    sizes="100vw"
                    className={styles.image}
                />
            </div>
            <div className='container'>
                <div className={styles.info}>
                    <h2 className={styles.title}>Trade-in с выгодой <br />от Официального дилера</h2>
                    <ul className={styles.list}>
                        <li>Прозрачная оценка автомобиля</li>
                        <li>Скидка до 300 000₽ на новый авто  </li>
                        <li>Сдать авто можно в качестве первого взноса</li>
                    </ul>
                    <form onSubmit={submit} className={styles.form}>
                        <div className={styles.formInputs}>
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Телефон"
                                value={formData.phone}
                                onChange={handleInputChange}
                                required
                            />
                            <Button type="submit" disabled={!isAgreed || isLoading}>
                                {isLoading ? 'Отправка...' : 'Зафиксировать выгоду'}
                            </Button>
                        </div>

                        <label className={styles.checkboxWrap}>
                            <input
                                type="checkbox"
                                checked={isAgreed}
                                onChange={(e) => setIsAgreed(e.target.checked)}
                                required
                            />
                            <span className={styles.checkbox}>
                                {isAgreed && <MdDone/>}
                            </span>
                            <div>Согласен на обработку
                                <Link
                                    href="/policy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.policyLink}
                                >
                                    персональных данных*
                                </Link>
                            </div>
                        </label>
                    </form>
                </div>
            </div>
        </section>
    )
}