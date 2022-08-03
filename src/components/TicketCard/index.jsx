import classNames from 'classnames';
import Tag, { Size as TagSize } from '../Tag';
import Button, { Size, Shape, Type } from '../Button';

import {ReactComponent as IconMore} from '../../Icons/more.svg';
import {ReactComponent as IconAttention} from '../../Icons/attention.svg';
import {ReactComponent as IconComment} from '../../Icons/comment.svg';

import styles from './styles.module.css';


export default function TicketCard(props) {
    const {
        title,
        tags = [],
        block = false,
        hasDescription = false,
        hasComment = false,
    } = props;

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
                <div className={styles.cardIndicators}>
                    {hasDescription && <IconAttention />}
                    {hasComment && <IconComment />}
                </div>
            </div>
        </div>
    );
}
