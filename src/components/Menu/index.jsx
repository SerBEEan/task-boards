import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import Button, { Shape, Size, Type } from '../Button';

import {ReactComponent as IconClose} from '../../Icons/close.svg';

import styles from './styles.module.css';

export { MenuItem } from './MenuItem';

export default function Menu({ children, trigger }) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    const openMenu = () => {
        setIsOpen(true);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        const listener = (e) => {
            const clickedIsInMenu = e.path.includes(containerRef.current);
            if (!clickedIsInMenu) {
                closeMenu();
            }
        };

        document.addEventListener('click', listener);
        return () => {
            document.removeEventListener('click', listener);
        };
    }, []);

    return (
        <div className={styles.container} ref={containerRef}>
            <div onClick={openMenu}>
                {trigger}
            </div>    
            <div className={classNames(styles.menu, {[styles.menuShow]: isOpen})}>
                <div className={styles.buttonClose}>
                    <Button size={Size.xs} shape={Shape.circle} type={Type.text} icon={<IconClose />} onClick={closeMenu} />
                </div>
                {children}
            </div>
        </div>
    );
}
