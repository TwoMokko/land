"use client";

import styles from "./Header.module.scss";
import { Button } from "@/src/shared/ui/button/Button";
import React, { useEffect, useState, useRef } from "react";
import { useModal } from "@/src/app/providers/ModalProvider";
import Link from "next/link";
import { ArrowIcon } from "@/src/shared/ui/icons/ArrowIcon";
import { NAVIGATION_LINKS, CONTACT_INFO, SCROLL } from "../constants/navigation";

export function Header() {
    const { openModal } = useModal();
    const [isScrolled, setIsScrolled] = useState(false);
    const [burgerOpen, setBurgerOpen] = useState(false);
    const burgerMenuRef = useRef<HTMLDivElement>(null);
    const burgerButtonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        
        const handleScroll = () => {
            setIsScrolled(window.scrollY > SCROLL);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (!burgerOpen) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (!(event.target instanceof Node)) return; 
            if (!burgerMenuRef.current || !burgerButtonRef.current) return;
          
            if (
              !burgerMenuRef.current.contains(event.target) &&
              !burgerButtonRef.current.contains(event.target)
            ) {
              setBurgerOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [burgerOpen]);

    const handleOpenCreditModal = () => {
        openModal("credit");
    };

    const toggleBurgerMenu = () => {
        setBurgerOpen((prev) => !prev);
    };

    const closeBurgerMenu = () => {
        setBurgerOpen(false);
    };

    const renderNavLinks = (onClickHandler?: () => void) => (
        NAVIGATION_LINKS.map((link) => (
            <li key={link.href}>
                <a 
                    className={styles.link} 
                    href={link.href}
                    onClick={onClickHandler}
                >
                    {link.title}
                </a>
            </li>
        ))
    );

    return (
        <header className={`${styles.headerWrapper} ${burgerOpen ? styles.active : ""}`}>
            <div className={`${styles.headerContacts} mob-hide`}>
                <div className={`${styles.container} container`}>
                    <div>{CONTACT_INFO.address}</div>
                    <div>
                        <div>
                            <a href={CONTACT_INFO.phoneLink}>{CONTACT_INFO.phone}</a>
                        </div>
                        <Button
                            variant="outline"
                            className={styles.headerTopBtn}
                            onClick={handleOpenCreditModal}
                        >
                            <ArrowIcon />
                            <span>Обратный звонок</span>
                        </Button>
                    </div>
                </div>
            </div>

            <div className={`${styles.header} ${isScrolled ? styles.scroll : ""}`}>
                <div className={`${styles.container} container`}>
                    <div className={styles.headerInner}>
                        <Link href="/" className={styles.headerLogo} aria-label="Главная страница" />

                        <nav>
                            <ul className={styles.headerNav}>
                                {renderNavLinks()}
                            </ul>
                        </nav>

                        <Button
                            className="mob-hide tablet-hide"
                            variant="secondary"
                            withArrow
                            onClick={handleOpenCreditModal}
                        >
                            Рассчитать кредит
                        </Button>

                        <div className={`${styles.headerPhone} desk-hide`}>
                            <a href={CONTACT_INFO.phoneLink}>{CONTACT_INFO.phone}</a>
                        </div>

                        <div
                            ref={burgerButtonRef}
                            className={`${styles.headerBurger} ${burgerOpen ? styles.active : ""}`}
                            onClick={toggleBurgerMenu}
                            aria-label="Меню"
                            role="button"
                            tabIndex={0}
                            aria-expanded={burgerOpen}
                        >
                            <span></span>
                        </div>
                    </div>

                    <div ref={burgerMenuRef} className={styles.headerBurgerMenu}>
                        <div className={styles.headerBurgerMenuWrapper}>
                            <ul className={styles.headerBurgerMenuList}>
                                {renderNavLinks(closeBurgerMenu)}
                            </ul>

                            <ul className={styles.headerBurgerMenuContacts}>
                                <li className={styles.headerBurgerMenuContactsItem}>
                                    {CONTACT_INFO.address}
                                </li>
                                <li className={styles.headerBurgerMenuContactsItem}>
                                    <a href={CONTACT_INFO.phoneLink}>
                                        <strong>{CONTACT_INFO.phone}</strong>
                                    </a>
                                </li>
                            </ul>

                            <div className={styles.headerBurgerMenuBtns}>
                                <Button onClick={handleOpenCreditModal}>
                                    Обратный звонок
                                </Button>
                                <Button
                                    variant="secondary"
                                    withArrow
                                    onClick={handleOpenCreditModal}
                                >
                                    Рассчитать кредит
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
