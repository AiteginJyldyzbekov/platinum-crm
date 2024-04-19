import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from "./ModalWindow.module.scss"
import { Button, ThemeButton } from '../Button/Button';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const ModalWindow: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return isOpen ? ReactDOM.createPortal(
        <div className={styles.modal__overlay} onClick={handleOverlayClick}>
            <div className={styles.modal}>
                <Button
                    theme={ThemeButton.DEFAULT}
                    onClick={onClose}
                >
                    Закрыть
                </Button>
                {children}
            </div>
        </div>,
        document.body
    ) : null;
};

export default ModalWindow;