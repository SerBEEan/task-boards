import { useDragLayer } from 'react-dnd';
import TicketCard from '../../components/TicketCard';

import styles from './styles.module.css';

export default function DragLayer() {
    const { isDragging, item, initialOffset, currentOffset } = useDragLayer((monitor) => ({
        isDragging: monitor.isDragging(),
        item: monitor.getItem(),
        initialOffset: monitor.getInitialSourceClientOffset(),
        currentOffset: monitor.getSourceClientOffset(),
    }));

    if (!isDragging) {
        return null;
    }

    return (
        <div className={styles.dragLayer}>
            <div style={getItemStyles(initialOffset, currentOffset)}>
                {item.ticket && <TicketCard ticket={item.ticket} />}
            </div>
        </div>
    );
};

function getItemStyles(initialOffset, currentOffset) {
    if (!initialOffset || !currentOffset) {
        return {
            display: 'none',
        };
    }

    const { x, y } = currentOffset;
    const transform = `translate(${x}px, ${y}px)`;

    return {
        transform,
        WebkitTransform: transform,
    };
}
