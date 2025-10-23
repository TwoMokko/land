import styles from './Button.module.scss'

interface ButtonProps {
    children: React.ReactNode
    variant?: 'primary' | 'secondary'
    onClick?: () => void
}

export function Button({ children, variant = 'primary', onClick }: ButtonProps) {
    const className = `${styles.button} ${variant === 'secondary' ? styles.secondary : ''}`

    return (
        <button className={className} onClick={onClick}>
            {children}
        </button>
    )
}