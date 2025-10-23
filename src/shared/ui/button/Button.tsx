import styles from './Button.module.scss'

interface ButtonProps {
    children: React.ReactNode
    type?: 'primary' | 'secondary'
    onClick?: () => void
}

export function Button({ children, type = 'primary', onClick }: ButtonProps) {
    const className = `${styles.button} ${type === 'secondary' ? styles.secondary : ''}`

    return (
        <button className={className} onClick={onClick}>
            {children}
        </button>
    )
}