import { SkeletonCard } from './skeletonCard';

const SkeletonMovieList = () => {
	return (
		<>
			{Array(20)
				.fill(0)
				.map((_, i) => {
					return <SkeletonCard key={i} />;
				})}
		</>
	);
};

export default SkeletonMovieList;
