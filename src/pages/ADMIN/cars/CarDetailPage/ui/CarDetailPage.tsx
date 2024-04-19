import { useTranslation } from 'react-i18next'
import styles from './CarDetailPage.module.scss'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getCarById, getCarState } from 'entities/Car'
import { useAppDispatch, useAppSelector } from 'shared/lib/reduxHooks'
import { Loader } from 'shared/ui/Loader/Loader'
import { Status } from 'shared/ui/Status'
import DottedLabel from 'shared/ui/DottedLabel/DottedLabel'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { classNames } from 'shared/lib/classNames/classNames'
import { ImageCollage } from 'shared/ui/ImageCollage'
import { ImageData } from 'entities/Car/model/types/CarSchema'
import ImageCollageView from 'shared/ui/ImageCollageView/ImageCollageView'
import ImageView from 'shared/ui/ImageView/ImageView'
import FinancialHistory from 'widgets/FinancialHistory/ui/FinancialHistory'
import { Link } from 'react-router-dom'

const CarDetailPage: React.FC = () => {
    const { t } = useTranslation()
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const { isLoading, result } = useAppSelector(getCarState)
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getCarById({ tid: id }))
    }, [id])

    console.log(result)


    if (isLoading && !result) return <Loader />
    return (
        <div className={styles.wrapper}>
            <div className={styles.top__content}>
                <div className={styles.car__title}>Honda fit</div>
                <Status status='atWork' />
            </div>
            <div className={styles.bottom__content}>
                <div className={styles.main__content}>
                    <div className={styles.car}>
                        <p className={styles.title}>Данные автомобиля</p>
                        <div className={styles.dotted__labels}>
                            <DottedLabel label='Гос номер' value='01KG005VOP' />
                            <DottedLabel label='Марка' value='Honda' />
                            <DottedLabel label='Модель' value='Fit Aria' />
                            <DottedLabel label='Год выпуска' value='2005' />
                        </div>
                    </div>
                    <div className={styles.driver}>
                        <p className={styles.title}>Водитель</p>
                        <div className={styles.dotted__labels}>
                            <DottedLabel label='ФИО' value='Айтегин Жылдызбеков' />
                            <DottedLabel label='Номер телефона' value='+996 703 76 33 46' />
                        </div>
                        <Button
                            theme={ThemeButton.DEFAULT}
                            clasName={styles.more__button}
                        >
                            <Link
                                to={`/drivers/detail/${result?.driver}`}
                                style={{ textDecoration: "none", color: "white" }}
                            >
                                Подробнее о водителе
                            </Link>
                        </Button>
                    </div>
                    <div className={styles.car__images}>
                        <ImageCollageView images={result?.images} />
                    </div>
                    <div className={styles.car__techPassport}>
                        <ImageView image={result?.techPassport} />
                    </div>
                </div>
                <div className={styles.transaction__history}>
                    <FinancialHistory />
                </div>
            </div>
        </div>
    )
}

export default CarDetailPage
