import classNames from 'classnames';

import styles from './styles.module.css';

export const LabelPlacement = {
    right: 'right',
    left: 'left',
};

export default function Checkbox(props) {
    const {
        label,
        name,
        checked,
        disabled,
        onChange,
        labelPlacement = LabelPlacement.right
    } = props;

    const changeCheck = (e) => {
        onChange?.(e.currentTarget.checked);
    };

    return (
        <div className={classNames(styles.checkbox, {[styles.labelPlacementLeft]: labelPlacement === LabelPlacement.left} )}>
            <label>
                <input
                    type="checkbox"
                    name={name}
                    disabled={disabled}
                    checked={checked}
                    onChange={changeCheck}
                />
                <span className={styles.box}></span>
                {label}
            </label>
        </div>
    );
}
