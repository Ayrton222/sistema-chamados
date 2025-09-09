import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: //Sua Api key do firebase,
  authDomain: // Auth domain do firebase,
  projectId: //Project ID do firebase,
  storageBucket: //Storage buck do firebase,
  messagingSenderId: //Identifier do firebase,
  appId: // Id  do app no firebase
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export {auth, db, storage};