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
        isWithoutComments = false,
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
        setComments((prev) => [...prev, newComment]);
    };

    const deleteComment = (index) => {
        setComments((prev) => {
            const newComments = [...prev];
            newComments.splice(index, 1);
            return newComments;
        });
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

                {!isWithoutComments && comments.map((comment, index) => (
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
                        <AddComment onSave={addComment} ticketId={currentTicket.id} />
                    </>
                )}

                {isEditMode && (
                    <Button
                        size={Size.l}
                        type={ButtonType.primary}
                        block={isWithoutComments}
                        onClick={saveForm}
                    >
                        Сохранить
                    </Button>
                )}
            </div>
        </Border>
    );
}
