'use client'

import React, { useState } from 'react';
import styles from './Modals.module.scss';
import { FormData } from "@/src/shared/api/types";
import { useModal } from '@/src/app/providers/ModalProvider';
import { useSubmit } from "@/src/shared/lib/hooks/useSubmit";
import { MdDone, MdOutlineClose } from "react-icons/md";
import { Button } from "@/src/shared/ui/button/Button";
import Link from "next/link";


interface BaseFormModalProps {
    title: string | React.ReactNode
    content?: string | React.ReactNode
    onClose?: () => void
    onSubmit?: (formData: FormData) => Promise<void>
}



export function BaseFormModal({ title, content }: BaseFormModalProps) {
    const { closeModal } = useModal()
    const { handleSubmit, isLoading } = useSubmit();
    const [isAgreed, setIsAgreed] = useState(true);
    const [formData, setFormData] = useState<FormData>({
        name: '',
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
        <div className={styles.modalOverlay} onClick={closeModal}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={closeModal}>
                    <MdOutlineClose />
                </button>

                { title }
                { content }

                <form onSubmit={submit} className={styles.form}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Ваше имя"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Телефон"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                    />
                    <Button type="submit" disabled={!isAgreed || isLoading}>
                        {isLoading ? 'Отправка...' : 'Отправить заявку'}
                    </Button>

                    <label className={styles.checkboxWrap}>
                        <input
                            type="checkbox"
                            checked={isAgreed}
                            onChange={(e) => setIsAgreed(e.target.checked)}
                            required
                        />
                        <span className={styles.checkbox}>
                            { isAgreed && <MdDone /> }
                        </span>
                        <div>Согласен на обработку персональных данных <br/>согласно
                            <Link
                                href="/policy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.policyLink}
                            >
                                политике конфиденциальности*
                            </Link>
                        </div>
                    </label>
                </form>
            </div>
        </div>
    )
}