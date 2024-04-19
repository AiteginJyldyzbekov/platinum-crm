import React from 'react';
import styles from "./DottedLabel.module.scss";

interface DottedLabelProps {
    label: string;
    value: string;
}

const DottedLabel: React.FC<DottedLabelProps> = ({ label, value }) => {
    return (
        <div className={styles.dotted__label}>
            <span className={styles.label}>{label}</span>
            <span className={styles.dots}></span>
            <span className={styles.value}>{value}</span>
        </div>
    );
};

export default DottedLabel;