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
        disabled = false,
        registered,
        errorMessage,
    } = props;

    if (type === Type.input) {
        return (
            <div>
                <input
                    className={classNames(styles.input, {[styles.fullWidth]: block})}
                    placeholder={placeholder}
                    disabled={disabled}
                    {...registered}
                />
                {Boolean(errorMessage) && <p className={styles.errorMessage}>{errorMessage}</p>}
            </div>
        );
    }

    return (
        <div>
            <textarea
                className={classNames(styles.textarea, {[styles.fullWidth]: block})}
                placeholder={placeholder}
                disabled={disabled}
                {...registered}
            />
            {Boolean(errorMessage) && <p className={styles.errorMessage}>{errorMessage}</p>}
        </div>
    );
}
