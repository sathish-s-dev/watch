import { useStore } from '@/store/user-store';
import { signOut } from 'firebase/auth';
import { Bell, Search } from 'react-feather';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export function TopHeader() {
	const user = useStore((state) => state.user);
	return (
		<div className='flex justify-between px-6 py-6'>
			<div className='flex space-x-6'>
				<Link to='/'>Movies</Link>
				<Link to='/'>Series</Link>
				<Link to='/'>Documentaries</Link>
			</div>
			<div className='flex items-center space-x-3'>
				<Link to='/movies/search'>
					<Search
						className='hover:scale-110 cursor-pointer text-slate-200'
						size={24}
					/>
				</Link>
				<Bell
					size={24}
					className='hover:scale-110 cursor-pointer text-slate-200'
				/>
				{user?.photoURL ? (
					<Avatar
						onClick={() => {
							signOut(auth);
						}}
						className='w-6 h-6 rounded-full'>
						<AvatarImage src={user?.photoURL} />
						<AvatarFallback>{user?.displayName}</AvatarFallback>
					</Avatar>
				) : null}
			</div>
		</div>
	);
}
