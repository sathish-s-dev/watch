import { TLink } from '@/types';
import { Heart, Home, Mail, Search, TrendingUp } from 'react-feather';

export const links: TLink[] = [
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
		id: '5',
		title: 'Contact',
		path: '/contact',
		icon: <Mail size={16} />,
	},
];
