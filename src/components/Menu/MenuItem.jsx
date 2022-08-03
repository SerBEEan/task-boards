import styles from './styles.module.css';


export function MenuItem({ children, onClick }) {
    return (
        <button className={styles.menuItem} onClick={onClick}>
            {children}
        </button>
    );
}
