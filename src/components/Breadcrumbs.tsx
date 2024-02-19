import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';

export function BreadCrumbs({
	title,
	name,
}: {
	title?: string;
	name?: string;
}) {
	const { pathname } = useLocation();

	const paths = ['/', pathname.split('/')[3]];

	console.log(paths);
	function isLast(i: number) {
		return i === paths.length - 1;
	}
	return (
		<div>
			{paths.map((path, i) =>
				isLast(i) ? (
					<span
						key={path.toString()}
						className='text-slate-500'>{`movie / ${title || name}`}</span>
				) : (
					<Link
						key={path.toString()}
						className={cn('text-slate-200 hover:text-violet-500')}
						to={path}>
						{path === '/' ? 'Home / ' : `${path} /`}
					</Link>
				)
			)}
		</div>
	);
}
