import DatePicker, { DateObject } from "react-multi-date-picker";
import styles from "./FinancialHistory.module.scss"
import { useState } from "react";
import { Button, ThemeButton } from "shared/ui/Button/Button";
import ModalWindow from "shared/ui/ModalWindow/ModalWindow";

const FinancialHistory = () => {
    const [values, setValues] = useState<any>([])
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    return (
        <div className={styles.wrapper}>
            <p className={styles.title}>История расходов</p>
            <div className={styles.options__container}>
                <DatePicker
                    format={"D/MM/YYYY"}
                    placeholder="В период с / по"
                    value={values}
                    onChange={setValues}
                    range
                    rangeHover
                />
                <Button
                    theme={ThemeButton.DEFAULT}
                    onClick={handleOpenModal}
                >
                    Добавить
                </Button>
                <ModalWindow isOpen={isOpen} onClose={handleCloseModal}>
                    <h2>Модальное окно</h2>
                    <p>Форма для добавления расходов</p>
                </ModalWindow>
            </div>
            <div className={styles.transactiions__container}>
                <div className={styles.transactiions__head}>
                    <span style={{ flexBasis: '30%' }}>Дата</span>
                    <span style={{ flexBasis: '50%' }}>Вид расхода</span>
                    <span style={{ flexBasis: '20%' }}>Стоимость</span>
                </div>
                <ul>
                    <li>
                        <span style={{ flexBasis: '30%' }}>12/12/12</span>
                        <span style={{ flexBasis: '50%' }}>Покраска</span>
                        <span style={{ flexBasis: '20%' }}>1243 сом</span>
                    </li>
                    <li>
                        <span style={{ flexBasis: '30%' }}>12/12/12</span>
                        <span style={{ flexBasis: '50%' }}>Покраска</span>
                        <span style={{ flexBasis: '20%' }}>1243 сом</span>
                    </li>
                    <li>
                        <span style={{ flexBasis: '30%' }}>12/12/12</span>
                        <span style={{ flexBasis: '50%' }}>Покраска</span>
                        <span style={{ flexBasis: '20%' }}>1243 сом</span>
                    </li>
                    <li>
                        <span style={{ flexBasis: '30%' }}>12/12/12</span>
                        <span style={{ flexBasis: '50%' }}>Покраска</span>
                        <span style={{ flexBasis: '20%' }}>1243 сом</span>
                    </li>
                    <li>
                        <span style={{ flexBasis: '30%' }}>12/12/12</span>
                        <span style={{ flexBasis: '50%' }}>Покраска</span>
                        <span style={{ flexBasis: '20%' }}>1243 сом</span>
                    </li>
                    <li>
                        <span style={{ flexBasis: '30%' }}>12/12/12</span>
                        <span style={{ flexBasis: '50%' }}>Покраска</span>
                        <span style={{ flexBasis: '20%' }}>1243 сом</span>
                    </li>

                </ul>
            </div>
            <div className={styles.bottom__content}>
                <p>Потрачено</p>
                <p>50.000 сом</p>
            </div>
        </div>
    )
}

export default FinancialHistory;