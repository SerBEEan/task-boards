import classNames from 'classnames';

import styles from './styles.module.css';

export default function Layout(props) {
    const {
        children,
        header,
        block = false,
    } = props;

    return (
        <div className={classNames(styles.layout, {[styles.fullWidth]: block})}>
            {header && <div className={styles.header}>{header}</div>}
            {children}
        </div>
    );
}
