import classNames from 'classnames';
import styles from './styles.module.css';

export default function Border({ children, block = false }) {
    return (
        <div className={classNames(styles.border, {[styles.fullWidth]: block})}>
            {children}
        </div>
    );
}
