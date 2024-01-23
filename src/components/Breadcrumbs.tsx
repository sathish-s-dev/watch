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
	const paths = pathname
		.split('/')
		.slice(0, 2)
		.map((item) => (item === '' ? '/' : item));
	console.log(paths);
	function isLast(i: number) {
		return i === paths.length - 1;
	}
	return (
		<div>
			{paths.map((path, i) =>
				isLast(i) ? (
					<span
						key={path}
						className='text-slate-500'>{`${path}/ ${title || name}`}</span>
				) : (
					<Link
						key={path}
						className={cn('text-slate-200 hover:text-violet-500')}
						to={path}>
						{path === '/' ? 'Home / ' : `${path} /`}
					</Link>
				)
			)}
		</div>
	);
}
