'use client'

import styles from './Footer.module.scss'
import Image from "next/image";
import React, {useState} from "react";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { AiFillYoutube } from "react-icons/ai";
import { RiTelegram2Fill, RiVkFill } from "react-icons/ri";
import { MdDone } from "react-icons/md";
import Link from "next/link";
import { useSubmit } from "@/src/shared/lib/hooks/useSubmit";
import { FormData } from "@/src/shared/api/types";
import { FiArrowRight } from "react-icons/fi";

export function Footer() {
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

    return (
        <footer className={styles.footer}>
            <div className='container'>
                <div className={styles.iconsWrap}>
                    <Link
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image
                            src='/images/icons/logo-footer.svg'
                            alt='logo'
                            width={245}
                            height={30}
                        />
                    </Link>
                    <div className={styles.social}>
                        <Link
                            href="/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <BiLogoInstagramAlt size={25} />
                        </Link>
                        <Link
                            href="/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <AiFillYoutube size={25} />
                        </Link>
                        <Link
                            href="/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <RiVkFill size={25} />
                        </Link>
                        <Link
                            href="/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <RiTelegram2Fill size={25} />
                        </Link>
                    </div>
                </div>
                <div className={styles.main}>
                    <div>
                        <form onSubmit={submit} className={styles.form}>
                            <h3 className={styles.formTitle}>Оставьте заявку и мы свяжемся с вами</h3>
                            <div className={styles.formInputs}>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Телефон"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                />
                                <button type="submit" disabled={!isAgreed || isLoading}>
                                    <FiArrowRight size={20} />
                                </button>
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
                    <div>Модели</div>
                    <div>Автокредит</div>
                    <div>Контакты</div>
                </div>
                <div className={styles.info}>
                    <p>
                        Обращаем Ваше внимание на то, что вся представленная на сайте информация, носит информационный характер и ни при каких условиях не является публичной офертой, определяемой положениями Статьи 437 (2) Гражданского кодекса Российской Федерации. Наличие конкретных комплектаций, опций и оборудования по доступным автомобилям уточняйте у продавцов консультантов. Условия акций ограничены, подробности уточняйте в отделе продаж дилерского центра.
                    </p>
                    <p>*Instagram — проект Meta Platforms Inc., деятельность которой запрещена в России</p>
                </div>
                <div className={styles.links}>
                    <span className={styles.link}>2025 SWM</span>
                    <Link
                        href="/policy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link}
                    >
                        Пользовательское соглашение
                    </Link>
                    <Link
                        href="/policy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link}
                    >
                        Политика конфиденциальности
                    </Link>
                </div>
            </div>
        </footer>
    )
}