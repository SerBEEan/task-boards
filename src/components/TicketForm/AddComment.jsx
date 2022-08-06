import { useMatch, useNavigate } from 'react-router-dom';
import { useController, useForm } from 'react-hook-form';
import Button, { Size, Type as ButtonType, Color as ButtonColor } from '../Button';
import Modal from '../Modal';
import Input, { Type } from '../Input';
import Border from '../Border';
import { Paths } from '../../constants';
import { pathInsert } from '../../utils/pathInsert';

import {ReactComponent as IconPlus} from '../../Icons/plus.svg'

import styles from './styles.module.css';

const AUTHOR_KEY = 'author';
const CONTENT_KEY = 'content';


export function AddComment({ ticketId, control, name }) {
    const navigation = useNavigate();
    const modalCreateCommentMatch = useMatch(Paths.ticketModalCreateComment);

    const { field: { value, onChange } } = useController({ name, control, defaultValue: [] });
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const openModal = (e) => {
        e.preventDefault();
        navigation(pathInsert(Paths.ticketModalCreateComment, { ticketId }));
    };
    const closeModal = () => {
        navigation(-1);
        reset();
    };

    const saveComment = ({ author, content }, e) => {
        onChange([...value, { author, content }]);
        closeModal();
    };

    const submitComment = (e) => {
        e.stopPropagation();
        handleSubmit(saveComment)(e);
    };

    return (
        <>
            <Modal
                title="Добавит комментарий"
                isShow={modalCreateCommentMatch !== null}
                onClose={closeModal}
            >
                <Border>
                    <form
                        className={styles.formContent}
                        onSubmit={submitComment}
                    >
                        <Input
                            registered={register(AUTHOR_KEY, { required: 'Введите имя' })}
                            errorMessage={errors[AUTHOR_KEY]?.message}
                            placeholder="Имя"
                            block
                        />
                        <Input
                            registered={register(CONTENT_KEY, { required: 'Введите комментарий' })}
                            errorMessage={errors[CONTENT_KEY]?.message}
                            placeholder="Комментарий"
                            type={Type.textarea}
                            block
                        />
                        <Button
                            size={Size.l}
                            type={ButtonType.primary}
                            block
                            isSubmit
                        >
                            Сохранить
                        </Button>
                    </form>
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
