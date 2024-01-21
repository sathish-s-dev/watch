import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { useEffect, useState } from 'react';
import { Bell, Search } from 'react-feather';
import { Link } from 'react-router-dom';
// import { Response } from '../types';
import fetchData from '@/api/fetchData';
import { MoviesSection } from '@/components/MoviesSection';
import LoadingSpinner from '@/components/spinner';
import { useQuery } from '@tanstack/react-query';

const Trending = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['trending'],
		queryFn: () => fetchData('https://api.themoviedb.org/3/trending/all/day'),
	});

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<main className='h-screen overflow-hidden p-6 flex flex-col space-y-3'>
			<div className='flex flex-col justify-between bg-cover bg-center'>
				<div className='flex justify-between'>
					<div className='flex space-x-6'>
						<Link to='/'>Movies</Link>
						<Link to='/'>Series</Link>
						<Link to='/'>Documentaries</Link>
					</div>
					<div className='flex items-center space-x-3'>
						<Search size={16} />
						<Bell size={16} />
						<Avatar className='w-6 h-6 rounded-full'>
							<AvatarImage src='https://github.com/shadcn.png' />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
					</div>
				</div>
			</div>
			<MoviesSection
				title='Trending at this moment'
				data={data}
			/>
		</main>
	);
};

export default Trending;
