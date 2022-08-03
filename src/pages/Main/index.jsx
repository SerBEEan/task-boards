import { useState } from 'react';
import Layout from '../../components/Layout';
import Checkbox from '../../components/Checkbox';
import Button, { Type, Size } from '../../components/Button';
import TicketColumn from '../../components/TicketColumn';
import Modal from '../../components/Modal';
import TicketForm from '../../components/TicketForm';

import {ReactComponent as IconPlus} from '../../Icons/plus.svg';

import styles from './styles.module.css';

export default function MainPage() {
    const [currentTicket, setCurrentTicket] = useState(null);

    const openModal = (id = -1) => {
        setCurrentTicket(id);
    };

    const closeModal = () => {
        setCurrentTicket(null);
    };

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
                    selectCurrentTicket={openModal}
                    button={
                        <Button onClick={openModal} type={Type.primary} size={Size.l} icon={<IconPlus />} block>
                            Добавить тикет
                        </Button>
                    }
                />

                <TicketColumn
                    title="In progress"
                    selectCurrentTicket={openModal}
                    button={
                        <Button onClick={openModal} type={Type.primary} size={Size.l} icon={<IconPlus />} block>
                            Добавить тикет
                        </Button>
                    }
                />

                <TicketColumn
                    title="Done"
                    selectCurrentTicket={openModal}
                />
            </div>

            <Modal
                title={currentTicket > -1 ? 'Редактировать тикет' : 'Создать тикет'}
                isShow={currentTicket !== null}
                onClose={closeModal}
            >
                <TicketForm isAddForm />
            </Modal>
        </Layout>
    );
}
