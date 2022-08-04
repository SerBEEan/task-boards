import styles from './styles.module.css';

export default function NotFound() {
    return (
        <div className={styles.content}>
            <span>404</span>
            <span>Страница не найдена</span>
        </div>
    );
}
