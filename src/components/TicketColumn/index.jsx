import Border from '../Border';
import TicketCard, {  } from '../TicketCard';
import { Color } from '../Tag';

import styles from './styles.module.css';

export default function TicketColumn({ title, button, selectCurrentTicket }) {
    return (
        <div className={styles.column}>
            <div className={styles.title}>
                {title}
            </div>
            <Border block>
                <div className={styles.content}>
                    <TicketCard
                        title="Нарисовать иллюстрации"
                        tags={[
                            { id: 0, color: Color.violet },
                            { id: 1, color: Color.mint },
                            { id: 2, color: Color.red },
                            { id: 3, color: Color.orange },
                            { id: 4, color: Color.blue },
                            { id: 5, color: Color.green },
                            { id: 6, color: Color.dark },
                            { id: 7, color: Color.yellow },
                        ]}
                        selectCurrentTicket={selectCurrentTicket}
                        block
                        hasDescription
                        hasComment
                    />
                    <TicketCard
                        title="Нарисовать иллюстрации"
                        tags={[
                            { id: 0, color: Color.violet },
                            { id: 1, color: Color.mint },
                            { id: 2, color: Color.red },
                            { id: 3, color: Color.orange },
                            { id: 4, color: Color.blue },
                            { id: 5, color: Color.green },
                            { id: 6, color: Color.dark },
                            { id: 7, color: Color.yellow },
                        ]}
                        selectCurrentTicket={selectCurrentTicket}
                        block
                        hasDescription
                        hasComment
                    />

                    {button}
                </div>
            </Border>
        </div>
    );
}
