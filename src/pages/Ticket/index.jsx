import Layout from '../../components/Layout';
import Button, { Shape, Size, Type as ButtonType } from '../../components/Button';
import TicketForm from '../../components/TicketForm';
import Menu, { MenuItem } from '../../components/Menu';

import {ReactComponent as IconMore} from '../../Icons/more.svg';
import {ReactComponent as IconGoBack} from '../../Icons/goback.svg';

import styles from './styles.module.css';

export default function TicketPage() {
    return (
        <Layout
            header={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <IconGoBack />
                    <span style={{ marginLeft: 18 }}>
                        Вернуться к задачам
                    </span>
                </div>
            }
        >
            <div className={styles.contentHeader}>
                <span>Todo</span>
                <Menu
                    trigger={
                        <Button
                            className={styles.trigger}
                            size={Size.s}
                            shape={Shape.circle}
                            type={ButtonType.text}
                            icon={<IconMore />}
                        />
                    }
                >
                    <MenuItem>Удалить</MenuItem>
                    <MenuItem>Редактировать</MenuItem>
                </Menu>
            </div>
            <div className={styles.content}>
                <TicketForm block />
            </div>
        </Layout>
    );
}
