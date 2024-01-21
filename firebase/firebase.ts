import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// import { getAnalytics } from 'firebase/analytics';
import { collection, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: 'watch-d49bb.firebaseapp.com',
	projectId: 'watch-d49bb',
	storageBucket: 'watch-d49bb.appspot.com',
	messagingSenderId: '252838949358',
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
	measurementId: 'G-79HD6ZM0DF',
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);

// export const analytics = getAnalytics(app);

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();

googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');

export const db = getFirestore(app);

export const users = collection(db, 'users');
