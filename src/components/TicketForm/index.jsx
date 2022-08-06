import { useEffect } from 'react';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import Border from '../Border';
import Input, { Type } from '../Input';
import SelectTags from '../SelectTags';
import Tag, { Color } from '../Tag';
import Button, { Size, Type as ButtonType } from '../Button';
import { AddComment } from './AddComment';
import Comment from '../Comment';

import styles from './styles.module.css';

const TITLE_KEY = 'title';
const DESCRIPTION_KEY = 'description';
const TAGS_KEY = 'tags';
const COMMENTS_KEY = 'comments';

const OPTIONS = [
    Color.violet,
    Color.mint,
    Color.red,
    Color.orange,
    Color.blue,
    Color.green,
    Color.dark,
    Color.yellow,
];

export default function TicketForm(props) {
    const {
        block = false,
        isWithoutComments = false,
        isEditMode = true,
        onSave,
        currentTicket,
        changeController,
    } = props;

    const { register, watch, handleSubmit, formState: { errors }, setValue, control, reset } = useForm({ defaultValues: {
        [TITLE_KEY]: '',
        [DESCRIPTION_KEY]: '',
        [TAGS_KEY]: [],
        [COMMENTS_KEY]: [],
    } });

    const tags = watch(TAGS_KEY);
    const comments = watch(COMMENTS_KEY);

    const deleteTag = (color) => {
        const newTags = tags.filter((selectedColor) => selectedColor !== color);
        setValue(TAGS_KEY, newTags);
    };

    const deleteComment = (index) => {
        const newComments = [...comments];
        newComments.splice(index, 1);
        setValue(COMMENTS_KEY, newComments);
    };

    const saveForm = ({ title, description, tags, comments }) => {
        onSave?.({ title, description, tags, comments });
    };

    useEffect(() => {
        setValue(TITLE_KEY, currentTicket?.title ?? '');
        setValue(DESCRIPTION_KEY, currentTicket?.description ?? '');
        setValue(TAGS_KEY, currentTicket?.tags ?? []);
        setValue(COMMENTS_KEY, currentTicket?.comments ?? []);
    }, [currentTicket, setValue]);

    useEffect(() => {
        changeController?.((prev) => ({
            ...prev,
            resetForm: () => reset(),
        }));
    }, [changeController, reset]);

    return (
        <Border block={block}>
            <form
                className={classNames(styles.formContent, {[styles.fullWidth]: block})}
                onSubmit={handleSubmit(saveForm)}
            >
                <Input
                    placeholder="Название"
                    block
                    disabled={!isEditMode}
                    registered={register(TITLE_KEY, { required: 'Введите название' })}
                    errorMessage={errors[TITLE_KEY]?.message}
                />
                <Input
                    placeholder="Описание"
                    type={Type.textarea}
                    block
                    disabled={!isEditMode}
                    registered={register(DESCRIPTION_KEY)}
                />

                {tags?.length > 0 && (
                    <div className={styles.selectedTags}>
                        {tags.map((color) => (
                            <Tag key={color} color={color} onDelete={isEditMode ? deleteTag.bind(null, color) : undefined} />
                        ))}
                    </div>
                )}

                {isEditMode && (
                    <SelectTags
                        options={OPTIONS}
                        control={control}
                        name={TAGS_KEY}
                    />
                )}

                {!isWithoutComments && comments?.map((comment, index) => (
                    <Comment
                        key={index}
                        author={comment.author}
                        onDelete={isEditMode ? deleteComment.bind(null, index) : undefined}
                    >
                        {comment.content}
                    </Comment>
                ))} 

                {(!isWithoutComments && isEditMode && currentTicket) && (
                    <>
                        <AddComment
                            name={COMMENTS_KEY}
                            control={control}
                            ticketId={currentTicket.id}
                        />
                    </>
                )}

                {isEditMode && (
                    <Button
                        size={Size.l}
                        type={ButtonType.primary}
                        block={isWithoutComments}
                        isSubmit
                    >
                        Сохранить
                    </Button>
                )}
            </form>
        </Border>
    );
}
