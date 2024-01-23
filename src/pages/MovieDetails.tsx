import fetchData from '@/api/fetchData';
import { BreadCrumbs } from '@/components/Breadcrumbs';
import LoadingSpinner from '@/components/spinner';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Genre, ShowDetails } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const MovieDetails = () => {
	const { id, mediaType } = useParams();

	const { data, isLoading } = useQuery({
		queryKey: ['movie', id],
		queryFn: () =>
			fetchData<ShowDetails>(
				`https://api.themoviedb.org/3/${
					mediaType === 'undefined' ? 'movie' : mediaType
				}/${id}`
			),
	});

	console.log(data);

	if (isLoading) return <LoadingSpinner />;

	return <MovieCard movie={data && data} />;
};

export default MovieDetails;

function MovieCard({ movie }: { movie: ShowDetails | undefined }) {
	if (!movie) return null;
	return (
		<Card className='grid w-full gap-y-4 max-w-2xl p-10 border border-slate-50/5 rounded-lg bg-slate-50/10 relative place-items-start'>
			<div className='w-24 h-24 bg-blue-400 fixed filter blur-[250px] self-center' />
			<BreadCrumbs
				title={movie.title}
				name={movie.name}
			/>
			<div className='w-full flex relative text-slate-50'>
				<img
					src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
					alt=''
					loading='lazy'
					className=' max-h-80 aspect-[9/16] rounded-lg'
				/>
			</div>
			<p className='text-2xl font-bold self-start text-white'>
				{movie.title || movie.name}
			</p>
			<div>
				<p className='text-sm text-slate-100'>
					Ratings: {movie.vote_average} / 10 (11 votes)
				</p>
				<GenreList genres={movie.genres} />
			</div>
			<p className='text-sm text-slate-200'>{movie.overview}</p>
		</Card>
	);
}

function GenreList({ genres }: { genres: Genre[] }) {
	return (
		<div className='flex gap-4 mt-4'>
			{genres.map((genre: Genre) => (
				<Badge
					key={genre.id}
					className='text-slate-200'
					variant={'outline'}>
					{genre.name}
				</Badge>
			))}
		</div>
	);
}
