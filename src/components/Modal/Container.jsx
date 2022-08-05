import { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal-root');
const body = document.body;

export function ModalContainer({ children, isShow }) {
    const div = useMemo(() => document.createElement('div'), []);

    useEffect(() => {
        modalRoot.appendChild(div);

        return () => {
            modalRoot.removeChild(div);
        };
    }, [div]);

    useEffect(() => {
        if (isShow) {
            body.style.top = `-${window.scrollY}px`;
            body.style.position = 'fixed';
        } else {
            const scrollY = body.style.top;

            if (scrollY !== '') {
                body.style.position = '';
                body.style.top = '';
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            }
        }
    }, [isShow]);

    return createPortal(children, div);
}
