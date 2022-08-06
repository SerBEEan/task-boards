import { useState, useEffect } from 'react';
import { useParams, useMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/Layout';
import Button, { Shape, Size, Type as ButtonType } from '../../components/Button';
import TicketForm from '../../components/TicketForm';
import Menu, { MenuItem } from '../../components/Menu';
import Modal, { Type } from '../../components/Modal';
import Link from '../../components/Link';
import Loader from '../../components/Loader';
import { Paths } from '../../constants';
import { getTicketById, updateTicket, filteredTicketsSelectors } from '../../store/TicketsSlice';

import {ReactComponent as IconMore} from '../../Icons/more.svg';
import {ReactComponent as IconGoBack} from '../../Icons/goback.svg';

import styles from './styles.module.css';

export default function TicketPage() {
    const dispatch = useDispatch();

    const { ticketId } = useParams();
    const modalCreateCommentMatch = useMatch(Paths.ticketModalCreateComment);
    
    const [isEditMode, setIsEditMode] = useState(false);
    const [isModalShow, setIsModalShow] = useState(false);

    const currentTicket = useSelector(filteredTicketsSelectors.selectCurrentTicket);
    const isLoading = useSelector(filteredTicketsSelectors.selectLoading);
    const isSending = useSelector(filteredTicketsSelectors.selectSending);

    const editTicket = () => {
        setIsEditMode(true);
    };

    const saveForm = async ({ title, description, tags, comments }) => {
        const result = await dispatch(updateTicket({
            id: Number(ticketId),
            title,
            description,
            tags,
            comments,
        }));

        if (result.meta.requestStatus === 'fulfilled') {
            dispatch(getTicketById(ticketId));
            setIsEditMode(false);
        }
    };

    const openModalDelete = () => {
        setIsModalShow(true);
    };

    const closeModalDelete = () => {
        setIsModalShow(false);
    };

    const deleteTicket = () => {
        console.log('delete', currentTicket.id);
        closeModalDelete();
    };

    useEffect(() => {
        dispatch(getTicketById(ticketId));
    }, [dispatch, ticketId]);

    useEffect(() => {
        if (modalCreateCommentMatch !== null) {
            setIsEditMode(true);
        }
    }, [modalCreateCommentMatch]);

    return (
        <>
            <Layout
                header={
                    <Link to={Paths.main} icon={<IconGoBack />}>
                        Вернуться к задачам
                    </Link>
                }
            >
                <div className={styles.contentHeader}>
                    <span>Todo</span>
                    {!isEditMode && (
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
                            <MenuItem onClick={openModalDelete}>Удалить</MenuItem>
                            <MenuItem onClick={editTicket}>Редактировать</MenuItem>
                        </Menu>
                    )}
                </div>
                <div className={styles.content}>
                    <TicketForm
                        isEditMode={isEditMode}
                        onSave={saveForm}
                        currentTicket={currentTicket}
                        block
                    />
                    <Modal
                        title="Удалить тикет?"
                        isShow={isModalShow}
                        onClose={closeModalDelete}
                        type={Type.confirm}
                        onOk={deleteTicket}
                        onCancel={closeModalDelete}
                    />
                </div>
            </Layout>

            {(isLoading || isSending) && <Loader />}
        </>
    );
}
