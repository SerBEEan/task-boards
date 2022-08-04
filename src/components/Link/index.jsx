import { Link as RouterLink } from 'react-router-dom';

import styles from './styles.module.css';

export default function Link({ to, icon, children }) {
    return (
        <RouterLink className={styles.link} to={to}>
            {icon}
            {children}
        </RouterLink>
    );
}
