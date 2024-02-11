// import movies from '../db/movies.json';
import { MovieSlider } from '@/components/MovieSlider';
import { useQueries } from '@tanstack/react-query';
import './App.css';
import fetchData from './api/fetchData';
import { TopHeader } from './components/TopHeader';
import { Button } from './components/ui/button';
import { Response } from './types';

function App() {
	function queryFn(url: string) {
		return () => fetchData<Response>(url);
	}

	const [popular, topRated, trending, upcoming] = useQueries({
		queries: [
			{
				queryKey: ['popular'],
				queryFn: queryFn(
					'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1'
				),
			},
			{
				queryKey: ['top_rated'],
				queryFn: queryFn(
					'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1'
				),
			},
			{
				queryKey: ['trending'],
				queryFn: queryFn(
					'https://api.themoviedb.org/3/trending/movie/day?language=en-US'
				),
			},
			{
				queryKey: ['upcoming'],
				queryFn: queryFn(
					'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1'
				),
			},
		],
	});

	

	return (
		<main className='overflow-x-hidden h-screen no-scrollbar overflow-y-scroll'>
			<div className='bg-hero flex flex-col justify-between bg-cover bg-center h-80'>
				<TopHeader />
				<div className='p-6 grid place-items-start gap-y-4'>
					<h1 className='text-5xl font-bold'>Insider</h1>
					<p>2022 | Comedy horror | 1 Season</p>
					<Button className='bg-[#8530ce]'>Watch Now</Button>
				</div>
			</div>

			<MovieSlider
				results={trending?.data?.results}
				title='Trending Movies'
			/>
			<MovieSlider
				results={upcoming?.data?.results}
				title='Upcoming Movies'
			/>
			<MovieSlider
				results={popular?.data?.results}
				title='Popular Movies'
			/>
			<MovieSlider
				results={topRated?.data?.results}
				title='Top Rated Movies'
			/>
		</main>
	);
}

export default App;
