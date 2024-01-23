import fetchData from '@/api/fetchData';
import { Input } from '@/components/ui/input';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { MoviesSection } from '@/components/MoviesSection';
import { TopHeader } from '@/components/TopHeader';
import { Response } from '@/types';

const SearchMovie = () => {
	const [search, setSearch] = useState('');

	const [value] = useDebounce(search, 400);

	const { data, isLoading } = useQuery({
		queryKey: ['search', value],
		queryFn: () => {
			const url = `https://api.themoviedb.org/3/search/movie?query=${value}&include_adult=false&language=en-US&page=1`;
			return fetchData<Response>(url);
		},
	});
	console.log(isLoading);

	return (
		<div className='h-screen pt-6'>
			<TopHeader />
			<div className='px-6'>
				<Input
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					placeholder='Seach movie'
				/>
			</div>
			{!isLoading && (
				<MoviesSection
					title='search results'
					data={data}
				/>
			)}
		</div>
	);
};

export default SearchMovie;
