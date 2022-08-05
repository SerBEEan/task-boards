import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import styles from './styles.module.css';

const loaderRoot = document.getElementById('loader-root');
const body = document.body;

export default function Loader() {
    useEffect(() => {
        const isModalClose = body.style.position === '';
        
        if (isModalClose) {
            body.style.position = 'fixed';
            body.style.top = `-${window.scrollY}px`;
        }
        
        return () => {
            const scrollY = body.style.top;

            if (scrollY !== '' && isModalClose) {
                body.style.position = '';
                body.style.top = '';
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            }
        };
    }, []);
    
    return createPortal(
        <div className={styles.container}>
            <div className={styles.spinner}></div>
        </div>
    , loaderRoot);
}
