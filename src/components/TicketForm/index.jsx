import { useState } from 'react';

import Border from '../Border';
import Input, { Type } from '../Input';
import SelectTags from '../SelectTags';
import Tag, { Color } from '../Tag';
import Button, { Size, Type as ButtonType } from '../Button';

import styles from './styles.module.css';

export default function TicketForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedColors, setSelectedColors] = useState([]);

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

    const saveForm = () => {
        console.log({ title, description, selectedColors });
    };

    return (
        <Border>
            <div className={styles.formContent}>
                <Input
                    placeholder="Название"
                    block
                    value={title}
                    onChange={changeTitle}
                />
                <Input
                    placeholder="Описание"
                    type={Type.textarea}
                    block
                    value={description}
                    onChange={changeDescription}
                />

                {selectedColors.length > 0 && (
                    <div className={styles.selectedTags}>
                        {selectedColors.map((color) => (
                            <Tag key={color} color={color} onDelete={deleteTag.bind(null, color)} />
                        ))}
                    </div>
                )}

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

                <Button
                    size={Size.l}
                    type={ButtonType.primary}
                    block
                    onClick={saveForm}
                >
                    Сохранить
                </Button>
            </div>
        </Border>
    );
}
