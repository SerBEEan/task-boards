import { useState } from 'react';
import { useNavigate, useMatch } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Layout from '../../components/Layout';
import Checkbox from '../../components/Checkbox';
import Button, { Type, Size } from '../../components/Button';
import TicketColumn from '../../components/TicketColumn';
import Modal from '../../components/Modal';
import TicketForm from '../../components/TicketForm';
import DragLayer from '../../components/DragLayer';
import { paths } from '../../constants';

import {ReactComponent as IconPlus} from '../../Icons/plus.svg';

import styles from './styles.module.css';

const Status = {
    Todo: 'Todo',
    InProgress: 'In progress',
    Done: 'Done',
}

const data = {
    statuses: [Status.Todo, Status.InProgress, Status.Done],
    tickets: [
        {
            id: 0,
            title: 'Нарисовать иллюстрации',
            tags: ['green', 'red'],
            description: 'hello world',
            comments: [
                { author: 'Nick', content: 'hello' },
            ],
            status: Status.Todo,
        },
        {
            id: 1,
            title: 'Нарисовать иллюстрации',
            tags: ['green', 'red'],
            description: 'hello world',
            comments: [
                { author: 'Nick', content: 'hello' },
            ],
            status: Status.InProgress,
        },
        {
            id: 2,
            title: 'Нарисовать иллюстрации',
            tags: ['green', 'red'],
            description: 'hello world',
            comments: [
                { author: 'Nick', content: 'hello' },
            ],
            status: Status.Done,
        },
    ]
};

const getDataFromMain = (ticket) => ({
    id: ticket.id,
    title: ticket.title,
    tags: ticket.tags,
    status: ticket.status,
    hasDescription: ticket.description !== '',
    hasComments: ticket.comments.length > 0,
});

export default function MainPage() {
    const navigate = useNavigate();
    const modalCreateMatch = useMatch(paths.mainModalCreate);
    const modalEditMatch = useMatch(paths.mainModalEdit);

    const [statuses] = useState(data.statuses);
    const [tickets, setTickets] = useState(data.tickets.map(getDataFromMain));

    const moveTicket = (sourceCardId, targetColumnStatus) => {
        setTickets((prev) => {
            const newTickets = [...prev];
            const currentTicketIndex = newTickets.findIndex((ticket) => ticket.id === sourceCardId);
            newTickets[currentTicketIndex].status = targetColumnStatus;
            return newTickets;
        });
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
                <DndProvider backend={HTML5Backend}>
                    <DragLayer />
                    {statuses.map((status) => (
                        <TicketColumn
                            key={status}
                            title={status}
                            moveTicket={moveTicket}
                            tickets={tickets.filter((ticket) => ticket.status === status)}
                            button={
                                status === Status.Done ? undefined : (
                                    <Button
                                        onClick={navigate.bind(null, paths.mainModalCreate)}
                                        type={Type.primary}
                                        size={Size.l}
                                        icon={<IconPlus />}
                                        block
                                    >
                                        Добавить тикет
                                    </Button>
                                )
                            }
                        />
                    ))}
                </DndProvider>

            </div>

            <Modal
                title={modalEditMatch === null ? 'Создать тикет' : 'Редактировать тикет'}
                isShow={!(modalCreateMatch === null && modalEditMatch === null)}
                onClose={navigate.bind(null, -1)}
            >
                <TicketForm isAddTicketForm />
            </Modal>
        </Layout>
    );
}
