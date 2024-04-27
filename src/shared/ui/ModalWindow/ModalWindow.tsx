import React from 'react'
import ReactDOM from 'react-dom'
import styles from './ModalWindow.module.scss'
import { Button, ThemeButton } from '../Button/Button'
import { useTranslation } from 'react-i18next'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const ModalWindow: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const { t } = useTranslation()

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return isOpen
    ? ReactDOM.createPortal(
      <div className={styles.modal__overlay} onClick={handleOverlayClick}>
        <div className={styles.modal}>
          <Button
            theme={ThemeButton.DEFAULT}
            onClick={onClose}
          >
            {t('ModalWindow.close')}
          </Button>
          {children}
        </div>
      </div>,
      document.body
    )
    : null
}

export default ModalWindow
