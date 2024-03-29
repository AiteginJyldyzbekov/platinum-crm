import React, { useState, type ChangeEvent, useMemo } from 'react'
import styles from './Select.module.scss'
import { type Car } from 'entities/Car/model/types/CarSchema'

interface CustomSelectProps {
  data: Car[]
}

const CustomSelect: React.FC<CustomSelectProps> = ({ data }) => {
  const [selectedValue, setSelectedValue] = useState<string>('')

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    setSelectedValue(value)
  }

  const renderData = useMemo(() => {
    if (data) {
      return data.map((el) => (
        <option className={styles.select__item} value={el.tid} key={el.tid}>
          <div className={styles.logo}></div>
          <div className={styles.text__content}>
            <p>{el.brand} {el.model}</p>
            <p>{el.numberPlate}</p>
          </div>
        </option>
      ))
    }
  }, [data])

  return (
    <div className={styles.select__container}>
      <select className={styles.custom__select} value={selectedValue} onChange={handleChange}>
        {renderData}
      </select>
      <div className={styles.select__arrow}></div>
    </div>
  )
}

export default CustomSelect
