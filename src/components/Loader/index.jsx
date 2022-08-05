import { createPortal } from 'react-dom';

import styles from './styles.module.css';

const loaderRoot = document.getElementById('loader-root');

export default function Loader() {
    return createPortal(
        <div className={styles.container}>
            <div className={styles.spinner}></div>
        </div>
    , loaderRoot);
}
