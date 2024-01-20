import { addDoc } from "firebase/firestore"
import { carsRef } from "shared/config/firebase/firebase"

export async function GET() {
    const newCar = {
        car: 'CRON',
        model: 'CRON',
        color: 'CRON',
        numberPlate: 'CRON'
    }
    addDoc(carsRef, newCar)
    return new Response("Hello from cron", {
        status: 200
    })
}