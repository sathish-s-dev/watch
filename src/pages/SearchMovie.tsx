import fetchData from '@/api/fetchData';
import { Input } from '@/components/ui/input';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { MoviesSection } from '@/components/MoviesSection';

const SearchMovie = () => {
	const [search, setSearch] = useState('');

	const [value] = useDebounce(search, 400);

	const { data } = useQuery({
		queryKey: ['search', value],
		queryFn: () => {
			const url = `https://api.themoviedb.org/3/search/movie?query=${value}&include_adult=false&language=en-US&page=1`;
			return fetchData(url);
		},
	});
	console.log(data);

	return (
		<div className='overflow-y-scroll h-screen pt-6 px-4'>
			<Input
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				placeholder='Seach movie'
			/>
			<MoviesSection
				title='search results'
				data={data}
			/>
		</div>
	);
};

export default SearchMovie;
