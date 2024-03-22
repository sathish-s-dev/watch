const fetchData = async <T>(url: string): Promise<T> => {
  // const url = `https://api.themoviedb.org/3/trending/all/day`;

  console.log(url);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  };

	const res = await fetch(url, options);
  return res.json();
};

export default fetchData;
