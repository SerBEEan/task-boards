import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import Checkbox, { LabelPlacement } from '../Checkbox';
import Tag from '../Tag';

import { getEnum } from '../../utils/getEnum';

import styles from './styles.module.css';

export default function SelectTags({ options = [], block = false, value = [], onChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef();

    const [selected, setSelected] = useState(getEnum(value));

    const clickToggle = () => {
        setIsOpen((prev) => !prev);
    };

    const clickItem = (e, color) => {
        e.preventDefault();

        setSelected((prev) => {
            const newSelected = { ...prev };
            if (newSelected[color]) {
                delete newSelected[color];
            } else {
                newSelected[color] = color;
            }

            return newSelected;
        });
    };

    useEffect(() => {
        const listener = (e) => {
            if (!e.path.includes(buttonRef.current)) {
                setIsOpen((prev) => {
                    if (prev) {
                        onChange?.(Object.keys(selected));
                    }

                    return false;
                });
            }
        };

        document.addEventListener('click', listener);

        return () => {
            document.removeEventListener('click', listener);
        };
    }, [selected, onChange]);

    return (
        <div
            className={classNames(styles.select, {[styles.fullWidth]: block}, {[styles.selectShow]: isOpen})}
            ref={buttonRef}
        >
            <button className={styles.selectToggle} onClick={clickToggle}>
                Выбрать тег
            </button>
            <div className={styles.selectDropdown}>
                <ul className={styles.selectOptions}>
                    {options.map((option, i) => (
                        <li
                            key={option.color + i}
                            className={styles.selectOption}
                            onClick={(e) => clickItem(e, option.color)}
                        >
                            <Checkbox
                                label={<Tag color={option.color} block />}
                                labelPlacement={LabelPlacement.left}
                                block
                                checked={Boolean(selected[option.color])}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
