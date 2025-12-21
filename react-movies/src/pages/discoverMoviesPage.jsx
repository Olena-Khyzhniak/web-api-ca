import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getDiscoverMovies } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import MovieListPageTemplate from "../components/templateMovieListPage";
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylistIcon";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import RemoveFromFavoritesIcon from "../components/cardIcons/removeFromFavorites";
import { MoviesContext } from "../contexts/moviesContext";

const DiscoverMoviesPage = () => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["discover"],
    queryFn: getDiscoverMovies,
  });

  const { favorites } = useContext(MoviesContext);

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const movies = data.results;

  return (
    <MovieListPageTemplate
      title="Discover Movies"
      movies={movies}
      action={(movie) => {
        const movieId = movie.id || movie.movieId;
        const isFavorite = favorites.some((f) => f.movieId === movieId);

        return (
          <>
            <AddToPlaylistIcon movie={movie} />
            {isFavorite ? (
              <RemoveFromFavoritesIcon movie={movie} />
            ) : (
              <AddToFavoritesIcon movie={movie} />
            )}
          </>
        );
      }}
    />
  );
};

export default DiscoverMoviesPage;
