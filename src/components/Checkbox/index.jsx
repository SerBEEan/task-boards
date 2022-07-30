import styles from './styles.module.css';

export default function Checkbox(props) {
    const { label, name, value, checked, disabled, onChange } = props;

    const changeCheck = (e) => {
        onChange?.(e.currentTarget.checked);
    };

    return (
        <div className={styles.checkbox}>
            <label>
                <input
                    type="checkbox"
                    disabled={disabled}
                    checked={checked}
                    onChange={changeCheck}
                    name={name}
                    value={value}
                />
                <span className={styles.box}></span>
                {label}
            </label>
        </div>
    );
}
