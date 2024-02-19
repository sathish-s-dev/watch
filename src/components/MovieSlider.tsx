import { movieContainerVariants } from '@/lib/animation/variants';
import { Show } from '@/types';
import { motion } from 'framer-motion';
import MovieCard from './MovieCard';
import SkeletonMovieList from './skeleton/SkeletonMovieList';

type MovieSliderProps = {
	results: Show[] | undefined;
	title: string;
};

export function MovieSlider({ results, title }: MovieSliderProps) {
	return (
		<div className='grid gap-y-3 my-6 w-full overflow-hidden'>
			<h3 className='text-xl font-bold px-6'>{title}</h3>
			{/* <Separator className='w-full text-slate-100 bg-[#8530ce]/60' /> */}
			<motion.div
				variants={movieContainerVariants}
				initial='initial'
				animate='animate'
				className='flex overflow-x-scroll overflow-y-hidden px-6 space-x-6 py-6 no-scrollbar'>
				<MovieList
					results={results}
					title={title}
				/>
			</motion.div>
		</div>
	);
}

function MovieList({ results, title }: MovieSliderProps) {
	if (!results) {
		return <SkeletonMovieList />;
	}
	return results?.map((movie, i) => (
		<MovieCard
			movie={movie}
			key={movie.id + i + title + Math.random()}
		/>
	));
}
