import { Skeleton } from '@/components/skeleton/skeleton';
import { Heart } from 'react-feather';

export function SkeletonCard() {
	return (
		<div className='flex-shrink-0'>
			<Skeleton className='w-[250px] h-[250px] group transition-transform duration-500 relative max-w-[250px] overflow-hidden bg-slate-50/5 text-slate-50 border-slate-50/10 cursor-pointer'>
				<button className='text-gray-600 py-1 px-2 absolute top-0 right-0 bg-slate-100/20 backdrop-blur-xl z-10'>
					<Heart size={16} />
				</button>
				<Skeleton className='w-full px-4 flex-col items-start space-y-2 py-2 absolute bottom-0 bg-slate-900/10 backdrop-blur-xl text-slate-100'>
					<Skeleton className=' font-semibold h-4 line-clamp-1 text-sm'></Skeleton>
					<Skeleton className='text-xs h-2 max-w-[100px] line-clamp-1'></Skeleton>
				</Skeleton>
			</Skeleton>
		</div>
	);
}
