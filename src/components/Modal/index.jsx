import { useRef } from 'react';
import classNames from 'classnames';
import { ModalContainer } from './Container';
import Button, { Shape, Size, Type as ButtonType } from '../Button';

import {ReactComponent as IconClone} from '../../Icons/close.svg';

import styles from './styles.module.css';

export const Type = {
    modal: 'modal',
    confirm: 'confirm',
};

export default function Modal(props) {
    const {
        children,
        isShow = false,
        title,
        type = Type.modal,
        onClose,
        onOk,
        onCancel,
        okText = 'Да',
        cancelText = 'Нет',
    } = props;

    const backgroundRef = useRef(null);

    const closeModal = () => {
        onClose?.();
    };

    const closeOnBackground = (e) => {
        if (e.target === backgroundRef.current) {
            onClose?.();
        }
    };

    return (
        <ModalContainer isShow={isShow}>
            <div
                className={classNames(styles.background, {[styles.visible]: isShow})}
                ref={backgroundRef}
                onClick={closeOnBackground}
            >
                <div className={classNames(styles.content, {[styles.typeConfirm]: type === Type.confirm})}>
                    {title && (
                        <span className={styles.title}>{title}</span>
                    )}
                    {type === Type.modal ? (
                        <>
                            <span className={styles.closeIcon}>
                                <Button
                                    type={ButtonType.text}
                                    shape={Shape.circle}
                                    size={Size.xs}
                                    icon={<IconClone />}
                                    onClick={closeModal}
                                />
                            </span>
                            {children}
                        </>
                    ) : (
                        <div className={styles.confirmActions}>
                            <Button onClick={onOk}>{okText}</Button>
                            <Button onClick={onCancel}>{cancelText}</Button>
                        </div>
                    )}
                </div>
            </div>
        </ModalContainer>
    );
}
