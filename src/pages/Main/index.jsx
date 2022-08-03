import Layout from '../../components/Layout';
import Checkbox from '../../components/Checkbox';
import Button, { Type, Size } from '../../components/Button';
import TicketColumn from '../../components/TicketColumn';

import {ReactComponent as IconPlus} from '../../Icons/plus.svg';

import styles from './styles.module.css';

export default function MainPage() {
    return (
        <Layout
            header={
                <div className={styles.header}>
                    <Checkbox label="Комментарий" />
                    <Checkbox label="Описание" />
                    <Checkbox label="Тег" />
                </div>
            }
            block
        >
            <div className={styles.content}>
                <TicketColumn
                    title="Todo"
                    button={
                        <Button type={Type.primary} size={Size.l} icon={<IconPlus />} block>
                            Добавить тикет
                        </Button>
                    }
                />

                <TicketColumn
                    title="In progress"
                    button={
                        <Button type={Type.primary} size={Size.l} icon={<IconPlus />} block>
                            Добавить тикет
                        </Button>
                    }
                />

                <TicketColumn
                    title="Done"
                />
            </div>
            
        </Layout>
    );
}
