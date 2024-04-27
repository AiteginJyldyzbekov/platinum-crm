import React from 'react'
import styles from './DottedLabel.module.scss'
import { useTranslation } from 'react-i18next'

interface DottedLabelProps {
  label: string
  value: string
}

const DottedLabel: React.FC<DottedLabelProps> = ({ label, value }) => {
  const { t } = useTranslation()
  return (
    <div className={styles.dotted__label}>
      <span className={styles.label}>{t(label)}</span>
      <span className={styles.dots}></span>
      <span className={styles.value}>{value}</span>
    </div>
  )
}

export default DottedLabel
