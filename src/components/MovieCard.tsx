import { Card, CardFooter } from '@/components/ui/card';
import { Show } from '@/types';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart } from 'react-feather';
import { Button } from './ui/button';
import { SyntheticEvent, useState } from 'react';
import addToFavourite from '@/api/addToFavourite';
import { auth } from '../../firebase/firebase';

const movieCard = {
	initial: {
		opacity: 0,
		y: -150,
	},
	animate: {
		opacity: 1,
		rotate: 1,
		y: 0,
	},
};

const MovieCard = ({
	movie,
	uniqueValue,
}: {
	movie: Show;
	uniqueValue: string;
}) => {
	const router = useNavigate();

	const [fav, setFav] = useState(false);

	const addToFavourites = async (e: SyntheticEvent) => {
		e.stopPropagation();
		if (auth?.currentUser) {
			const data = await addToFavourite(auth.currentUser?.uid, movie);
			setFav(!fav);
			console.log('fav', data);
		}
	};

	return (
		<motion.div
			variants={movieCard}
			key={movie.id + uniqueValue}
			whileHover={{
				rotate: 0,
				transition: {
					duration: 0.3,
				},
			}}
			className='flex-shrink-0'>
			<Card
				onClick={() => {
					router(`/movie-details/${movie.id}/${movie.media_type}`);
				}}
				className='w-[250px] group transition-transform duration-500 max-w-[200px] relative overflow-hidden bg-slate-50/5 text-slate-50 border-slate-50/10 cursor-pointer'>
				<Button
					onClick={addToFavourites}
					className='text-red-600 py-1 px-2 absolute top-0 right-0 bg-slate-100/20 backdrop-blur-xl z-10'
					variant={'link'}>
					<Heart
						size={16}
						fill={fav ? 'rgb(220 38 38)' : 'none'}
					/>
				</Button>
				<img
					src={
						!movie.poster_path
							? '/images/poster-placeholder.webp'
							: `https://image.tmdb.org/t/p/original${movie.poster_path}`
					}
					className='pointer-events-none w-full  max-h-[250px] group-hover:scale-110 object-cover max-w-[250px] transition-all duration-300'
					alt=''
				/>
				<CardFooter className='w-full flex-col items-start space-y-2 py-2 absolute bottom-0 bg-slate-900/10 backdrop-blur-xl text-slate-100'>
					<p className=' font-semibold line-clamp-1 text-sm'>
						{movie.title || movie.name}
					</p>
					<p className='text-xs line-clamp-1'>
						{movie.original_name || movie.original_title}
					</p>
				</CardFooter>
			</Card>
		</motion.div>
	);
};

export default MovieCard;
