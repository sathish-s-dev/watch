import MovieCard from '@/components/MovieCard';
import { MovieContainer } from '@/components/MoviesContainer';
import { Response } from '@/types';
import SkeletonMovieList from './skeleton/SkeletonMovieList';

export function MoviesSection({
	data,
	title,
}: {
	data: Response | undefined;
	title: string;
}) {
	return (
		<div className='overflow-y-scroll no-scrollbar h-full pb-20 px-6'>
			<h2 className='text-2xl block font-semibold capitalize my-4'>{title}</h2>
			<MovieContainer>
				{data ? (
					data?.results.map((movie, i) => (
						<MovieCard
							key={movie.id + i + title + Math.random}
							movie={movie}
						/>
					))
				) : (
					<SkeletonMovieList />
				)}
			</MovieContainer>
		</div>
	);
}
