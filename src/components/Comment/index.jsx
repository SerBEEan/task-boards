import Button, { Type, Size, Shape } from '../Button';

import {ReactComponent as IconClose} from '../../Icons/close.svg';

import styles from './styles.module.css';

export default function Comment({ author, content }) {
    return (
        <div className={styles.comment}>
            <div className={styles.commentHeader}>
                {author}
                <Button type={Type.text} size={Size.xs} shape={Shape.circle} icon={<IconClose />} />
            </div>
            <div className={styles.commentBody}>
                {content}
            </div>
        </div>
    );
}
