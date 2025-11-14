"use client";

import React, { ReactNode, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { MdDone } from "react-icons/md";

import Image from "next/image";
import Link from "next/link";

import { useDevice } from "@/src/shared/lib/hooks/useDevice";
import { usePhoneMask } from "@/src/shared/lib/hooks/usePhoneMask";
import { useSubmit } from "@/src/shared/lib/hooks/useSubmit";
import { FormData } from "@/src/shared/types/types";
import { Button } from "@/src/shared/ui/button/Button";

import styles from "./TestDrive.module.scss";

// почистить, вынести логику и данные в отдельные файлы
interface TestDriveItem {
	id: number;
	formData: FormData;
	isAgreed: boolean;
	phoneValue: string;
	nameValue: string;
	src: string;
	mobileSrc: string;
	desktopSrc: string;
	title: string;
	description: ReactNode;
}

enum TestDriveId {
	TRADE_IN,
	TEST_DRIVE,
}

export function TestDrive() {
	const { isMobile, isReady } = useDevice();
	const { handleSubmit, isLoading } = useSubmit();

	const phoneMaskTestDrive = usePhoneMask();
	const phoneMaskTradeIn = usePhoneMask();

	const [testDriveItems, setTestDriveItems] = useState<TestDriveItem[]>([
		{
			id: TestDriveId.TRADE_IN,
			formData: { name: "", phone: "" },
			isAgreed: true,
			phoneValue: phoneMaskTradeIn.phoneValue,
			nameValue: "",
			src: "/images/testdrive/trade.png",
			mobileSrc: "/images/testdrive/trade.png",
			desktopSrc: "/images/testdrive/trade.png",
			title: "Трейд-ин",
			description: (
				<p className={styles.text}>
					Сдайте свой старый
					<br />
					авто и{" "}
					<span>
						получите
						<br />
						доп. скидку
					</span>{" "}
					на
					<br />
					покупку нового BAIC!
				</p>
			),
		},
		{
			id: TestDriveId.TEST_DRIVE,
			formData: { name: "", phone: "" },
			isAgreed: true,
			phoneValue: phoneMaskTestDrive.phoneValue,
			nameValue: "",
			src: "/images/testdrive/test-drive.png",
			mobileSrc: "/images/testdrive/test-drive.png",
			desktopSrc: "/images/testdrive/test-drive.png",
			title: "Тест-драйв",
			description: (
				<p className={styles.text}>
					Запишитесь
					<br />
					на тест-драйв
					<br />и получите <span>скидку 5%</span>
					<br />
					при покупке!
				</p>
			),
		},
	]);

	const [activeId, setActiveId] = useState(TestDriveId.TRADE_IN);

	const handleItemClick = (clickedId: number) => {
		setActiveId(clickedId);
	};

	const handleFormSubmit = async (e: React.FormEvent, itemId: number) => {
		e.preventDefault();
		e.stopPropagation();

		const item = testDriveItems.find((item) => item.id === itemId);
		if (!item) return;

		if (!item.isAgreed) {
			alert("Пожалуйста, согласитесь с обработкой персональных данных");
			return;
		}

		await handleSubmit(item.formData);
	};

	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>, itemId: number) => {
		const { value } = e.target;

		if (itemId === TestDriveId.TEST_DRIVE) {
			phoneMaskTestDrive.onPhoneChange(e);
		} else if (itemId === TestDriveId.TRADE_IN) {
			phoneMaskTradeIn.onPhoneChange(e);
		}

		setTestDriveItems((prevItems) =>
			prevItems.map((item) =>
				item.id === itemId
					? {
							...item,
							phoneValue: value,
							formData: { ...item.formData, phone: value },
						}
					: item,
			),
		);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, itemId: number) => {
		const { value } = e.target;
		setTestDriveItems((prevItems) =>
			prevItems.map((item) =>
				item.id === itemId
					? {
							...item,
							nameValue: value,
							formData: { ...item.formData, name: value },
						}
					: item,
			),
		);
	};

	const handleAgreementChange = (itemId: number, agreed: boolean) => {
		setTestDriveItems((prevItems) =>
			prevItems.map((item) => (item.id === itemId ? { ...item, isAgreed: agreed } : item)),
		);
	};

	const getPhoneValue = (itemId: number) => {
		if (itemId === TestDriveId.TEST_DRIVE) return phoneMaskTestDrive.phoneValue;
		if (itemId === TestDriveId.TRADE_IN) return phoneMaskTradeIn.phoneValue;
		return "";
	};

	return (
		<section className="container">
			<div className={styles.testDrive}>
				{testDriveItems.map((item) => (
					<div
						key={item.id}
						className={`${styles.item} ${activeId === item.id ? styles.active : styles.inactive}`}
						onClick={() => handleItemClick(item.id)}
					>
						<div className={styles.imageWrap}>
							<Image
								src={isMobile ? item.mobileSrc : item.desktopSrc}
								alt="test drive"
								fill
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw"
								className={styles.image}
							/>
							{activeId !== item.id && (
								<div className={styles.plus}>
									<FaPlus size={10} />
								</div>
							)}
						</div>
						<div className={styles.info}>
							<div className={styles.title}>{item.title}</div>
							{item.description}
							<form
								onSubmit={(e) => handleFormSubmit(e, item.id)}
								className={styles.form}
								onClick={(e) => e.stopPropagation()}
							>
								<div className={styles.formInputs}>
									<input
										type="tel"
										name="phone"
										placeholder="Телефон"
										value={getPhoneValue(item.id)}
										onChange={(e) => handlePhoneChange(e, item.id)}
										required
									/>
									<input
										type="text"
										name="name"
										placeholder="Ваше имя"
										value={item.nameValue}
										onChange={(e) => handleInputChange(e, item.id)}
										required
									/>
									<Button type="submit" disabled={!item.isAgreed || isLoading}>
										{isLoading ? "Отправка..." : "Получить предложение"}
									</Button>
								</div>

								<label className={styles.checkboxWrap}>
									<input
										type="checkbox"
										checked={item.isAgreed}
										onChange={(e) =>
											handleAgreementChange(item.id, e.target.checked)
										}
										required
									/>
									<span className={styles.checkbox}>
										{item.isAgreed && <MdDone />}
									</span>
									<div>
										Согласен на обработку
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
					</div>
				))}
			</div>
		</section>
	);
}
