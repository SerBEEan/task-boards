import { useRef, useEffect } from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import Tag, { Size as TagSize } from '../Tag';
import Button, { Size, Shape, Type } from '../Button';
import Link from '../Link';
import { ItemDragTypes, Paths } from '../../constants';
import { pathInsert } from '../../utils/pathInsert';

import {ReactComponent as IconMore} from '../../Icons/more.svg';
import {ReactComponent as IconAttention} from '../../Icons/attention.svg';
import {ReactComponent as IconComment} from '../../Icons/comment.svg';

import styles from './styles.module.css';


export default function TicketCard(props) {
    const { ticket, block = false } = props;
    const navigate = useNavigate();

    const moreRef = useRef(null);
    const [, dragRef, preview] = useDrag({
        type: ItemDragTypes.card,
        item: { ticket },
    });

    const hasDescription = ticket.description !== '';
    const hasComment = ticket.comments.length > 0;

    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true });
    }, [preview]);

    const clickCard = (e) => {
        const clickedIsOnButtonMore = e.nativeEvent.path.includes(moreRef.current);
        if (!clickedIsOnButtonMore) {
            navigate(pathInsert(Paths.mainModalEdit, { ticketId: ticket.id }));
        }
    };

    return (
        <div className={classNames(styles.taskCard, {[styles.fullWidth]: block})} ref={dragRef} onClick={clickCard}>
            <div>
                <span className={styles.cardTitle}>{ticket.title}</span>
                <div className={styles.cardContent}>
                    {ticket.tags.map((color) => (
                        <Tag key={color} color={color} size={TagSize.s} />
                    ))}
                </div>
            </div>

            <div className={styles.cardActions}>
                <Link to={pathInsert(Paths.ticket, { ticketId: ticket.id })}>
                    <Button ref={moreRef} icon={<IconMore />} size={Size.xs} shape={Shape.circle} type={Type.text} />
                </Link>
                <div className={styles.cardIndicators}>
                    {hasDescription && <IconAttention />}
                    {hasComment && <IconComment />}
                </div>
            </div>
        </div>
    );
}
