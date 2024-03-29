import { type Car } from 'entities/Car/model/types/CarSchema'
import styles from './CarsTableCell.module.scss'
import { useTranslation } from 'react-i18next'
import { Status } from 'shared/ui/Status'
import DeleteIcon from 'shared/assets/icons/TableCell/delete__icon.svg'
import EditIcon from 'shared/assets/icons/TableCell/edit__icon.svg'

interface CarsTableCellProps {
  car: Car
  onDelete: (tid: string, car: string) => void
}

const CarsTableCell: React.FC<CarsTableCellProps> = ({ car, onDelete }) => {
  const { t } = useTranslation()

  console.log(car)

  return (
        <tr className={styles.wrapper}>
            <td>
                <p className={styles.id}>{car.id}</p>
            </td>
            <td>
                <div className={styles.car}>
                    <div className={styles.car__image} />
                    <div className={styles.text__container}>
                        <p className={styles.car__model}>{car.brand} {car.model}</p>
                        <p className={styles.car__number}>{car.numberPlate}</p>
                    </div>
                </div>
            </td>
            <td className={styles.status__container}>
                <Status status={car.status} />
            </td>
            <td>
                <div className={styles.parameters}>
                    <p className={styles.parameters__title}>
                        {car.brand} {car.model} {car.year} {car.color}
                    </p>
                    <p className={styles.parameters__description}>
                        1.3л, 86 л.c, бензин, передний привод...
                    </p>
                </div>
            </td>
            <td>
                {
                    car.driver
                      ? (
                            <div className={styles.driver}>
                                <div className={styles.driver__avatar} />
                                <div className={styles.driver__description}>
                                    <p className={styles.description__name}>
                                        {car.driver.name} {car.driver.lastName}
                                    </p>
                                    <p className={styles.description__number}>
                                        {car.driver.phoneNumber}
                                    </p>
                                </div>
                            </div>
                        )
                      : <p>{t('CarsTable.noDriver')}</p>
                }
            </td>
            <td>
                <p>{car.lastOilChangeDate}</p>
            </td>
            <td className={styles.icons__container}>
                <DeleteIcon onClick={() => { onDelete(car.tid, car.brand) }} />
                <EditIcon />
            </td>
        </tr>
  )
}

export default CarsTableCell
