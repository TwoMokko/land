'use client'

import styles from './Credit.module.scss';
import Image from "next/image";
import { FormData } from "@/src/shared/types/types";
import { useDevice } from "@/src/shared/lib/hooks/useDevice";
import { usePhoneMask } from "@/src/shared/lib/hooks/usePhoneMask";
import { useSubmit } from "@/src/shared/lib/hooks/useSubmit";
import React, { useState } from "react";
import { Button } from "@/src/shared/ui/button/Button";
import { MdDone } from "react-icons/md";
import Link from "next/link";

export function Credit({ idSection }: { idSection: string }) {
    const { isMobile, isReady } = useDevice();
    const { handleSubmit, isLoading } = useSubmit();
    const { phoneValue, onPhoneChange } = usePhoneMask();
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

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onPhoneChange(e);
        setFormData(prev => ({
            ...prev,
            phone: e.target.value
        }))
    }


    const imageSrc = !isReady ? '/images/credit/credit-bg.webp' :
        isMobile ? '/images/credit/credit-bg-mob.webp' :
            '/images/credit/credit-bg.webp'

    return (
        <section id={idSection} className={styles.credit}>
            <div className={styles.imgWrap}>
                <Image
                    src={imageSrc}
                    alt='credit-bg'
                    fill
                    className={styles.image}
                />
            </div>
            <div className={styles.info}>
                <div>
                    <h2 className={styles.title}> Поможем подобрать <br /> лучшее кредитное <br /> предложение </h2>
                    <ul className={styles.list}>
                        <li>Ежемесячный платеж от 13 701 ₽/мес ⁴</li>
                        <li>Кредит от 0,01%* <span>(ПСК от 0,01% до 10,5%)</span></li>
                    </ul>
                </div>
                <form onSubmit={submit} className={styles.form}>
                    <div className={styles.formInputs}>
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Телефон"
                            value={phoneValue}
                            onChange={handlePhoneChange}
                            required
                        />
                        <Button type="submit" disabled={!isAgreed || isLoading}>
                            {isLoading ? 'Отправка...' : 'Получить предложение'}
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
                                {isAgreed && <MdDone />}
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
        </section>
    )
}