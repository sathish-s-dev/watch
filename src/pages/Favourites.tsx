import MovieCard from '@/components/MovieCard';
import { MovieContainer } from '@/components/MoviesContainer';
import { Show } from '@/types';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { auth, db } from '../../firebase/firebase';
import { TopHeader } from '@/components/TopHeader';
import { toast } from 'react-toastify';

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

		console.log(auth.currentUser);

		return () => unsubscribe();
	}, []);

	useEffect(() => {
		auth
			.authStateReady()
			.then(() => {
				if (!auth.currentUser) toast.warn('please sign to add movies');
			})
			.catch((e) => console.log(e));
	}, []);

	return (
		<main className='flex flex-col h-full w-full'>
			<TopHeader />
			<div className='px-6'>
				<h1 className='text-2xl'>Favourites Movies</h1>
				<div className='pt-10'>
					{favouriteMovies.length === 0 || !auth.currentUser ? (
						<p className='text-lg'>you have no favourite movies</p>
					) : (
						<MovieContainer>
							{favouriteMovies.map((movie, i) => {
								return (
									<MovieCard
										key={'favourites' + i + JSON.stringify(movie)}
										movie={movie}
									/>
								);
							})}
						</MovieContainer>
					)}
				</div>
			</div>
		</main>
	);
};

export default Favourites;
