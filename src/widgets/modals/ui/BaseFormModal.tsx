'use client'

import React, { useState } from 'react';
import styles from './Modals.module.scss';
import { useModal } from '@/src/app/providers/ModalProvider';
import { MdDone, MdOutlineClose } from "react-icons/md";
import { Button } from "@/src/shared/ui/button/Button";
import Link from "next/link";


interface BaseFormModalProps {
    title: string | React.ReactNode
    content?: string | React.ReactNode
    onClose?: () => void
    onSubmit?: (formData: FormData) => Promise<void>
}

interface FormData {
    name: string
    phone: string
    comment: string
}

export function BaseFormModal({ title, content }: BaseFormModalProps) {
    const { closeModal, openModal, modalData } = useModal()
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        phone: '',
        comment: ''
    })

    const [isAgreed, setIsAgreed] = useState(true)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!isAgreed) {
            alert('Пожалуйста, согласитесь с обработкой персональных данных')
            return
        }

        setIsLoading(true)

        try {
            // Отправка данных на API
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    model: modalData?.model, // Данные о товаре
                    productId: modalData?.model?.id,
                    productName: modalData?.model?.name,
                    productPrice: modalData?.model?.price
                }),
            })

            if (response.ok) {
                const result = await response.json()
                console.log('Заявка отправлена:', result)
                openModal('success')
            } else {
                throw new Error('Ошибка отправки')
            }
        } catch (error) {
            console.error('Ошибка:', error)
            openModal('error')
        } finally {
            setIsLoading(false)
        }
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

                <form onSubmit={handleSubmit} className={styles.form}>
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
                    <textarea
                        name="comment"
                        placeholder="Комментарий (необязательно)"
                        value={formData.comment}
                        onChange={handleInputChange}
                        rows={3}
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