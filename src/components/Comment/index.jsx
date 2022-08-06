import Button, { Type, Size, Shape } from '../Button';

import {ReactComponent as IconClose} from '../../Icons/close.svg';

import styles from './styles.module.css';

export default function Comment({ children, author, onDelete }) {
    return (
        <div className={styles.comment}>
            <div className={styles.commentHeader}>
                {author}
                {onDelete && (
                    <Button
                        type={Type.text}
                        size={Size.xs}
                        shape={Shape.circle}
                        icon={<IconClose />}
                        onClick={onDelete}
                    />
                )}
            </div>
            <div className={styles.commentBody}>
                {children}
            </div>
        </div>
    );
}
