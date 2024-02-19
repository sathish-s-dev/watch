import addToFavourite from '@/api/addToFavourite';
import { Card, CardFooter } from '@/components/ui/card';
import { useStore } from '@/store/user-store';
import { Show } from '@/types';
import { motion } from 'framer-motion';
import { SyntheticEvent, useState } from 'react';
import { Heart, Star } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from './ui/button';
import { movieContainerVariants } from '@/lib/animation/variants';

// const movieCard = {
// 	initial: {
// 		opacity: 0,
// 		y: 50,
// 	},
// 	animate: {
// 		opacity: 1,
// 		y: 0,
// 	},
// 	whileInView: {
// 		opacity: 1,
// 		y: 0,
// 	},
// };

const MovieCard = ({ movie }: { movie: Show }) => {
	const router = useNavigate();

	const [fav, setFav] = useState(false);

	const user = useStore((state) => state.user);

	const addToFavourites = async (e: SyntheticEvent) => {
		e.stopPropagation();
		if (!user?.uid) {
			toast.error('Please login to add favourites', {
				position: 'top-center',
			});
			return;
		}
		const data = await addToFavourite(user!.uid, movie);
		setFav(!fav);
		console.log('fav', data);
	};

	return (
		<motion.div
			variants={movieContainerVariants}
			initial={'initial'}
			whileInView={'whileInView'}
			className='flex-shrink-0 overflow-hidden'>
			<Card
				onClick={() => {
					router(`/movie-details/${movie.id}/${movie.media_type}`);
				}}
				className='w-[250px] group transition-transform duration-500 relative overflow-hidden rounded-lg bg-slate-50/5 text-slate-50 border-slate-50/10 cursor-pointer'>
				<Button
					onClick={addToFavourites}
					className='text-red-600 py-1 px-2 absolute top-0 right-0 bg-slate-100/20 backdrop-blur-xl z-10'
					variant={'link'}>
					<Heart
						size={16}
						fill={fav ? 'rgb(220 38 38)' : 'none'}
					/>
				</Button>
				<div className='w-full h-full overflow-hidden rounded-lg'>
					<img
						src={
							!movie.poster_path
								? '/images/poster-placeholder.webp'
								: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
						}
						className='pointer-events-none w-full aspect-[3/4] group-hover:scale-110 object-cover transition-all duration-300'
						alt={movie.title || movie.name}
					/>
				</div>
				<CardFooter className='w-full justify-between flex items-start space-y-2 py-4 absolute bottom-0 bg-slate-900/10 backdrop-blur-xl text-slate-100'>
					<div className='flex flex-col gap-2'>
						<p className=' font-semibold line-clamp-1 text-sm'>
							{movie.title || movie.name}
						</p>
						<p className='text-xs line-clamp-1'>
							{movie.original_name || movie.original_title}
						</p>
					</div>
					<div className='flex items-center gap-1'>
						<Star
							fill='rgb(250 204 21)'
							stroke='0'
						/>{' '}
						<p className='text-xs  line-clamp-1 text-white'>
							{movie.vote_average.toFixed(1)} / 10
						</p>
					</div>
				</CardFooter>
			</Card>
		</motion.div>
	);
};

export default MovieCard;
