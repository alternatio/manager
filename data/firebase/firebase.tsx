import { initializeApp } from 'firebase/app'
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAyEenzMIsruTIiHnowPHEiEATypZ_0BkU',
  authDomain: 'manager-cb843.firebaseapp.com',
  projectId: 'manager-cb843',
  storageBucket: 'manager-cb843.appspot.com',
  messagingSenderId: '1086619555051',
  appId: '1:1086619555051:web:bb4396b26d6c62b1325aae',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)
