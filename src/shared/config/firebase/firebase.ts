import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { collection, getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDV1uQeGYjOdAO8wvrjYLphowus0EhNdLY',
  authDomain: 'platinum-crm-a0fcf.firebaseapp.com',
  projectId: 'platinum-crm-a0fcf',
  storageBucket: 'platinum-crm-a0fcf.appspot.com',
  messagingSenderId: '392282937222',
  appId: '1:392282937222:web:c3b47f6ec0e271f009be07',
  measurementId: 'G-CF8G5E9LCX'
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const usersRef = collection(db, 'users')
