// import { useEffect, useState } from 'react';
// import { Response } from '../types';
import fetchData from '@/api/fetchData';
import { MoviesSection } from '@/components/MoviesSection';
import { TopHeader } from '@/components/TopHeader';
import LoadingSpinner from '@/components/spinner';
import { useStore } from '@/store/user-store';
import { useQuery } from '@tanstack/react-query';

const Trending = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['trending'],
		queryFn: () => fetchData('https://api.themoviedb.org/3/trending/all/day'),
	});

	const user = useStore((state) => state.user);

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<main className='h-screen overflow-hidden flex flex-col space-y-3'>
			<TopHeader user={user} />
			<MoviesSection
				title='Trending at this moment'
				data={data}
			/>
		</main>
	);
};

export default Trending;
