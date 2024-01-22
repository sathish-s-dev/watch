import addUserToDb from '@/api/addUserToDb';
import { links } from '@/constsnts';
import { cn } from '@/lib/utils';
import { useStore } from '@/store/user-store';
import { TLink } from '@/types';
import { User, signInWithPopup, signOut } from 'firebase/auth';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth, googleProvider } from '../../firebase/firebase';
import { Button } from './ui/button';

// type Link = {
// 	id: string;
// 	title: string;
// 	path: string;
// 	icon?: ReactNode;
// };

export function Header() {
	const user = useStore((state) => state.user);

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
			<NavList
				user={user}
				links={links}
			/>
		</header>
	);
}

function NavList({ links, user }: { links: TLink[]; user: User | null }) {
	const { pathname } = useLocation();
	const setUser = useStore((state) => state.setUser);

	console.log(pathname);
	return (
		<ul className='md:grid gap-y-6 hidden pl-4'>
			{links.map(({ id, path, title, icon }: TLink) => (
				<Link
					key={id}
					to={path}
					className={cn(
						'flex space-x-2 items-center text-slate-100/80 p-2 px-6 hover:bg-[#8530ce]/20 rounded-l-full',
						pathname === path && 'bg-[#8530ce] hover:bg-[#8530ce]/90 font-bold'
					)}>
					{icon}
					<span className=''>{title}</span>
				</Link>
			))}
			{user ? (
				<Button
					onClick={async () => {
						await signOut(auth).then(() => {
							setUser(null);
						});
					}}>
					Log out
				</Button>
			) : (
				<Button
					onClick={async () => {
						const res = await signInWithPopup(auth, googleProvider);
						console.log(res.user);
						setUser(res.user);
						const newUser = {
							name: res.user.displayName!,
							email: res.user.email!,
							photoUrl: res.user.photoURL!,
							id: res.user.uid!,
						};
						const newres = await addUserToDb(newUser);
						console.log(newres);
						// window.location.reload();
						toast.success(`welcome ${newUser.name}`);
					}}>
					Sign in
				</Button>
			)}
		</ul>
	);
}
