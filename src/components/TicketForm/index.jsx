import { useState, useEffect } from 'react';
import classNames from 'classnames';
import Border from '../Border';
import Input, { Type } from '../Input';
import SelectTags from '../SelectTags';
import Tag, { Color } from '../Tag';
import Button, { Size, Type as ButtonType } from '../Button';
import { AddComment } from './AddComment';
import Comment from '../Comment';

import styles from './styles.module.css';

export default function TicketForm(props) {
    const {
        block = false,
        isAddTicketForm = false,
        isEditMode = true,
        onSave,
        currentTicket,
    } = props;

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState([]);
    const [comments, setComments] = useState([]);

    const changeTitle = (value) => {
        setTitle(value);
    };

    const changeDescription = (value) => {
        setDescription(value);
    };

    const changeTags = (selectedColor) => {
        setTags(selectedColor);
    };

    const deleteTag = (color) => {
        setTags((prev) => prev.filter((selectedColor) => selectedColor !== color));
    };

    const addComment = (newComment) => {
        setComments((prev) => {
            const lastId = prev[prev.length - 1]?.id ?? -1;
            return [...prev, { ...newComment, id: lastId + 1}];
        });
    };

    const deleteComment = (id) => {
        setComments((prev) => prev.filter((comment) => comment.id !== id));
    };

    const saveForm = () => {
        onSave?.({ title, description, tags, comments });
    };

    useEffect(() => {
        setTitle(currentTicket?.title ?? '');
        setDescription(currentTicket?.description ?? '');
        setTags(currentTicket?.tags ?? []);
        setComments(currentTicket?.comments ?? []);
    }, [currentTicket]);

    return (
        <Border block={block}>
            <div className={classNames(styles.formContent, {[styles.fullWidth]: block})}>
                <Input
                    placeholder="Название"
                    block
                    value={title}
                    onChange={changeTitle}
                    disabled={!isEditMode}
                />
                <Input
                    placeholder="Описание"
                    type={Type.textarea}
                    block
                    value={description}
                    onChange={changeDescription}
                    disabled={!isEditMode}
                />

                {tags.length > 0 && (
                    <div className={styles.selectedTags}>
                        {tags.map((color) => (
                            <Tag key={color} color={color} onDelete={isEditMode ? deleteTag.bind(null, color) : undefined} />
                        ))}
                    </div>
                )}

                {isEditMode && (
                    <SelectTags
                        options={[
                            Color.violet,
                            Color.mint,
                            Color.red,
                            Color.orange,
                            Color.blue,
                            Color.green,
                            Color.dark,
                            Color.yellow,
                        ]}
                        value={tags}
                        onChange={changeTags}
                    />
                )}

                {comments.map((comment) => (
                    <Comment
                        key={comment.id}
                        author={comment.author}
                        onDelete={deleteComment.bind(null, comment.id)}
                    >
                        {comment.content}
                    </Comment>
                ))} 

                {(!isAddTicketForm && isEditMode) && (
                    <>
                        <AddComment onSave={addComment} />
                    </>
                )}

                {isEditMode && (
                    <Button
                        size={Size.l}
                        type={ButtonType.primary}
                        block={isAddTicketForm}
                        onClick={saveForm}
                    >
                        Сохранить
                    </Button>
                )}
            </div>
        </Border>
    );
}
