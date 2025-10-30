'use client'

import React, { createContext, useContext, useState } from 'react';
import { ErrorModal, OrderModal, SuccessModal, CreditModal, TradeModal } from "@/src/widgets/modals";
import { SubmitModel } from "@/src/shared/api/types";

export type ModalType = 'order' | 'credit' | 'trade' | 'success' | 'error' | 'image' | 'video'


interface ModalContextType {
    openModal: (type: ModalType, data?: SubmitModel) => void
    closeModal: () => void
    currentModal: ModalType | null
    modalData: SubmitModel | null
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function ModalProvider({ children }: { children: React.ReactNode }) {
    const [currentModal, setCurrentModal] = useState<ModalType | null>(null)
    const [modalData, setModalData] = useState<SubmitModel | null>(null)

    const openModal = (type: ModalType, data?: SubmitModel) => {
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
            {currentModal === 'credit' && <CreditModal />}
            {currentModal === 'trade' && <TradeModal />}
            {currentModal === 'success' && <SuccessModal />}
            {currentModal === 'error' && <ErrorModal />}
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