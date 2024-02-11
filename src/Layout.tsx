import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { useEffect } from 'react';
import { auth } from '../firebase/firebase';
import { useStore } from './store/user-store';

const Layout = () => {
	const setUser = useStore((state) => state.setUser);

	useEffect(() => {
		auth.authStateReady().then(() => {
			setUser(auth.currentUser);
		});
	}, [setUser]);
	return (
		<div className='grid md:grid-cols-[200px_1fr] grid-cols-1 h-full min-h-screen bg-dark border text-white content-start md:content-stretch'>
			<Header />
			<Outlet />
		</div>
	);
};

export default Layout;
