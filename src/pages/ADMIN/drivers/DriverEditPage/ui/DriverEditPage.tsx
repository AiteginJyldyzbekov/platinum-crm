import { useTranslation } from 'react-i18next'
import styles from './DriverEditPage.module.scss'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { Input } from 'shared/ui/Input/Input'
import { type SubmitHandler, useForm, Controller } from 'react-hook-form'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getDriverById, getDriverState, updateDriver } from 'entities/Driver'
import { useAppDispatch, useAppSelector } from 'shared/lib/reduxHooks'
import {
    BalanceType,
    changeBalance
} from 'entities/Driver/model/services/changeBalance/changeBalance'
import { type Driver } from 'entities/Driver/model/types/driverSchema'
import DatePicker from 'react-multi-date-picker'
import DatePanel from 'react-multi-date-picker/plugins/date_panel'
import { ImageData } from 'entities/Car/model/types/CarSchema'
import { ImageCollage } from 'shared/ui/ImageCollage'

const DriverEditPage: React.FC = () => {
    const { t } = useTranslation()
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const { isLoading, result } = useAppSelector(getDriverState)
    const navigate = useNavigate()

    const [imageData, setImageData] = useState<ImageData[]>([
        { name: 'document', file: null, url: null, isLoading: false },
        { name: 'avatar', file: null, url: null, isLoading: false }
    ])

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        control
    } = useForm<Driver>()

    /* eslint-disable @typescript-eslint/no-misused-promises */
    const onSubmit: SubmitHandler<Driver> = useCallback(async (data) => {
        const updatedImageData = imageData.map(item => {
            const { file, ...rest } = item
            return rest
          })

        const updatedUserData = {
            tid: id,
            email: data.email,
            password: data.password,
            name: data.name,
            lastName: data.lastName,
            phoneNumber: data.phoneNumber,
            images: updatedImageData,
            balance: result?.balance,
            status: result?.status,
            transactionHistory: [
                {
                    amount: '',
                    date: '',
                    amountType: ''
                }
            ],
            startRentDate: data.startRentDate,
            weekendDates: data.weekendDates
        }

        dispatch(updateDriver(updatedUserData))
    }, [result, isLoading, imageData])

    useEffect(() => {
        if (!isLoading && result) {
            const {
                email,
                password,
                name,
                lastName,
                phoneNumber,
                images,
                transactionHistory,
                startRentDate,
                weekendDates
            } = result
            setValue('email', email)
            setValue('password', password)
            setValue('name', name)
            setValue('lastName', lastName)
            setValue('phoneNumber', phoneNumber)
            setValue('startRentDate', startRentDate)
            setValue('weekendDates', weekendDates)
            setImageData(result.images)
        }
    }, [isLoading, result, setValue])

    useEffect(() => {
        dispatch(getDriverById({ tid: id }))
    }, [id])

    const balanceHandler = (type: BalanceType) => {
        const sum = window?.prompt('Напишите сумму')
        if (sum) {
            dispatch(changeBalance({
                tid: id,
                type,
                currentBalance: result.balance,
                amount: Number(sum)
            }))
                .then(() => {
                    alert('Баланс успешно обновлен')
                })
        }
    }

    return (
        <div className={styles.wrapper}>
            <p>{t('createDriver')}</p>
            <div className={styles.balance__block}>
                <div
                    className={styles.balance__minus}
                    onClick={() => { balanceHandler(BalanceType.minus) }}
                >-</div>
                <p>{`${t('balance')}: ${result?.balance}`}</p>
                <div
                    className={styles.balance__plus}
                    onClick={() => { balanceHandler(BalanceType.plus) }}
                >+</div>
            </div>
            <ImageCollage imageData={imageData} setImageData={setImageData} />
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    type="text"
                    placeholder="Name"
                    label="name"
                    register={register}
                    required
                />
                <Input
                    type="text"
                    placeholder="Lastname"
                    label="lastName"
                    register={register}
                    required
                />
                <Input
                    type="text"
                    placeholder="Email"
                    label="email"
                    register={register}
                    required
                />
                <Input
                    type="text"
                    placeholder="Password"
                    label="password"
                    register={register}
                    required
                />
                <Input
                    type="text"
                    placeholder="Phone number"
                    label="phoneNumber"
                    register={register}
                    required
                />
                <Controller
                    control={control}
                    name="startRentDate"
                    rules={{ required: true }}
                    render={({
                        field: { onChange, name, value },
                        fieldState: { invalid, isDirty },
                        formState: { errors },
                    }) => (
                        <>
                            <DatePicker
                                format={"D/MM/YYYY"}
                                value={result?.startRentDate}
                                onChange={(date: any) => {
                                    onChange(date.format?.("D/MM/YYYY"));
                                }}
                            />
                            {errors && errors[name] && errors[name].type === "required" && (
                                <span>your error message !</span>
                            )}
                        </>
                    )}
                />
                <Controller
                    control={control}
                    name="weekendDates"
                    rules={{ required: true }}
                    render={({
                        field: { onChange, name, value },
                        fieldState: { invalid, isDirty },
                        formState: { errors },
                    }) => (
                        <>
                            <DatePicker
                                multiple
                                format={"MM/DD/YYYY"}
                                value={result?.weekendDates}
                                onChange={(date: any) => {
                                    onChange(date.format?.("D/MM/YYYY"));
                                }}
                                plugins={[
                                    <DatePanel />
                                ]}
                            />
                            {errors && errors[name] && errors[name].type === "required" && (
                                <span>your error message !</span>
                            )}
                        </>
                    )}
                />
                <Button
                    theme={ThemeButton.OUTLINE}
                    type='submit'
                >
                    {t('save')}
                </Button>
            </form>
        </div>
    )
}

export default DriverEditPage
