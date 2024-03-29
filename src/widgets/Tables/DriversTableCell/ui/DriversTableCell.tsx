import styles from './DriversTableCell.module.scss'
import { useTranslation } from 'react-i18next'
import { Status } from 'shared/ui/Status'
import DeleteIcon from 'shared/assets/icons/TableCell/delete__icon.svg'
import { type Driver } from 'entities/Driver/model/types/driverSchema'
import EditIcon from 'shared/assets/icons/TableCell/edit__icon.svg'

type onDeleteType = (
  e: React.MouseEvent<SVGSVGElement, MouseEvent>,
  nameToDelete: string,
  tid: string,
  email: string,
  password: string
) => void

interface CarsTableCellProps {
  driver: Driver
  onDelete: onDeleteType
}

const DriversTableCell: React.FC<CarsTableCellProps> = ({ driver, onDelete }) => {
  const { t } = useTranslation()
  console.log(driver)
  return (
        <tr className={styles.wrapper}>
            <td>
                <p className={styles.id}>{driver.id}</p>
            </td>
            <td>
                <div className={styles.driver}>
                    <div className={styles.driver__avatar} />
                    <div className={styles.driver__description}>
                        <p className={styles.description__name}>{driver.lastName} {driver.name}</p>
                        <p className={styles.description__number}>{driver.phoneNumber}</p>
                    </div>
                </div>
            </td>
            <td className={styles.status__container}>
                <Status status="free" />
            </td>
            <td>
                <p>{driver.phoneNumber}</p>
            </td>
            <td>
                {driver.car
                  ? (
                        <div className={styles.car}>
                            <div className={styles.car__image} />
                            <div className={styles.text__container}>
                                <p className={styles.car__model}>
                                    {driver.car.brand} {driver.car.model}
                                </p>
                                <p className={styles.car__number}>{driver.car.numberPlate}</p>
                            </div>
                        </div>
                    )
                  : <p>{t('DriversTable.noCar')}</p>}
            </td>
            <td>
                <p>2/21/2024</p>
            </td>
            <td className={styles.icons__container}>
                <DeleteIcon
                    onClick={(e) => {
                      e.stopPropagation()
                      onDelete(e, driver.name, driver.tid, driver.email, driver.password)
                    }}
                />
                <EditIcon />
            </td>
        </tr>
  )
}

export default DriversTableCell
