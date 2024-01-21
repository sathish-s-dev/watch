import LoadingSpinner from '@/components/spinner';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ShowDetails } from '@/types';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

const MovieDetails = () => {
	const { id, mediaType } = useParams();

	const router = useNavigate();
	const [details, setDetails] = useState<null | ShowDetails>(null);

	useEffect(() => {
		const url = `https://api.themoviedb.org/3/${
			mediaType === 'undefined' ? 'movie' : mediaType
		}/${id}`;
		console.log(mediaType === 'undefined');

		console.log(url);

		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization:
					'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YjM1ZTQzNDFiYTU4OGU0YzZjMzI3Mzc4OTE1ZjhkYyIsInN1YiI6IjY1NmQ3YzJkNTY4NDYzMDBlZTEzN2QzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4h6DrvVw6OSgmJ5miAU-biN8HHp1mu8drE4EiUrT6j8',
			},
		};

		fetch(url, options)
			.then((res) => res.json())
			.then((json) => {
				console.log(json);
				setDetails(json);
			})
			.catch((err) => console.error('error:' + err));
	}, [id, mediaType]);

	if (!details) return <LoadingSpinner />;

	return (
		<Card className='grid mx-auto gap-y-4 max-w-2xl p-10 border border-slate-50/5 rounded-lg bg-slate-50/10 relative place-items-start'>
			<div className='w-24 h-24 bg-blue-400 fixed filter blur-[250px] self-center' />
			<Button
				variant={'link'}
				onClick={() => router('/')}
				className='text-slate-200 hover:scale-105'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					stroke-width='1.5'
					stroke='currentColor'
					className='w-6 h-6'>
					<path
						stroke-linecap='round'
						stroke-linejoin='round'
						d='M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18'
					/>
				</svg>
			</Button>
			<div className='w-full flex relative text-slate-50'>
				<img
					src={`https://image.tmdb.org/t/p/original${details.poster_path}`}
					alt=''
					className=' max-h-80 rounded-lg'
				/>
			</div>
			<p className='text-2xl font-bold self-start text-white'>
				{details.title || details.name}
			</p>
			<div>
				<p className='text-sm text-slate-100'>
					Ratings: {details.vote_average} / 10 (11 votes)
				</p>
				<div className='flex gap-4 mt-4'>
					{details?.genres.map((genre) => (
						<Badge
							className='text-slate-200'
							variant={'outline'}>
							{genre.name}
						</Badge>
					))}
				</div>
			</div>
			<p className='text-sm text-slate-200'>{details.overview}</p>
		</Card>
	);
};

export default MovieDetails;
