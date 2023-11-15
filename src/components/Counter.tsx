import { useState } from "react"
import styles from "./Counter.module.scss"

export const Counter = () => {
    const [count, setCount] = useState(0)
    return (
        <>
            <div className={styles.btn}>Counter: {count}</div>
            <button onClick={() => setCount(count + 1)}>Click</button>
        </>
    )
}