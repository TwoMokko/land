import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-gray-700 mb-8">Страница не найдена</h2>
                <p className="text-gray-600 mb-8">Извините, мы не можем найти страницу которую вы ищете.</p>
                <Link
                    href="/"
                >
                    Вернуться на главную
                </Link>
            </div>
        </div>
    )
}