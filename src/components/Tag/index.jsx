import classNames from 'classnames';

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

export default function Tag({ color }) {
    return (
        <div className={classNames(styles.tag, COLOR_MAP[color] ?? COLOR_MAP.violet)}></div>
    );
}
