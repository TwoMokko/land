import { Metadata } from 'next';
import styles from './page.module.scss';
import { Button } from "../shared/ui/button/Button";
import { ProductCarousel } from "@/src/widgets/product-carousel";

export const metadata: Metadata = {
  title: 'Главная страница',
  description: 'Дескрипшн главной страницы',
}

export default function Home() {
    return (
        <div className="container">
            <h1 className={styles.title}>Главная страница заголовок</h1>
            <p>текст на главной тест</p>
            <ProductCarousel />
            <Button variant="primary">Кнопка</Button>
        </div>
    );
}
