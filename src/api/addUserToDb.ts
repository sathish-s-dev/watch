import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

type User = {
	id: string;
	name: string;
	email: string;
	photoUrl: string;
};
const addUserToDb = async (user: User) => {
	const userRef = doc(db, 'users', user.id);
	const dbUser = await getDoc(userRef);
	if (dbUser) {
		// console.log(dbUser.data, dbUser.id);
		return;
	}
	const newUser = {
		...user,
		provider: 'google',
		createdAt: new Date(),
	};
	const res = await setDoc(doc(db, 'users', user.id), newUser);
	console.log(res);
};

export default addUserToDb;

