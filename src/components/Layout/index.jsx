import styles from './styles.module.css';

export default function Layout(props) {
    const {
        children,
        header,
    } = props;

    return (
        <div className={styles.layout}>
            {header && <div className={styles.header}>{header}</div>}
            {children}
        </div>
    );
}
