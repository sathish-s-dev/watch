import MovieCard from '@/components/MovieCard';
import { MovieContainer } from '@/components/MoviesContainer';
import { Show } from '@/types';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { auth, db } from '../../firebase/firebase';

const Favourites = () => {
	const [favouriteMovies, setFavouriteMovies] = useState<Show[]>([]);
	useEffect(() => {
		const favoriteMovieQuery = query(
			collection(db, `users/${auth.currentUser?.uid}/favourites`)
		);
		const unsubscribe = onSnapshot(favoriteMovieQuery, (snapshot) => {
			const result: Show[] = [];
			snapshot.forEach((doc) => {
				result.push(doc.data() as Show);
			});
			setFavouriteMovies(result);
		});

		return () => unsubscribe();
	}, []);
	// console.log(favouriteMovies);
	return (
		<main className='flex flex-col h-full w-full p-6'>
			<h1 className='text-2xl'>Favourites Movies</h1>
			<p className=' pt-12 block'>you have no favourite movies</p>
			<MovieContainer>
				{favouriteMovies.map((movie, i) => {
					return (
						<MovieCard
							key={movie.id.toString() + 'favourites' + i}
							movie={movie}
							uniqueValue={'favourites' + i}
						/>
					);
				})}
			</MovieContainer>
		</main>
	);
};

export default Favourites;
