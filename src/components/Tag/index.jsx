import classNames from 'classnames';
import { getEnum } from '../../utils/getEnum';

import {ReactComponent as IconClose} from '../../Icons/close.svg';

import styles from './styles.module.css';

const COLOR_MAP = {
    violet: styles.tagViolet,
    mint: styles.tagMint,
    red: styles.tagRed,
    orange: styles.tagOrange,
    blue: styles.tagBlue,
    green: styles.tagGreen,
    dark: styles.tagDarkBlue,
    yellow: styles.tagYellow,
};

export const Color = getEnum(Object.keys(COLOR_MAP));

export default function Tag(props) {
    const {
        color,
        deleteIcon = <IconClose />,
        onDelete,
    } = props;

    return (
        <div className={classNames(styles.tag, COLOR_MAP[color] ?? COLOR_MAP.violet)}>
            {onDelete && (
                <span className={styles.deleteIcon}>
                    {deleteIcon}
                </span>
            )}
        </div>
    );
}
