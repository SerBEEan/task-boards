import { useDrop } from 'react-dnd';
import Border from '../Border';
import TicketCard, {  } from '../TicketCard';
import { ItemDragTypes } from '../../constants';

import styles from './styles.module.css';

export default function TicketColumn(props) {
    const { title, tickets, button, moveTicket, clickOnTicketCard } = props;

    const [collect, dropRef] = useDrop({
        accept: ItemDragTypes.card,
        drop: ({ ticket }) => {
            moveTicket(ticket.id, title);
        },
        canDrop: ({ ticket }) => ticket.status !== title,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    return (
        <div className={styles.column} ref={dropRef}>
            <div className={styles.title}>
                {title}
            </div>
            <Border block>
                <div className={styles.content}>
                    {tickets.map((ticket) => (
                        <TicketCard
                            key={ticket.id}
                            ticket={ticket}
                            clickOnTicketCard={clickOnTicketCard}
                            block
                        />
                    ))}
                    {(collect.isOver && collect.canDrop) && <div className={styles.emptyPlace}></div>}
                    {button}
                </div>
            </Border>
        </div>
    );
}
