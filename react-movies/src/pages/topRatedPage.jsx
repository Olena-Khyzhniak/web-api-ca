import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import MovieListPageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import { getTopRatedMovies } from "../api/tmdb-api";
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylistIcon";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import RemoveFromFavoritesIcon from "../components/cardIcons/removeFromFavorites";
import { MoviesContext } from "../contexts/moviesContext";

const TopRatedPage = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["topRated"],
    queryFn: getTopRatedMovies,
  });

  const { favorites } = useContext(MoviesContext);

  if (isLoading) return <Spinner />;
  if (isError) {
    console.error("Error fetching top rated movies:", error.message);
    return <p>Error loading top rated movies.</p>;
  }

  return (
    <MovieListPageTemplate
      title="Top Rated Movies"
      movies={data.results}
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

export default TopRatedPage;
