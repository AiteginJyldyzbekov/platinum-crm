import styles from './DriversTableCell.module.scss'
import { useTranslation } from 'react-i18next'
import { Status } from 'shared/ui/Status'
import DeleteIcon from 'shared/assets/icons/TableCell/delete__icon.svg'
import { type Driver } from 'entities/Driver/model/types/driverSchema'
import EditIcon from 'shared/assets/icons/TableCell/edit__icon.svg'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { type Car } from 'entities/Car/model/types/CarSchema'
import { doc, getDoc } from 'firebase/firestore'
import { db } from 'shared/config/firebase/firebase'
import { useAppSelector } from 'shared/lib/reduxHooks'
import { getPaginationState } from 'entities/Pagination/model/selectors/getPaginationState'

type onDeleteType = (
  e: React.MouseEvent<SVGSVGElement, MouseEvent>,
  driver: Driver
) => void

interface CarsTableCellProps {
  driver: Driver
  onDelete: onDeleteType
  index: number
}

const DriversTableCell: React.FC<CarsTableCellProps> = ({ driver, onDelete, index }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { page, offset } = useAppSelector(getPaginationState)

  const [car, setCar] = useState<Car>()

  const getCar = async () => {
    const docRef = doc(db, 'cars', driver.car)
    const res = await getDoc(docRef)

    if (res.exists()) {
      const carData = res.data() as Car
      setCar(carData)
    }
  }

  useEffect(() => {
    if (driver.car) {
      getCar()
    }
  }, [driver])

  return (
    <tr className={styles.wrapper} onClick={() => { navigate(`detail/${driver.tid}`) }}>
      <td>
        <p className={styles.id}>{page !== 1 ? index + 1 + offset : index + 1}</p>
      </td>
      <td>
        <div className={styles.driver}>
          <img
            className={styles.driver__avatar}
            src={driver?.images[1].url}
          />
          <div className={styles.driver__description}>
            <p className={styles.description__name}>{driver.lastName} {driver.name}</p>
            <p className={styles.description__number}>{driver.phoneNumber}</p>
          </div>
        </div>
      </td>
      <td className={styles.status__container}>
        <Status status={driver.status} />
      </td>
      <td>
        <p>{driver.phoneNumber}</p>
      </td>
      <td>
        {driver.car
          ? (
            <div className={styles.car}>
              <img className={styles.car__image} src={car?.images[0].url} />
              <div className={styles.text__container}>
                <p className={styles.car__model}>
                  {car?.brand} {car?.model}
                </p>
                <p className={styles.car__number}>{car?.numberPlate}</p>
              </div>
            </div>
            )
          : <p>{t('DetailPages.noCar')}</p>}
      </td>
      <td>
        <p>{driver.startRentDate}</p>
      </td>
      <td className={styles.icons__container}>
        <DeleteIcon
          onClick={(e) => {
            e.stopPropagation()
            onDelete(e, driver)
          }}
        />
        <EditIcon onClick={(e) => {
          e.stopPropagation()
          navigate(`edit/${driver.tid}`)
        }} />
      </td>
    </tr>
  )
}

export default DriversTableCell
