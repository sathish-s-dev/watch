import MovieCard from '@/components/MovieCard';
import { MovieContainer } from '@/components/MoviesContainer';
import { Show } from '@/types';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { auth, db } from '../../firebase/firebase';
import { TopHeader } from '@/components/TopHeader';
import { useStore } from '@/store/user-store';

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
	const user = useStore((state) => state.user);

	return (
		<main className='flex flex-col h-full w-full'>
			<TopHeader user={user} />
			<div className='px-6'>
				<h1 className='text-2xl'>Favourites Movies</h1>
				<div className='pt-10'>
					{favouriteMovies.length === 0 ? (
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
