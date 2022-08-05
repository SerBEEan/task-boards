import { useState, useEffect } from 'react';
import { useNavigate, useMatch, useParams } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/Layout';
import Checkbox from '../../components/Checkbox';
import Button, { Type, Size } from '../../components/Button';
import TicketColumn from '../../components/TicketColumn';
import Modal from '../../components/Modal';
import TicketForm from '../../components/TicketForm';
import DragLayer from '../../components/DragLayer';
import Loader from '../../components/Loader';
import { Paths, Status, Filter } from '../../constants';
import { useFilterInSearchParams } from '../../utils/useFilterInSearchParams';
import {
    getFilteredTickets,
    createTicket,
    updateTicketStatus,
    updateTicket,
    getTicketById,
    filteredTicketsActions,
    filteredTicketsSelectors,
} from '../../store/TicketsSlice';

import {ReactComponent as IconPlus} from '../../Icons/plus.svg';

import styles from './styles.module.css';

const STATUSES = [Status.todo, Status.inProgress, Status.done];

export default function MainPage() {
    const navigate = useNavigate();
    const modalCreateMatch = useMatch(Paths.mainModalCreate);
    const modalEditMatch = useMatch(Paths.mainModalEdit);
    const { ticketId } = useParams();
    const [filters, changeFilter] = useFilterInSearchParams();

    const dispatch = useDispatch();

    const tickets = useSelector(filteredTicketsSelectors.selectAll);
    const currentTicket = useSelector(filteredTicketsSelectors.selectCurrentTicket);
    const isLoading = useSelector(filteredTicketsSelectors.selectLoading);
    const isSending = useSelector(filteredTicketsSelectors.selectSending);

    const [selectedColumn, setSelectedColumn] = useState(null);

    const moveTicket = (sourceCardId, targetColumnStatus) => {
        dispatch(updateTicketStatus({
            id: sourceCardId,
            status: targetColumnStatus,
        }));
    };

    const clickOnFilter = (type, value) => {
        changeFilter({ type, value });
    }

    const openModal = (status) => {
        navigate(Paths.mainModalCreate);
        setSelectedColumn(status);
    };
    const closeModal = () => {
        navigate(-1);
        
        if (modalEditMatch) {
            dispatch(filteredTicketsActions.clearCurrentTicket());
        }
    };

    const saveForm = async ({ title, description, tags }) => {
        let result = null;

        if (modalCreateMatch) {
            result = await dispatch(createTicket({
                status: selectedColumn ?? Status.todo,
                title,
                description,
                tags,
            }));
        } else {
            result = await dispatch(updateTicket({
                id: Number(ticketId),
                title,
                description,
                tags,
            }));    
        }

        if (result.meta.requestStatus === 'fulfilled') {
            dispatch(getFilteredTickets(Object.keys(filters)));
            closeModal();
        }
    };

    useEffect(() => {
        dispatch(getFilteredTickets(Object.keys(filters)));
    }, [dispatch, filters]);

    useEffect(() => {
        if (ticketId !== undefined) {
            dispatch(getTicketById(ticketId));
        }
    }, [dispatch, ticketId]);

    return (
        <Layout
            header={
                <div className={styles.header}>
                    <Checkbox label="Комментарий" checked={Boolean(filters.comment)} onChange={clickOnFilter.bind(null, Filter.comment)} />
                    <Checkbox label="Описание" checked={Boolean(filters.description)} onChange={clickOnFilter.bind(null, Filter.description)} />
                    <Checkbox label="Тег" checked={Boolean(filters.tag)} onChange={clickOnFilter.bind(null, Filter.tag)} />
                </div>
            }
            block
        >
            <div className={styles.content}>
                <DndProvider backend={HTML5Backend}>
                    <DragLayer />
                    {STATUSES.map((status) => (
                        <TicketColumn
                            key={status}
                            title={status}
                            moveTicket={moveTicket}
                            tickets={tickets.filter((ticket) => ticket.status === status)}
                            button={
                                status === Status.done ? undefined : (
                                    <Button
                                        onClick={openModal.bind(null, status)}
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
                onClose={closeModal}
            >
                <TicketForm
                    isWithoutComments
                    onSave={saveForm}
                    currentTicket={currentTicket}
                />
            </Modal>

            {(isLoading || isSending) && <Loader />}
        </Layout>
    );
}
