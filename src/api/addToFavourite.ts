import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { Show } from '@/types';

const addToFavourite = async (userId: string, movie: Show) => {
	if (!userId) return;
	const favouritesRef = doc(
		db,
		'users',
		userId,
		'favourites',
		movie.id.toString()
	);
	const dbMovie = await getDoc(favouritesRef);
	if (dbMovie.exists()) {
		deleteDoc(favouritesRef);
		return;
	}
	const data = await setDoc(favouritesRef, movie);
	console.log(data);
};

export default addToFavourite;
