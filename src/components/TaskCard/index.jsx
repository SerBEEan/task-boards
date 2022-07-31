import Tag from '../Tag';
import Button, { Size, Shape, Type } from '../Button';

import {ReactComponent as IconMore} from '../../Icons/more.svg';
import {ReactComponent as IconAttention} from '../../Icons/attention.svg';
import {ReactComponent as IconComment} from '../../Icons/comment.svg';

import styles from './styles.module.css';


export default function TaskCard({ title, tags = [] }) {
    return (
        <div className={styles.taskCard}>
            <div>
                <span className={styles.cardTitle}>{title}</span>
                <div className={styles.cardContent}>
                    {tags.map((tag) => (
                        <Tag key={tag.id} color={tag.color} />
                    ))}
                </div>
            </div>

            <div className={styles.cardActions}>
                <Button icon={<IconMore />} size={Size.xs} shape={Shape.circle} type={Type.text} />
                <div className={styles.cardGroupActions}>
                    <Button icon={<IconAttention />} size={Size.xs} shape={Shape.circle} type={Type.text} />
                    <Button icon={<IconComment />} size={Size.xs} shape={Shape.circle} type={Type.text} />
                </div>
            </div>
        </div>
    );
}
