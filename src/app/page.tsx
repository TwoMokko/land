import { Metadata } from 'next';
import styles from './page.module.scss';
import { Button } from "@/shared/ui/button/Button";
import { ProductCarousel } from "@/widgets/product-carousel";

export const metadata: Metadata = {
  title: 'Главная страница',
  description: 'Дескрипшн главной страницы',
}

export default function Home() {
  return (
    <div className="bg-blue-100 px-20">
      <h1 className={styles.title}>Главная страница заголовок</h1>
      <p className="py-10">текст на главной тест</p>
        <Button variant="primary">Кнопка</Button>
        <ProductCarousel />
    </div>
  );
}
