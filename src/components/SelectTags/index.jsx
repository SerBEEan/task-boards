import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { useController } from 'react-hook-form';
import Checkbox, { LabelPlacement } from '../Checkbox';
import Tag from '../Tag';

import styles from './styles.module.css';

export default function SelectTags(props) {
    const {
        options = [],
        block = false,
        control,
        name,
    } = props;
    
    const { field: { value, onChange } } = useController({ name, control, defaultValue: [] });

    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef(null);

    const clickToggle = (e) => {
        e.preventDefault();
        setIsOpen((prev) => !prev);
    };

    const clickItem = (e, color) => {
        e.preventDefault();
        onChange(value.includes(color)
            ? value.filter((selectedColor) => selectedColor === color)
            : [...value, color]
        );
    };

    useEffect(() => {
        const listener = (e) => {
            if (!e.path.includes(buttonRef.current)) {
                if (isOpen) {
                    setIsOpen(false);
                }
            }
        };

        document.addEventListener('click', listener);

        return () => {
            document.removeEventListener('click', listener);
        };
    }, [isOpen]);

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
                    {options.map((tagColor) => (
                        <li
                            key={tagColor}
                            className={styles.selectOption}
                            onClick={(e) => clickItem(e, tagColor)}
                        >
                            <Checkbox
                                label={<Tag color={tagColor} block />}
                                labelPlacement={LabelPlacement.left}
                                block
                                checked={value.includes(tagColor)}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
