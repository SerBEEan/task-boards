import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import Checkbox, { LabelPlacement } from '../Checkbox';
import Tag from '../Tag';
import { getEnum } from '../../utils/getEnum';

import styles from './styles.module.css';

export default function SelectTags(props) {
    const { options = [], block = false, value = [], onChange } = props;

    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef(null);

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
                if (isOpen) {
                    setIsOpen(false);
                    onChange?.(Object.keys(selected));
                }
            }
        };

        document.addEventListener('click', listener);

        return () => {
            document.removeEventListener('click', listener);
        };
    }, [selected, onChange, isOpen]);

    useEffect(() => {
        setSelected((prev) => {
            if (Object.keys(prev).toString() === value.toString()) {
                return prev;
            }

            return getEnum(value);
        });
    }, [value]);

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
                            key={option.color}
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
