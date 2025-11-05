"use client";

import styles from "./Header.module.scss";
import { Button } from "@/src/shared/ui/button/Button";
import React, { useEffect, useState, useRef } from "react";
import { useModal } from "@/src/app/providers/ModalProvider";
import Link from "next/link";
import { navigationLinks, about, scrollThreshold } from "@/src/shared/config";
import { NavigationLink } from "@/src/shared/types/types";
import { useDevice } from "@/src/shared/lib/hooks/useDevice";
import { FiArrowRight } from "react-icons/fi";

export function Header() {
    const { openModal } = useModal();
    const { isMobile, isReady } = useDevice();
    const [isScrolled, setIsScrolled] = useState(false);
    const [burgerOpen, setBurgerOpen] = useState(false);
    const burgerMenuRef = useRef<HTMLDivElement>(null);
    const burgerButtonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.body.classList.toggle("lock", burgerOpen);

        return () => {
            document.body.classList.remove("lock");
        };
    }, [burgerOpen]);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const handleScroll = () => {
            setIsScrolled(window.scrollY > scrollThreshold);
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

    const renderNavLinks = (onClickHandler?: () => void) =>
        navigationLinks.map((link: NavigationLink) => (
            <li key={link.href}>
                <a className={styles.link} href={link.href} onClick={onClickHandler}>
                    {link.title}
                </a>
            </li>
        ));

    return (
        <header className={`${styles.headerWrapper} ${burgerOpen ? styles.active : ""}`}>
            {isReady && !isMobile && (
                <div className={styles.headerContacts}>
                    <div className={`${styles.container} container`}>
                        <div>{about.address}</div>
                        <div>
                            <div>
                                <a href={`tel:${about.phoneLink}`}>{about.phone}</a>
                            </div>
                            <Button
                                variant="outline"
                                className={styles.headerTopBtn}
                                onClick={handleOpenCreditModal}
                            >
                                <FiArrowRight />
                                <span>Обратный звонок</span>
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <div className={`${styles.header} ${isScrolled ? styles.scroll : ""}`}>
                <div className={`${styles.container} container`}>
                    <div className={styles.headerInner}>
                        <Link
                            href="/"
                            className={styles.headerLogo}
                            aria-label="Главная страница"
                        />

                        <nav>
                            <ul className={styles.headerNav}>{renderNavLinks()}</ul>
                        </nav>

                        {isReady && !isMobile && (
                            <Button variant="secondary" withArrow onClick={handleOpenCreditModal}>
                                Рассчитать кредит
                            </Button>
                        )}

                        {isReady && isMobile && (
                            <div className={styles.headerPhone}>
                                <a href={`tel:${about.phoneLink}`}>{about.phone}</a>
                            </div>
                        )}

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
                                    {about.address}
                                </li>
                                <li className={styles.headerBurgerMenuContactsItem}>
                                    <a href={`tel:${about.phoneLink}`}>
                                        <strong>{about.phone}</strong>
                                    </a>
                                </li>
                            </ul>

                            <div className={styles.headerBurgerMenuBtns}>
                                <Button onClick={handleOpenCreditModal}>Обратный звонок</Button>
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
