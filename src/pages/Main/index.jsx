import { useState, useEffect } from 'react';
import { useMatch, useParams, Navigate } from 'react-router-dom';
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
import { pathInsert } from '../../utils/pathInsert';
import { useNavigateWithSearchParams } from '../../utils/useNavigateWithSearchParams';
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
    const navigate = useNavigateWithSearchParams();
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

    const [controller, setController] = useState({ resetForm: undefined });

    const moveTicket = (sourceCardId, targetColumnStatus) => {
        dispatch(updateTicketStatus({
            id: sourceCardId,
            status: targetColumnStatus,
        }));
    };

    const clickOnFilter = (type, value) => {
        changeFilter({ type, value });
    }

    const clickOnTicketCard = (ticketId) => {
        navigate({ to: pathInsert(Paths.mainModalEdit, { ticketId }) });
    };

    const openCreateModal = (status) => {
        navigate({ to: Paths.mainModalCreate });
        setSelectedColumn(status);
        controller?.resetForm();
    };
    const closeModal = () => {
        if (modalEditMatch) {
            dispatch(filteredTicketsActions.clearCurrentTicket());
        }
        navigate({ to: -1, withoutSearchParams: true });
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
            controller?.resetForm();
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
        <>
            {currentTicket === null && <Navigate to={Paths.notFound} />}

            <Layout
                header={
                    <div className={styles.header}>
                        <Checkbox label="??????????????????????" checked={Boolean(filters.comment)} onChange={clickOnFilter.bind(null, Filter.comment)} />
                        <Checkbox label="????????????????" checked={Boolean(filters.description)} onChange={clickOnFilter.bind(null, Filter.description)} />
                        <Checkbox label="??????" checked={Boolean(filters.tag)} onChange={clickOnFilter.bind(null, Filter.tag)} />
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
                                clickOnTicketCard={clickOnTicketCard}
                                button={
                                    status === Status.done ? undefined : (
                                        <Button
                                            onClick={openCreateModal.bind(null, status)}
                                            type={Type.primary}
                                            size={Size.l}
                                            icon={<IconPlus />}
                                            block
                                        >
                                            ???????????????? ??????????
                                        </Button>
                                    )
                                }
                            />
                        ))}
                    </DndProvider>

                </div>

                <Modal
                    title={modalEditMatch === null ? '?????????????? ??????????' : '?????????????????????????? ??????????'}
                    isShow={!(modalCreateMatch === null && modalEditMatch === null)}
                    onClose={closeModal}
                >
                    <TicketForm
                        isWithoutComments
                        onSave={saveForm}
                        currentTicket={currentTicket}
                        changeController={setController}
                    />
                </Modal>

            </Layout>
        
            {(isLoading || isSending) && <Loader />}
        </>
    );
}
