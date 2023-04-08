import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { FIREBASE_API_KEY } from '@env';

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: 'markovoitovych-react-native-hw.firebaseapp.com',
  projectId: 'markovoitovych-react-native-hw',
  storageBucket: 'gs://markovoitovych-react-native-hw.appspot.com',
  messagingSenderId: '679867914315',
  appId: '1:679867914315:web:dbcfc90091d4499f25d5ce',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, firestore, storage };
