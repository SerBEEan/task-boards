import { useState } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import Button, { Size, Type as ButtonType, Color as ButtonColor } from '../Button';
import Modal from '../Modal';
import Input, { Type } from '../Input';
import Border from '../Border';
import { Paths } from '../../constants';
import { pathInsert } from '../../utils/pathInsert';

import {ReactComponent as IconPlus} from '../../Icons/plus.svg'

import styles from './styles.module.css';

export function AddComment({ onSave, ticketId }) {
    const navigation = useNavigate();
    const modalCreateCommentMatch = useMatch(Paths.ticketModalCreateComment);

    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');

    const openModal = () => {
        navigation(pathInsert(Paths.ticketModalCreateComment, { ticketId }));
    };
    const closeModal = () => {
        navigation(-1);
        setAuthor('');
        setContent('');
    };

    const changeAuthor = (value) => {
        setAuthor(value);
    };

    const changeContent = (value) => {
        setContent(value);
    };

    const saveComment = () => {
        onSave?.({ author, content });
        closeModal();
    };

    return (
        <>
            <Modal
                title="Добавит комментарий"
                isShow={modalCreateCommentMatch !== null}
                onClose={closeModal}
            >
                <Border>
                    <div className={styles.formContent}>
                        <Input value={author} onChange={changeAuthor} placeholder="Имя" block />
                        <Input value={content} onChange={changeContent} placeholder="Комментарий" type={Type.textarea} block />
                        <Button
                            size={Size.l}
                            type={ButtonType.primary}
                            onClick={saveComment}
                            block
                        >
                            Сохранить
                        </Button>
                    </div>
                </Border>
            </Modal>
            <Button
                size={Size.xs}
                type={ButtonType.text}
                color={ButtonColor.disabled}
                icon={<IconPlus />}
                onClick={openModal}
            >
                Добавить комментарий
            </Button>
        </>
    );
}
