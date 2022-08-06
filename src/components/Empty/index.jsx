import {ReactComponent as IconEmpty} from '../../Icons/empty-box.svg'

import styles from './styles.module.css';

export default function Empty({ description }) {
    return (
        <div className={styles.empty}>
            <div className={styles.iconContainer}>
                <IconEmpty />
            </div>
            {Boolean(description) && <p className={styles.description}>{description}</p>}
        </div>
    );
}
