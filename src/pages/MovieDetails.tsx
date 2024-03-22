import fetchData from "@/api/fetchData";
import { BreadCrumbs } from "@/components/Breadcrumbs";
import LoadingSpinner from "@/components/spinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Genre, Productioncompany, ShowDetails } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Star } from "react-feather";
import { Link, useParams } from "react-router-dom";

const MovieDetails = () => {
  const { id, mediaType } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["movie", id],
    queryFn: () =>
      fetchData<ShowDetails>(
        `https://api.themoviedb.org/3/${
          mediaType === "undefined" ? "movie" : mediaType
        }/${id}`
      ),
  });

  if (isLoading) return <LoadingSpinner />;

  return <MovieCard movie={data} />;
};

export default MovieDetails;

function MovieCard({ movie }: { movie: ShowDetails | undefined }) {
  // console.log(movie);
  if (!movie) return null;
  return (
    <main className="overflow-y-auto no-scrollbar">
      <Card className="grid w-full h-full gap-y-4 p-10 py-6 border isolate border-slate-50/5  rounded-lg bg-slate-50/10 relative place-items-start overflow-y-auto">
        {/* background image */}
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt=""
          loading="lazy"
          className="rounded-lg h-full z-[-1] object-cover absolute opacity-20 grayscale"
        />
        <BreadCrumbs title={movie.title} name={movie.name} />
        <div className="grid h-full py-6 md:py-12 gap-6 grid-cols-1 md:grid-cols-[400px_1fr]">
          <div className="w-full flex relative text-slate-50">
            <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie.title || movie.name}
              loading="lazy"
              className=" rounded-lg max-h-[500px] w-full object-cover"
            />
          </div>
          <div className="grid gap-y-4 content-start text-slate-200">
            <Link to={movie.homepage}>
              <p className="text-4xl font-bold self-start text-white">
                {movie.title || movie.name}
              </p>
            </Link>
            <div>
              <p className="text-sm flex items-center gap-2 font-semibold">
                <Star fill="#facc15" stroke="#facc15" size={16} />
                {movie.vote_average} / 10 ( {movie.vote_count} votes )
              </p>
              <GenreList genres={movie.genres} />
            </div>
            <p className="tracking-wide text-justify font-light">
              {movie.overview}
            </p>
            <div className="flex gap-4">
              <p className="text-sm">Movie Status: </p>
              <Badge variant="secondary">{movie.status}</Badge>
            </div>
            <div className="flex gap-4">
              <Button variant={"secondary"}>
                <Link to={movie.homepage}>watch</Link>
              </Button>
              {/* <Button variant={"secondary"} className="text-white">
                <Heart className="text-red-500" />
              </Button> */}
            </div>
            <p className="text-lg">Companies Production: </p>
            <div className="flex gap-4 items-center">
              {movie.production_companies.map((company) => (
                <Company company={company} />
              ))}
              <p>{movie.video}</p>
            </div>
          </div>
        </div>
      </Card>
    </main>
  );
}

function Company({ company }: { company: Productioncompany }) {
  return (
    <div
      key={company.id}
      className="p-4 flex h-24 justify-center aspect-square items-center flex-col bg-slate-50/5 backdrop-blur-md rounded-md"
    >
      <abbr title={company.name}>
        <img
          key={company.id}
          src={`https://image.tmdb.org/t/p/original${company.logo_path}`}
          alt={company.name}
          className="h-24 object-contain"
        />
      </abbr>
    </div>
  );
}

function GenreList({ genres }: { genres: Genre[] }) {
  return (
    <div className="flex gap-4 mt-4">
      {genres.map((genre: Genre) => (
        <Badge
          key={genre.id}
          className="text-slate-900 bg-slate-50"
          variant={"outline"}
        >
          {genre.name}
        </Badge>
      ))}
    </div>
  );
}
