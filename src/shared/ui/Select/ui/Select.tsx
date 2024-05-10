import React, { useState, type ChangeEvent, useMemo } from 'react'
import styles from './Select.module.scss'
import { type Car } from 'entities/Car/model/types/CarSchema'

interface CustomSelectProps {
  data: Car[]
  setState: (value: string) => void
  edit?: boolean
}

const CustomSelect: React.FC<CustomSelectProps> = ({ data, setState, edit }) => {
  const [selectedValue, setSelectedValue] = useState<string>()

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    setSelectedValue(value)
    setState(value)
  }

  // Добавляем фиктивный элемент в начало массива данных
  const dataWithDefaultOption = useMemo(() => {
    return [{ tid: '', brand: '', model: '', numberPlate: 'Выберите машину' }, ...data]
  }, [data])

  const renderData = useMemo(() => {
    if (edit && dataWithDefaultOption) {
      return data.map((el: Car) => (
        <option
          className={styles.select__item}
          value={el.tid}
          key={el.tid}
        >
          <div className={styles.logo}></div>
          <div className={styles.text__content}>
            <p>{el.brand} {el.model}</p>
            <p>{el.numberPlate}</p>
          </div>

        </option>
      ))
    } else if (!edit && dataWithDefaultOption) {
      return dataWithDefaultOption.map((el: Car) => (
        <option
          className={styles.select__item}
          value={el.tid}
          key={el.tid}
        >
          {
            el.tid
              ? (
                <>
                  <div className={styles.logo}></div>
                  <div className={styles.text__content}>
                    <p>{el.brand} {el.model}</p>
                    <p>{el.numberPlate}</p>
                  </div>
                </>
                )
              : (
                  el.numberPlate
                )
          }
        </option>
      ))
    }
  }, [dataWithDefaultOption])

  return (
    <div className={styles.select__container}>
      <select
        className={styles.custom__select}
        value={selectedValue}
        onChange={handleChange}
      >
        {renderData}
      </select>
      <div className={styles.select__arrow}></div>
    </div>
  )
}

export default CustomSelect
