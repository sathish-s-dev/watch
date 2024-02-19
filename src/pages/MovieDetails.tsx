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

	return <MovieCard movie={data} />;
};

export default MovieDetails;

function MovieCard({ movie }: { movie: ShowDetails | undefined }) {
	if (!movie) return null;
	return (
		<main className='overflow-y-auto no-scrollbar'>
			<Card className='grid w-full gap-y-4 p-10 border isolate border-slate-50/5 max-w-4xl rounded-lg bg-slate-50/10 relative place-items-start overflow-y-auto'>
				<img
					src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
					alt=''
					loading='lazy'
					className='rounded-lg h-full z-[-1] object-cover absolute opacity-20 grayscale'
				/>
				<BreadCrumbs
					title={movie.title}
					name={movie.name}
				/>
				<div className='grid h-full py-6 md:py-24 gap-4 grid-cols-1 md:grid-cols-[300px_1fr]'>
					<div className='w-full flex relative text-slate-50'>
						<img
							src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
							alt=''
							loading='lazy'
							className=' rounded-lg max-h-[500px]'
						/>
					</div>
					<div className='grid gap-y-4 content-start text-slate-200'>
						<p className='text-2xl font-bold self-start text-white'>
							{movie.title || movie.name}
						</p>
						<div>
							<p className='text-sm '>
								Ratings: {movie.vote_average} / 10 (11 votes)
							</p>
							<GenreList genres={movie.genres} />
						</div>
						<p className='text-sm'>{movie.overview}</p>
						{/* <p>{movie.release_date || movie.first_air_date}</p> */}
					</div>
				</div>
			</Card>
		</main>
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
