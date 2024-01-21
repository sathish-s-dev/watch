import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
} from 'react-router-dom';

import App from './App';
import Layout from './Layout';
import { Contact, Favourites, Trending } from './pages';
import MovieDetails from './pages/MovieDetails';
import SearchMovie from './pages/SearchMovie';

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route
			path='/'
			element={<Layout />}>
			<Route
				path=''
				element={<App />}
			/>
			<Route
				path='/favourites'
				element={<Favourites />}
			/>
			<Route
				path='/trending'
				element={<Trending />}
			/>
			<Route
				path='/contact'
				element={<Contact />}
			/>
			<Route
				path='/movie-details/:id/:mediaType'
				element={<MovieDetails />}
			/>
			<Route
				path='/movies/search'
				element={<SearchMovie />}
			/>
		</Route>
	)
);
