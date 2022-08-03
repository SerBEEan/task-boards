import classNames from 'classnames';

import styles from './styles.module.css';

export const Type = {
    input: 'input',
    textarea: 'textarea',
};


export default function Input(props) {
    const {
        type = Type.input,
        block = false,
        placeholder,
        value,
        onChange,
        disabled,
    } = props;

    const changeValue = (e) => {
        onChange?.(e.target.value);
    };

    if (type === Type.input) {
        return (
            <input
                className={classNames(styles.input, {[styles.fullWidth]: block})}
                placeholder={placeholder}
                value={value}
                onChange={changeValue}
                disabled={disabled}
            />
        );
    }

    return (
        <textarea
            className={classNames(styles.textarea, {[styles.fullWidth]: block})}
            placeholder={placeholder}
            value={value}
            onChange={changeValue}
            disabled={disabled}
        />
    );
}
