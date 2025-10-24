'use client'

import React, { createContext, useContext, useState } from 'react';
import { ErrorModal, OrderModal, SuccessModal } from "@/src/widgets/modals";

export type ModalType = 'order' | 'contact' | 'success' | 'error' | 'image' | 'video'

interface ModalData {
    model?: any
    price?: number
    title?: string
    imageUrl?: string
}

interface ModalContextType {
    openModal: (type: ModalType, data?: ModalData) => void
    closeModal: () => void
    currentModal: ModalType | null
    modalData: ModalData | null
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function ModalProvider({ children }: { children: React.ReactNode }) {
    const [currentModal, setCurrentModal] = useState<ModalType | null>(null)
    const [modalData, setModalData] = useState<ModalData | null>(null)

    const openModal = (type: ModalType, data?: ModalData) => {
        document.body.classList.add('modal-open')
        setCurrentModal(type)
        setModalData(data || null)
    }

    const closeModal = () => {
        document.body.classList.remove('modal-open')
        setCurrentModal(null)
        setModalData(null)
    }

    return (
        <ModalContext.Provider value={{ openModal, closeModal, currentModal, modalData }}>
            {children}

            {currentModal === 'order' && <OrderModal />}
            {currentModal === 'success' && <SuccessModal />}
            {currentModal === 'error' && <ErrorModal />}
            {/*{currentModal === 'contact' && <ContactModal />}*/}
        </ModalContext.Provider>
    )
}

export const useModal = () => {
    const context = useContext(ModalContext)
    if (!context) {
        throw new Error('useModal must be used within ModalProvider')
    }
    return context
}