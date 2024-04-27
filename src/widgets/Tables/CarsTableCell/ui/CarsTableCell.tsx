import { type Car } from 'entities/Car/model/types/CarSchema'
import styles from './CarsTableCell.module.scss'
import { useTranslation } from 'react-i18next'
import { Status } from 'shared/ui/Status'
import DeleteIcon from 'shared/assets/icons/TableCell/delete__icon.svg'
import EditIcon from 'shared/assets/icons/TableCell/edit__icon.svg'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { type Driver } from 'entities/Driver/model/types/driverSchema'
import { doc, getDoc } from 'firebase/firestore'
import { db } from 'shared/config/firebase/firebase'

interface CarsTableCellProps {
  car: Car
  onDelete: (car: Car) => void
  index: number
}

const CarsTableCell: React.FC<CarsTableCellProps> = ({ car, onDelete, index }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [driver, setDriver] = useState<Driver>()

  const getDriver = async () => {
    const docRef = doc(db, 'users', car.driver)
    const res = await getDoc(docRef)

    if (res.exists()) {
      const driverData = res.data() as Driver
      setDriver(driverData)
    }
  }

  useEffect(() => {
    if (car.driver) {
      getDriver()
    }
  }, [car])

  return (
        <tr className={styles.wrapper} onClick={() => { navigate(`detail/${car.tid}`) }}>
            <td>
                <p className={styles.id}>{index + 1}</p>
            </td>
            <td>
                <div className={styles.car}>
                    {/* <img
                        className={styles.car__image}
                        src={car.images[0].url}
                    /> */}
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
                                <img
                                    className={styles.driver__avatar}
                                    src={driver?.images[1].url}
                                />
                                <div className={styles.driver__description}>
                                    <p className={styles.description__name}>
                                        {driver?.name} {driver?.lastName}
                                    </p>
                                    <p className={styles.description__number}>
                                        {driver?.phoneNumber}
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
                <DeleteIcon onClick={(e) => {
                  e.stopPropagation()
                  onDelete(car)
                }} />
                <EditIcon onClick={(e) => {
                  e.stopPropagation()
                  navigate(`edit/${car.tid}`)
                }} />
            </td>
        </tr>
  )
}

export default CarsTableCell
