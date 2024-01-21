import { Link, useLocation } from 'react-router-dom';
import { Home, TrendingUp, Mail, Heart, Search } from 'react-feather';
import { ReactNode, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { signOut, signInWithPopup, User } from 'firebase/auth';
import { Button } from './ui/button';
import { auth, googleProvider } from '../../firebase/firebase';
import addUserToDb from '@/api/addUserToDb';

type Link = {
	id: string;
	title: string;
	path: string;
	icon?: ReactNode;
};

export function Header() {
	const { pathname } = useLocation();

	console.log(pathname);
	const [user, setUser] = useState<null | User>(null);

	useEffect(() => {
		auth.authStateReady().then(() => {
			setUser(auth?.currentUser);
		});
	}, []);

	const links: Link[] = [
		{
			id: '1',
			title: 'Home',
			path: '/',
			icon: <Home size={16} />,
		},
		{
			id: '2',
			title: 'Favourites',
			path: '/favourites',
			icon: <Heart size={16} />,
		},
		{
			id: '3',
			title: 'Trending',
			path: '/trending',
			icon: <TrendingUp size={16} />,
		},
		{
			id: '4',
			title: 'Search',
			path: '/movies/search',
			icon: <Search size={16} />,
		},
		{
			id: '4',
			title: 'Contact',
			path: '/contact',
			icon: <Mail size={16} />,
		},
	];

	return (
		<header className='grid grid-cols-2 md:grid-cols-1 h-full gap-y-10 content-start py-10'>
			<Link
				to='/'
				className='flex px-6'>
				<img
					className='w-[60%]'
					src='/logo.svg'
				/>
			</Link>
			<ul className='md:grid gap-y-6 hidden pl-4'>
				{links.map(({ id, path, title, icon }: Link) => (
					<Link
						key={id}
						to={path}
						className={cn(
							'flex space-x-2 items-center text-slate-100/80 p-2 px-6 hover:bg-[#8530ce]/20 rounded-l-full',
							pathname === path &&
								'bg-[#8530ce] hover:bg-[#8530ce]/90 font-bold'
						)}>
						{icon}
						<span className=''>{title}</span>
					</Link>
				))}
				{user ? (
					<Button
						onClick={async () => {
							await signOut(auth).then(() => {
								window.location.reload();
							});
						}}>
						Log out
					</Button>
				) : (
					<Button
						onClick={async () => {
							const res = await signInWithPopup(auth, googleProvider);
							console.log(res.user);
							const newUser = {
								name: res.user.displayName!,
								email: res.user.email!,
								photoUrl: res.user.photoURL!,
								id: res.user.uid!,
							};
							const newres = await addUserToDb(newUser);
							console.log(newres);
							window.location.reload();
						}}>
						Sign in
					</Button>
				)}
			</ul>
		</header>
	);
}
