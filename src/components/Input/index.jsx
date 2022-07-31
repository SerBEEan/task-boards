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
    } = props;

    if (type === Type.input) {
        return (
            <input
                className={classNames(styles.input, {[styles.fullWidth]: block})}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        );
    }

    return (
        <textarea
            className={classNames(styles.textarea, {[styles.fullWidth]: block})}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    );
}