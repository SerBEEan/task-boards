import { useState } from 'react';
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
        isAddForm = false,
        isEditMode = true,
        onSave,
    } = props;

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedColors, setSelectedColors] = useState([]);
    const [comments, setComments] = useState([]);

    const changeTitle = (value) => {
        setTitle(value);
    };

    const changeDescription = (value) => {
        setDescription(value);
    };

    const changeSelectedColors = (selectedColor) => {
        setSelectedColors(selectedColor);
    };

    const deleteTag = (color) => {
        setSelectedColors((prev) => prev.filter((selectedColor) => selectedColor !== color));
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
        onSave?.({ title, description, selectedColors, comments });
    };

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

                {selectedColors.length > 0 && (
                    <div className={styles.selectedTags}>
                        {selectedColors.map((color) => (
                            <Tag key={color} color={color} onDelete={isEditMode ? deleteTag.bind(null, color) : undefined} />
                        ))}
                    </div>
                )}

                {isEditMode && (
                    <SelectTags
                        options={[
                            { color: Color.violet },
                            { color: Color.mint },
                            { color: Color.red },
                            { color: Color.orange },
                            { color: Color.blue },
                            { color: Color.green },
                            { color: Color.dark },
                            { color: Color.yellow },
                        ]}
                        value={selectedColors}
                        onChange={changeSelectedColors}
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

                {(!isAddForm && isEditMode) && (
                    <>
                        
                        <AddComment onSave={addComment} />
                    </>
                )}

                {isEditMode && (
                    <Button
                        size={Size.l}
                        type={ButtonType.primary}
                        block={isAddForm}
                        onClick={saveForm}
                    >
                        Сохранить
                    </Button>
                )}
            </div>
        </Border>
    );
}
