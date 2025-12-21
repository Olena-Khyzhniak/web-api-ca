import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import RemoveFromFavoritesIcon from "../components/cardIcons/removeFromFavorites";
import { MoviesContext } from "../contexts/moviesContext";

const FavoriteMoviesPage = () => {
  const { favorites } = useContext(MoviesContext);

  return (
    <PageTemplate
      title="Favorite Movies"
      movies={favorites}
      action={(movie) => <RemoveFromFavoritesIcon movie={movie} />}
    />
  );
};

export default FavoriteMoviesPage;
