import { carsRef } from "shared/config/firebase/firebase";
import { addDoc } from 'firebase/firestore'

export default function handler() {
    const newCar = {
        car: 'CRON',
        model: 'CRON',
        color: 'CRON',
        numberPlate: 'CRON'
      }
    addDoc(carsRef, newCar)

    return `Cron job was create a car`;
  }