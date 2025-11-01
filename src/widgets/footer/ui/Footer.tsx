'use client'

import styles from './Footer.module.scss'
import Image from "next/image";
import React, {useState} from "react";
import { useSubmit } from "@/src/shared/lib/hooks/useSubmit";
import { usePhoneMask } from "@/src/shared/lib/hooks/usePhoneMask";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { AiFillYoutube } from "react-icons/ai";
import { RiTelegram2Fill, RiVkFill } from "react-icons/ri";
import { FiArrowRight } from "react-icons/fi";
import { MdDone } from "react-icons/md";
import Link from "next/link";
import { FormData, SectionId } from "@/src/shared/types/types";
import { about } from "@/src/shared/config/model-base";

// ПЕРЕПИСАТЬ (чтобы приходило извне)
const modelsTitle = [
    { slug: 'model1', title: 'Модель 1' },
    { slug: 'model2', title: 'Модель 2' },
    { slug: 'model3', title: 'Модель 3' },
]

export function Footer() {
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

    // сделать как в header
    // const handleScrollToSection = (sectionId: SectionId | string) => {
    //     const element = document.getElementById(sectionId);
    //     if (element) {
    //         element.scrollIntoView({ behavior: 'smooth' });
    //     }
    // };

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
                            className='inst'
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
                                    value={phoneValue}
                                    onChange={handlePhoneChange}
                                    required
                                />
                                <button type="submit" disabled={!isAgreed || isLoading}>
                                    <FiArrowRight size={20}/>
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
                    <div>
                        <h4 className={styles.navModelsTitle}>Модели</h4>
                        <div className={styles.navModels}>
                            {modelsTitle.map(itm => <a
                                key={itm.slug}
                                href={`#${itm.slug}`}
                                className={styles.navLink}
                            >
                                {itm.title}
                            </a>)}
                        </div>
                    </div>
                    <div className={styles.navSections}>
                        <a href={`#${SectionId.CREDIT}`} className={styles.navLink}>
                            Автокредит
                        </a>
                        <a href={`#${SectionId.TRADE_IN}`} className={styles.navLink}>
                            Trade-in
                        </a>
                        <a href={`#${SectionId.EQUIPMENTS}`} className={styles.navLink}>
                            Комплектации
                        </a>
                    </div>
                    <div>
                        <h4 className={styles.contactsTitle}>Контакты</h4>
                        <div className={styles.contactsList}>
                            {/*может быть, на Link заменить*/}
                            <a href={`tel:${about.phoneLink}`} className={styles.contactsItem}>{about.phone}</a>
                            <a href={`mailto:${about.email}`} className={styles.contactsItem}>{about.email}</a>
                            <span className={styles.contactsItem}>{about.address}</span>
                            <span className={styles.contactsItem}>{about.time}</span>
                        </div>
                    </div>
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