import MovieCard from '@/components/MovieCard';
// import { useEffect, useState } from 'react';
// import { Response } from '../types';
import { MovieContainer } from '@/components/MoviesContainer';
import { Response } from '@/types';

export function MoviesSection({
	data,
	title,
}: {
	data: Response | undefined;
	title: string;
}) {
	return (
		<div className='overflow-y-scroll no-scrollbar px-6'>
			<h2 className='text-2xl block font-bold my-4'>{title}</h2>
			<MovieContainer>
				{data?.results.map((movie, i) => (
					<MovieCard
						key={movie.id + i + title + Math.random}
						movie={movie}
					/>
				))}
			</MovieContainer>
		</div>
	);
}
