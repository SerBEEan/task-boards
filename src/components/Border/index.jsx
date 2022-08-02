import styles from './styles.module.css';

export default function Border({ children }) {
    return (
        <div className={styles.border}>
            {children}
        </div>
    );
}
