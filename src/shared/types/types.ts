import { ModalType } from "@/src/app/providers/ModalProvider";

export interface Model {
	id: number;
	brand: string;
	name: string;
	price: number;
	recprice: number;
	slug: string;
	creditPay: number;
	colors: string[];
}
export interface Equipment {
	id: number;
	name: string;
	model: string;
	imagePath: string;
	brand: string;
	engine_capacity: number;
	power: string;
	kpp: string;
	drive: string;
}
export type ColorSlug = string;

export interface ModelImages {
	[color: string]: string[];
}

export interface ActionItem {
	id: number;
	title: string;
	subtitle: string;
	link: ModalType;
	icon: React.ReactNode;
}
export type ModalData = SubmitModel | ReelsData | null;
export interface ReelsData {
	videos: ReelsItem[];
	initialIndex?: number;
}

export interface ReelsItem {
	id: string | number;
	url: string;
	title?: string;
	subtitle?: string;
	icon?: string;
}
export interface ReviewAuthor {
	name: string;
	date: string;
	avatarSrc?: string | null;
}

export interface ReviewPhotoCard {
	id: number;
	type: "photo";
	author: ReviewAuthor;
	photoSrc: string;
}

export interface ReviewTextCard {
	id: number;
	type: "text";
	author: ReviewAuthor;
	text: string;
	link: string;
}

export interface ReviewDoubleSlide {
	id: number;
	type: "double";
	items: [ReviewTextCard, ReviewTextCard];
}

export type ReviewDesktopSlide = ReviewPhotoCard | ReviewDoubleSlide;
export type ReviewMobileSlide = ReviewPhotoCard | ReviewTextCard;

export interface SubmitModel {
	slug?: string;
	brand?: string;
	model?: string;
	equipment?: string;
	price?: number;
	reprice?: number;
	color?: string;
}
export interface SubmitData {
	name: string;
	phone: string;
	model?: SubmitModel;
}
export type FormData = Pick<SubmitData, "name" | "phone">;

export enum SectionId {
	MODELS = "models",
	SOCIAL = "social",
	EQUIPMENTS = "equipments",
	TRADE_IN = "tradein",
	REVIEWS = "reviews",
	CONTACTS = "contacts",
	CREDIT = "credit",
	STOCK = "stock",
}

export type SectionKey = keyof typeof SectionId;

export interface NavigationLink {
	title: string;
	href: string;
}

export interface YaMapConfig {
	center: [number, number];
	zoom: number;
	address: string;
	apiKey: string;
}

export interface PinConfig {
	size: [number, number];
	offset: [number, number];
}

export interface YaMapProps {
	address: string;
	className?: string;
}

export interface UseYandexMapProps {
	address: string;
	isMobile: boolean;
}

export interface UseYandexMapReturn {
	mapRef: React.RefObject<HTMLDivElement | null>;
	isLoading: boolean;
	error: string | null;
}

// export interface Stock {
// 	id: number;
// 	dmsCarId: number;
// 	vin: string;
// 	is_new: number;
// 	brand_id: number;
// 	model_id: number;
// 	mileage: number;
// 	year: number;
// 	modification: string;
// 	equipment: null;
// 	power: number;
// 	drive: string;
// 	wheel: string;
// 	body: string;
// 	gear: string;
// 	engine: string;
// 	volume: number;
// 	owners_number: string;
// 	pts: string;
// 	doors_count: number;
// 	custom: string;
// 	color: string;
// 	description: string;
// 	state: string;
// 	discountCredit: number;
// 	discountInsurance: number;
// 	discountTradeIn: number;
// 	max_discount: number;
// 	sellingPrice: number;
// 	discountSellingPrice: number;
// 	published: number;
// 	created_at: string;
// 	updated_at: string;
// 	generation: string;
// 	source: string;
// 	pseudoModel: string;
// 	sellingPricePercent: number;
// 	brand: {
// 		id: number;
// 		autoru_id: number | null;
// 		name: string;
// 	};
// 	model: {
// 		id: number;
// 		autoru_id: number | null;
// 		name: string;
// 		brand_id: number;
// 	};
// 	options: any;
// 	photos: {
// 		id: number;
// 		car_id: number;
// 		path: string;
// 		order: number;
// 	}[];
// }

export interface Stock {
	id: number;
	dmsCarId: string;
	is_new: number;
	brand: string;
	model: string;
	mileage: number;
	year: number;
	modification: string;
	equipment_id: number;
	equipment_name: string;
	power: number;
	drive: string;
	wheel: string;
	body: string;
	gear: string;
	engine: string;
	volume: number;
	owners_count: string | number;
	color: string;
	color_code: string;
	description?: string | null;
	discountCredit: number;
	discountInsurance: number;
	discountTradeIn: number;
	max_discount: number;
	sellingPrice: number;
	discountSellingPrice: number;
	created_at: string;
	updated_at: string;
	generation: string;
	pseudoModel: string;
	status: number;
	options?: OptionStock[];
	photos: PhotoStock[];
	pivot?: {
		site_setting_id: number;
		stock_model_id: number;
		sort_order_site: number;
	};
	site_setting_id?: number;
	sort_order_site?: number;
	stock_model_id?: number;
}

export interface OptionStock {
	id: number;
	name: string;
	category_id: number;
	key: string;
	created_at: string;
	updated_at: string;
	pivot: {
		car_id: number;
		option_id: number;
	};
}

export interface PhotoStock {
	value: string;
}
