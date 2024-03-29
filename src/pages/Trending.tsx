import fetchData from '@/api/fetchData';
import { MoviesSection } from '@/components/MoviesSection';
import { TopHeader } from '@/components/TopHeader';
import { Response } from '@/types';
import { useQuery } from '@tanstack/react-query';

const Trending = () => {
	const { data } = useQuery({
		queryKey: ['trending'],
		queryFn: () =>
			fetchData<Response>('https://api.themoviedb.org/3/trending/all/day'),
	});

	return (
		<main className='h-screen overflow-hidden flex flex-col space-y-3'>
			<TopHeader />
			<MoviesSection
				title='Trending at this moment'
				data={data}
			/>
		</main>
	);
};

export default Trending;
