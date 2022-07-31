import classNames from 'classnames';
import Tag, { Size as TagSize } from '../Tag';
import Button, { Size, Shape, Type } from '../Button';

import {ReactComponent as IconMore} from '../../Icons/more.svg';
import {ReactComponent as IconAttention} from '../../Icons/attention.svg';
import {ReactComponent as IconComment} from '../../Icons/comment.svg';

import styles from './styles.module.css';


export default function TaskCard({ title, tags = [], block = false }) {
    return (
        <div className={classNames(styles.taskCard, {[styles.fullWidth]: block})}>
            <div>
                <span className={styles.cardTitle}>{title}</span>
                <div className={styles.cardContent}>
                    {tags.map((tag) => (
                        <Tag key={tag.id} color={tag.color} size={TagSize.s} />
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
