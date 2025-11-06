"use client";

import { useModal } from "@/src/app/providers/ModalProvider";

import styles from "./Modals.module.scss";

export function ErrorModal() {
	const { closeModal } = useModal();

	return (
		<div className={styles.modalOverlay} onClick={closeModal}>
			<div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
				<button className={styles.closeButton} onClick={closeModal}>
					×
				</button>

				<h2>Вы уже оставляли заявку!</h2>
				<p>Наш менеджер скоро свяжется с Вами</p>
			</div>
		</div>
	);
}
