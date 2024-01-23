const fetchData = async <T>(url: string): Promise<T> => {
	// const url = `https://api.themoviedb.org/3/trending/all/day`;

	console.log(url);

	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization:
				'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YjM1ZTQzNDFiYTU4OGU0YzZjMzI3Mzc4OTE1ZjhkYyIsInN1YiI6IjY1NmQ3YzJkNTY4NDYzMDBlZTEzN2QzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4h6DrvVw6OSgmJ5miAU-biN8HHp1mu8drE4EiUrT6j8',
		},
	};

	const res = await fetch(url, options);
	return res.json();
};

export default fetchData;
